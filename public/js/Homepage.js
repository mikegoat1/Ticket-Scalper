//Variables from the the homepage. 
//All of music variables 
// const musicContainer = document.querySelector("#music");
// const musicImage1 = document.querySelector("#music1");
// const musicImage2 = document.querySelector("#music2");
// const musicImage3 = document.querySelector("#music3");
// const musicImage4 = document.querySelector("#music4");
//All of Sports 
const music = document.querySelector("#concerts");
const sportsImage1 = document.querySelector("#sports1");
const sportsImage2 = document.querySelector("#sports2");
const sportsImage3 = document.querySelector("#sports3");
const sportsImage4 = document.querySelector("#sports4");

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
        const response = await fetch("https://api.seatgeek.com/2/events?client_id=MjM4Njg3ODF8MTYzMzkxOTAxMy42MDc5MjIz&geoip=true&per_page=10&sort=score.desc",
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            })
        if (response.ok) {
            const data = await response.json();
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
                    const imageConcert = document.createElement("img"); 
                    imageConcert.setAttribute("src", image); 
                    imageConcert.setAttribute("class",`image${[i]}`);
                    imageConcert.setAttribute("class", "event-image")
                    music.append(imageConcert)
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
