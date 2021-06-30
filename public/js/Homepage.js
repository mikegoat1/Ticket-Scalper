//Variables from the the homepage. 

//All of music variables 
let musicContainer = document.querySelector("#music"); 
let musicImage1 = document.querySelector("#music1"); 
let musicImage2 = document.querySelector("#music2"); 
let musicImage3 = document.querySelector("#music4"); 
let musicImage4 = document.querySelector("#music4"); 
let musicImage5 = document.querySelector("#music5"); 
let musicImage6 = document.querySelector("#music6"); 






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



async function generateSports(data) {

    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&classificationId=KZFzniwnSyZfZ7v7nE&apikey=y7jtPwcsLI955aEToVqLFC7r53xG1Umr`, {
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
  
async function postSportsValues(data) {
    for (var i = 0; i < data.events.length; i++){
        const eventsValues = data.events[i]
        const price_range_min = eventsValues.priceRanges[0].min.value
        const price_range_min = eventsValues.priceRanges[0].max.value
        const start_date = eventsValues.dates.start.localDate.value
        const start_time = eventsValues.dates.start.localTime.value
        const postResponse = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&classificationId=KZFzniwnSyZfZ7v7nE&apikey=y7jtPwcsLI955aEToVqLFC7r53xG1Umr`, {
            method: "POST",
            body: JSON.stringify({
                venue,
                price_range_min,
                price_range_max,
                start_date,
                start_time,

            }),
        })
        if (postResponse.ok) {
            document.location.replace(`/`);
          } else {
            alert('Failed to edit dish');
          }
        }
}
    



async function generateMusic(data) {
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&classificationId=KZFzniwnSyZfZ7v7nJ&apikey=y7jtPwcsLI955aEToVqLFC7r53xG1Umr`, {
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
async function postMusicValues() {
    for (var i = 0; i < data.events.length; i++){
        const eventsValues = data.events[i]
        const price_range_min = eventsValues.priceRanges[0].min.value
        const price_range_min = eventsValues.priceRanges[0].max.value
        const start_date = eventsValues.dates.start.localDate.value
        const start_time = eventsValues.dates.start.localTime.value
    const postResponse = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&classificationId=KZFzniwnSyZfZ7v7nJ&apikey=y7jtPwcsLI955aEToVqLFC7r53xG1Umr`, {
        method: "POST",
        body: JSON.stringify({
            venue,
            price_range_min,
            price_range_max,
            start_date,
            start_time,

        }),
    })
    if (postResponse.ok) {
        document.location.replace(`/`);
      } else {
        alert('Failed to edit dish');
      }
    }
}


async function generateArts(data) {
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&classificationId=KZFzniwnSyZfZ7v7na&apikey=y7jtPwcsLI955aEToVqLFC7r53xG1Umr`, {
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
async function postArtsValues() {
    for (var i = 0; i < data.events.length; i++){
        const eventsValues = data.events[i]
        const price_range_min = eventsValues.priceRanges[0].min.value
        const price_range_min = eventsValues.priceRanges[0].max.value
        const start_date = eventsValues.dates.start.localDate.value
        const start_time = eventsValues.dates.start.localTime.value
    const postResponse = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&classificationId=KZFzniwnSyZfZ7v7na&apikey=y7jtPwcsLI955aEToVqLFC7r53xG1Umr`, {
        method: "POST",
        body: JSON.stringify({
            venue,
            price_range_min,
            price_range_max,
            start_date,
            start_time,

        }),
    })
    if (postResponse.ok) {
        document.location.replace(`/`);
      } else {
        alert('Failed to edit dish');
      }
    }

}


