/* Created by Bogdan Radzevich 4/28/2024
  Using tutorial by Coding Journey */
const root = document.documentElement;
const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
const marqueeContent = document.querySelector("ul.marquee-content");





//Aleksei Nikitin 4/28/2024
//Using ChatGPT
//AlphaVantage URL endpoint for the API request
const url = 'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=I00CO3XRPVZ7M1PI'; // Replace 'demo' with your actual API key

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
        let topGainers = data['top_gainers'].slice(0, 10).join(' ');
        let topLosers = data['top_losers'].slice(0, 10).join(' ');
        let mostActivelyTraded = data['most_actively_traded'].slice(0, 10).join(' ');
        let metadata = data['metadata'];
        marqueeContent.innerHTML += `<li>Metadata: ${metadata}</li>`;
        marqueeContent.innerHTML += `<li>Last Updated: ${lastUpdated}</li>`;
        marqueeContent.innerHTML += `<li>Top Gainers: ${topGainers}</li>`;
        marqueeContent.innerHTML += `<li></li>`;
        marqueeContent.innerHTML += `<li>Top Losers: ${topLosers}</li>`;
        marqueeContent.innerHTML += `<li></li>`;
        marqueeContent.innerHTML += `<li>Most Actively Traded: ${mostActivelyTraded}</li>`;
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