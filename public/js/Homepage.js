var containerMusic = document.querySelector("#concerts");

function properFormat(data) {
    if (data.indexOf(" ") > 0) {
        return data.replace(/\s/g, '%20');
    }
    return data;
}

renderConcertInfo();

async function renderConcertInfo() {
    try {
        const response = await fetch("/api/proxy/events", {
            method: "GET",
            headers: { "content-type": "application/json" },
        });
        if (!response.ok) {
            console.error("Failed to load events:", response.status);
            return;
        }
        const data = await response.json();

        for (let i = 0; i < data.events.length; i++) {
            const type = data.events[i].type;
            if (type === "concert") {
                const name = data.events[i].performers[0].name;
                const venue = data.events[i].venue.name;
                const startDate = new Date(data.events[i].datetime_local).toLocaleDateString('en-US');
                const startTime = data.events[i].datetime_local;
                const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
                const formattedTime = new Date(startTime).toLocaleTimeString('en-US', timeOptions);
                const link = data.events[i].url;
                const image = data.events[i].performers[0].image;
                const eventDescription = data.events[i].title;

                const row = document.createElement("div");
                row.setAttribute("class", "cardRow");
                containerMusic.append(row);

                const imageConcert = document.createElement("img");
                imageConcert.setAttribute("src", image);
                imageConcert.setAttribute("id", `image${[i]}`);
                imageConcert.setAttribute("class", "cardImage");
                row.append(imageConcert);

                const descriptionContainer = document.createElement("div");
                descriptionContainer.setAttribute("class", "cardDescription");
                row.append(descriptionContainer);

                const title = document.createElement("div");
                title.setAttribute("style", "margin-bottom: 1%");
                title.innerHTML = name;
                descriptionContainer.appendChild(title);

                const venueText = document.createElement("div");
                venueText.innerHTML = venue;
                venueText.setAttribute("style", "margin-bottom: 1%");
                descriptionContainer.appendChild(venueText);

                const description = document.createElement("p");
                description.setAttribute("class", "cardDescription-p");
                description.textContent = `Description: ${eventDescription}`;
                descriptionContainer.appendChild(description);

                const date = document.createElement("div");
                date.innerHTML = `Date: ${startDate}`;
                descriptionContainer.appendChild(date);

                const time = document.createElement("div");
                time.innerHTML = `Time: ${formattedTime}`;
                descriptionContainer.appendChild(time);

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
    } catch (err) {
        console.error("renderConcertInfo error:", err);
    }
}

async function searchBar(data) {
    try {
        const response = await fetch(`/api/proxy/search?q=${properFormat(data)}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            alert("Nothing to search");
            return null;
        }
        return response;
    } catch (err) {
        console.error("searchBar error:", err);
    }
}
