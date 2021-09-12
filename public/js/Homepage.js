//Variables from the the homepage. 
//All of music variables 
const musicContainer = document.querySelector("#music");
const musicImage1 = document.querySelector("#music1");
const musicImage2 = document.querySelector("#music2");
const musicImage3 = document.querySelector("#music3");
const musicImage4 = document.querySelector("#music4");
//All of Sports 
const sportsContainer = document.querySelector("#sports");
const sportsImage1 = document.querySelector("#sports1");
const sportsImage2 = document.querySelector("#sports2");
const sportsImage3 = document.querySelector("#sports3");
const sportsImage4 = document.querySelector("#sports4");
//All of Arts
const artsContainer = document.querySelector("#arts");
const artsImage1 = document.querySelector("#arts1");
const artsImage2 = document.querySelector("#arts2");
const artsImage3 = document.querySelector("#arts3");
const artsImage4 = document.querySelector("#arts4");
// Formating the search
function properFormat(data) {
    if (data.indexOf(" ") > 0) {
        let theData = data.replace(/\s/g, '%20')
        console.log(theData)
        return theData;
    } else {
        return data;
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

sportsContainer.addEventListener("click", function (event) {
    console.log(event.target.value);
    event.stopPropagation();


});

// Generates Images for the event
generateSports()
async function generateSports() {
    try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.json?size=10&classificationId=KZFzniwnSyZfZ7v7nE&apikey=y7jtPwcsLI955aEToVqLFC7r53xG1Umr`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (response.ok) {
            const data = await response.json();
            console.log(data._embedded.events[0])
            postSportsValues(data);

            //First image
            const image1 = data._embedded.events[0].images[2].url;
            sportsImage1.setAttribute("src", image1);
            const sportsCap = document.querySelector("#sports1Cap")
            sportsCap.innerHTML = data._embedded.events[0].name;
            //Second Image 
            const image2 = data._embedded.events[1].images[2].url;
            sportsImage2.setAttribute("src", image2);
            const sportsCap2 = document.querySelector("#sports2Cap")
            sportsCap2.innerHTML = data._embedded.events[1].name;
            //Third Image
            const image3 = data._embedded.events[2].images[3].url;
            sportsImage3.setAttribute("src", image3);
            //Fourth Image 
            const image4 = data._embedded.events[3].images[2].url;
            sportsImage4.setAttribute("src", image4);


        } else {
            alert("Nothing to search");
        }
        return response;

    } catch (err) {
        console.log(err);
    }
};
async function postSportsValues(data) {

    console.log(data._embedded.events[1].url)
    const venue = data._embedded.events[1]._embedded.venues[0].name
    const price_range_min = parseInt(data._embedded.events[1].priceRanges[0].min)
    const price_range_max = parseInt(data._embedded.events[1].priceRanges[0].max)
    const start_date = data._embedded.events[1].dates.start.localDate
    const start_time = data._embedded.events[1].dates.start.localTime
    const ticket_link = data._embedded.events[1].url

    const postResponse = await fetch("/api/event", {
        method: "POST",
        body: JSON.stringify({
            venue,
            price_range_min,
            price_range_max,
            start_date,
            start_time,
            ticket_link,

        }),
        headers: { 'Content-Type': 'application/json' },
    })
    console.log(postResponse.error)

    if (postResponse.ok) {

        console.log(postResponse)
    } else {
        alert('Error');
    }
}


// Generate Images for the event
generateMusic()
async function generateMusic() {
    try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.json?size=10&classificationId=KZFzniwnSyZfZ7v7nJ&apikey=y7jtPwcsLI955aEToVqLFC7r53xG1Umr`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json()
            postMusicValues(data);
            console.log(data)
            //parseing route test 
            console.log(data._embedded);
            //First image
            const image1 = data._embedded.events[0].images[2].url;
            musicImage1.setAttribute("src", image1);
            //Second Image 
            const image2 = data._embedded.events[1].images[2].url;
            musicImage2.setAttribute("src", image2);
            //Third Image
            const image3 = data._embedded.events[2].images[1].url;
            musicImage3.setAttribute("src", image3);
            //Fourth Image 
            const image4 = data._embedded.events[3].images[2].url;
            musicImage4.setAttribute("src", image4);

        } else {
            alert("Nothing to search");
        }
        return response;
    } catch (err) {
        console.log(err);
    }
};
async function postMusicValues(data) {
    console.log(data._embedded.events[1]._embedded.venues[0].name)
    for (let i = 0; i > 5; i++) {


        const venue = data._embedded.events[i]._embedded.venues[0].name
        const price_range_min = parseInt(data._embedded.events[i].priceRanges[0].min)
        const price_range_max = parseInt(data._embedded.events[i].priceRanges[0].max)
        const start_date = data._embedded.events[i].dates.start.localDate
        const start_time = data._embedded.events[i].dates.start.localTime
        const ticket_link = data._embedded.events[i].url

        const postResponse = await fetch("/api/event", {
            method: "POST",
            body: JSON.stringify({
                venue,
                price_range_min,
                price_range_max,
                start_date,
                start_time,
                ticket_link,

            }),
            headers: { 'Content-Type': 'application/json' },
        })
    }
    // if (postResponse.ok) {
    // } else {
    //     alert('Error');
    // }
}
//Generate Images for the event
generateArts();
async function generateArts() {
    try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.json?size=10&classificationId=KZFzniwnSyZfZ7v7na&apikey=y7jtPwcsLI955aEToVqLFC7r53xG1Umr`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            postArtsValues(data);
            console.log(data)
            //parseing route test 
            console.log(data._embedded);
            //First image
            const image1 = data._embedded.events[0].images[2].url;
            artsImage1.setAttribute("src", image1);
            //Second Image 
            const image2 = data._embedded.events[1].images[2].url;
            artsImage2.setAttribute("src", image2);
            //Third Image
            const image3 = data._embedded.events[2].images[1].url;
            artsImage3.setAttribute("src", image3);
            //Fourth Image 
            const image4 = data._embedded.events[3].images[2].url;
            artsImage4.setAttribute("src", image4);
        } else {
            alert("Nothing to search");
        }
        return response;
    } catch (err) {
        console.log(err);
    }
};
async function postArtsValues(data) {
    // console.log(typeof data._embedded.events[1].priceRanges[0].min)
    const venue = data._embedded.events[0]._embedded.venues[0].name
    const price_range_min = parseInt(data._embedded.events[1].priceRanges[0].min)
    const price_range_max = parseInt(data._embedded.events[1].priceRanges[0].max)
    const start_date = data._embedded.events[1].dates.start.localDate
    const start_time = data._embedded.events[1].dates.start.localTime
    const ticket_link = data._embedded.events[1].url

    const postResponse = await fetch(`/api/event`, {
        method: "POST",
        body: JSON.stringify({
            venue,
            price_range_min,
            price_range_max,
            start_date,
            start_time,
            ticket_link,

        }),
        headers: { 'Content-Type': 'application/json' },
    })
    // if (postResponse.ok) {
    // } else {
    //     alert('Error');
    // }
}