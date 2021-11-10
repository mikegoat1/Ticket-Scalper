//Variables from the the homepage. 
//All of music variables 
// const musicContainer = document.querySelector("#music");
// const musicImage1 = document.querySelector("#music1");
// const musicImage2 = document.querySelector("#music2");
// const musicImage3 = document.querySelector("#music3");
// const musicImage4 = document.querySelector("#music4");
//All of Sports 
const music = document.querySelector("#concerts");

function properFormat(data) {
    if (data.indexOf(" ") > 0) {
        let theData = data.replace(/\s/g, '%20')
        console.log(theData)
        return theData;
    } else {
        return data;
    }
}
renderConcertInfo();
// Create a function to run and seed Event database with when homepage is rendered. 
async function renderConcertInfo() {
    try {
        const response = await fetch("https://api.seatgeek.com/2/events?client_id=MjM4Njg3ODF8MTYzMzkxOTAxMy42MDc5MjIz&geoip=true&per_page=50&sort=score.desc",
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            })
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            for (let i = 0; i < data.events.length; i++) {
                const type = data.events[i].type;
                if (type === "concert") {

                    const name = data.events[i].performers[0].name;
                    const venue = data.events[i].venue.name;
                    const lowCost = data.events[i].stats.lowest_price_good_deals;
                    const highCost = data.events[i].stats.highest_price;
                    // This endpoint has both time and date
                    // Need to regex the endpoint to seperate into propper property 
                    const startDate = data.events[i].datetime_local;
                    const startTime = data.events[i].datetime_local; 
                    const link = data.events[i].url; 
                    const image = data.events[i].performers[0].image; 
                    console.log(image)

                    // make sure each card and description has its own row
                    const imageConcert = document.createElement("img"); 
                    imageConcert.setAttribute("src", image); 
                    imageConcert.setAttribute("id",`image${[i]}`);
                    imageConcert.setAttribute("class", "event-image"); 
                    const container = document.createElement("div"); 
                    container.setAttribute("class", "d-flex"); 
                    container.setAttribute("calss", "flex-column"); 
                    container.setAttribute("class", "justify-content-evenly"); 
                    container.setAttribute("class", "ms-5"); 

                    const row = document.createElement("div");
                    row.setAttribute("class", "d-flex"); 
                    row.setAttribute("class", "flex-row"); 
                    music.append(row); 
                    row.append(imageConcert); 
                    row.append(container); 
                    
                    // Creating child elements for container collumn
                    const title = document.createElement("div"); 
                    title.innerHTML = name; 
                    container.appendChild(title); 

                    const venueText = document.createElement("div"); 
                    venueText.innerHTML = venue; 
                    container.appendChild(venueText); 

                    const description = document.createElement("p"); 
                    description.textContent = `Description: This will be the description`; 
                    container.appendChild(description); 

                    const priceRange = document.createElement("div"); 
                    priceRange.innerHTML = `Price Range: Lower Tickets: $${lowCost}
                                                         Higher Tickets: $${highCost}`; 
                    container.appendChild(priceRange); 
                                


                }

            }
        }

    } catch (err) {
        console.log(err);
    }


}


// Create an Event Listener for the search bar
async function searchBar(data) {
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=15&keyword=${properFormat(data)}}&apikey=y7jtPwcsLI955aEToVqLFC7r53xG1Umr`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            console.log(response);
        } else {
            alert("Nothing to search");
        }
        return response;
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// sportsContainer.addEventListener("click", function (event) {
//     console.log(event.target.value);
//     event.stopPropagation();


// });
