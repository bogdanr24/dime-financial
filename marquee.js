/* Created by Bogdan Radzevich 4/28/2024
  Using tutorial by Coding Journey */
const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");
const marqueeButton = document.getElementById("marqueeButton");
const marqueeClass = document.querySelector(".marquee");
const marqueeHeight = getComputedStyle(root).getPropertyValue("--marquee-height");



//Aleksei Nikitin 4/28/2024
//Using ChatGPT
//AlphaVantage URL endpoint for the API request
const url = 'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=TGQQ83UIEDFX2TFY'; 

function fetchData() {
    fetch(url, {
        method: 'GET', 
        headers: {
            'User-Agent': 'request'
        }
    })

    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json(); 
    })
    .then(data => {
        console.log(data);
        let lastUpdated = data['last_updated'];
        // Assuming data is the parsed JSON object from the API
        let topGainers = data['top_gainers'];
        let topLosers = data['top_losers'];

// Check if topGainers is defined and is an array
    
           
        let mostActivelyTraded = data['most_actively_traded'];
        let metadata = data['metadata'];
        marqueeContent.innerHTML += `<li>Metadata: ${metadata}</li>`;
        marqueeContent.innerHTML += `<li>Last Updated: ${lastUpdated}</li>`;
        marqueeContent.innerHTML += `<h1>Top Gainers:</li>`
        for (i = 0; i < 11; i++) {
            document.querySelector('body > .marquee > .marquee-content').innerHTML += `<li>${topGainers[i]['ticker']} - Price: $${topGainers[i]['price']}, Change: $${topGainers[i]['change_amount']} (${topGainers[i]['change_percentage']})</li>`;
        };
        for (i = 0; i < 11; i++) {
            document.querySelector('body > .marquee > .marquee-content').innerHTML += `<li>${topLosers[i]['ticker']} - Price: $${topLosers[i]['price']}, Change: $${topLosers[i]['change_amount']} (${topLosers[i]['change_percentage']})</li>`;
        };
        //marqueeContent.innerHTML += `<li>Most Actively Traded: ${mostActivelyTraded}</li>`;
        for(let i=0; i<marqueeElementsDisplayed; i++) {
            marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
        }
        root.style.setProperty("--marquee-elements", marqueeContent.children.length);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}
/* Added by Bogdan Radzevich May 5th, 2024 
Makes the button hide the marquee and show it on click*/

marqueeButton.addEventListener("click", event => {
    if (marqueeClass.style.display === "none"){
        marqueeClass.style.display = "block";
        marqueeButton.textContent = "v";
        marqueeButton.style.bottom = marqueeHeight;
    }
    else{
        marqueeClass.style.display = "none";
        marqueeButton.textContent = "^";
        marqueeButton.style.bottom = 0;
    }
})



fetchData(); // Call the function
root.style.setProperty("--marquee-elements", marqueeContent.children.length);