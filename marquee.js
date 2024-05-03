/* Created by Bogdan Radzevich 4/28/2024
  Using tutorial by Coding Journey */
const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");





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

// Check if topGainers is defined and is an array
    
           
        let mostActivelyTraded = data['most_actively_traded'];
        let metadata = data['metadata'];
        marqueeContent.innerHTML += `<li>Metadata: ${metadata}</li>`;
        marqueeContent.innerHTML += `<li>Last Updated: ${lastUpdated}</li>`;
        for (i = 0; i < 11; i++) {
            document.querySelector('marquee-content') += `<li>${topGainers[i]['ticker']} - Price: ${topGainers[i]['price']}, Change: ${topGainers[i]['change_amount']} (${topGainers[i]['change_percentage']})</li>`;
        };
        marqueeContent.innerHTML += `<li></li>`;
        marqueeContent.innerHTML += `<li></li>`;
        //marqueeContent.innerHTML += `<li>Most Actively Traded: ${mostActivelyTraded}</li>`;
        marqueeContent.innerHTML += `<li></li>`;
        for(let i=0; i<marqueeElementsDisplayed; i++) {
            marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
        }
        root.style.setProperty("--marquee-elements", marqueeContent.children.length);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}




fetchData(); // Call the function
root.style.setProperty("--marquee-elements", marqueeContent.children.length);