//Variables from the the homepage. 

var containerMusic = document.querySelector("#concerts");

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

            for (let i = 0; i < data.events.length; i++) {
                const type = data.events[i].type;
                if (type === "concert") {
                    console.log(data);
                    const name = data.events[i].performers[0].name;
                    const venue = data.events[i].venue.name;
                    const startDate = new Date(data.events[i].datetime_local).toLocaleDateString('en-US');
                    const startTime = data.events[i].datetime_local;
                    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
                    const formattedTime = new Date(startTime).toLocaleTimeString('en-US', timeOptions);
                    const link = data.events[i].url;
                    const image = data.events[i].performers[0].image;
                    const eventDescription = data.events[i].title;
                    // Creating Row
                    const row = document.createElement("div");
                    row.setAttribute("class", "row");
                    row.setAttribute("class", "cardRow");
                    containerMusic.append(row);


                    // make sure each card and description has its own row
                    const imageConcert = document.createElement("img");
                    imageConcert.setAttribute("src", image);
                    imageConcert.setAttribute("id", `image${[i]}`);
                    imageConcert.setAttribute("class", "event-image");
                    imageConcert.setAttribute("class", "cardImage");
                    row.append(imageConcert);
                    const descriptionContainer = document.createElement("div");
                    descriptionContainer.setAttribute("class", "cardDescription");
                    row.append(descriptionContainer);
                    // Event Artists
                    const title = document.createElement("div");
                    title.setAttribute("style", "margin-bottom: 1%");
                    title.innerHTML = name;
                    descriptionContainer.appendChild(title);

                    // Venue Name
                    const venueText = document.createElement("div");
                    venueText.innerHTML = venue;
                    venueText.setAttribute("style", "margin-bottom: 1%");
                    descriptionContainer.appendChild(venueText);

                    // Description 
                    const description = document.createElement("p");
                    description.setAttribute("class", "cardDescription-p");
                    description.textContent = `Description: ${eventDescription}`;
                    descriptionContainer.appendChild(description);

                    // Date
                    const date = document.createElement("div");
                    date.innerHTML = `Date: ${startDate}`;
                    descriptionContainer.appendChild(date);

                    // Time
                    const time = document.createElement("div");
                    time.innerHTML = `Time: ${formattedTime}`;
                    descriptionContainer.appendChild(time);


                    // Buttons
                    const buttonContainer = document.createElement("div");
                    buttonContainer.setAttribute("class", "cardBtnContainer");
                    descriptionContainer.appendChild(buttonContainer);


                    const buttonBuy = document.createElement("div");
                    buttonBuy.setAttribute("class", "buttons");
                    buttonBuy.textContent = "Buy Tickets";
                    buttonBuy.onclick = function () {
                        window.location.href = link;
                    };
                    buttonContainer.appendChild(buttonBuy);

                    const buttonFavorites = document.createElement("div");
                    buttonFavorites.setAttribute("class", "buttons");
                    buttonFavorites.textContent = "Favorites";
                    buttonFavorites.style.backgroundColor = "#FFFFFF";
                    buttonFavorites.style.color = "#FF0000";
                    buttonContainer.appendChild(buttonFavorites);

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

