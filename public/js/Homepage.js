//Variables from the the homepage. 

//All of music variables 
let musicContainer = document.querySelector("#music");
let musicImage1 = document.querySelector("#music1");
let musicImage2 = document.querySelector("#music2");
let musicImage3 = document.querySelector("#music3");
let musicImage4 = document.querySelector("#music4");




//All of Sports 
let sportsContainer = document.querySelector("#sports"); 
let sportsImage1 = document.querySelector("#sports1"); 
let sportsImage2 = document.querySelector("#sports2"); 
let sportsImage3 = document.querySelector("#sports3"); 
let sportsImage4 = document.querySelector("#sports4"); 
let sportsImage5 = document.querySelector("#sports5"); 


//All of Arts
let artsContainer = document.querySelector("#arts"); 
let artsImage1 = document.querySelector("#arts1"); 
let artsImage2 = document.querySelector("#arts2"); 
let artsImage3 = document.querySelector("#arts3"); 
let artsImage4 = document.querySelector("#arts4"); 


 

    
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
            postSportsValues(data);
            console.log(data);

            //First image
            const image1 = data._embedded.events[0].images[2].url; 
            sportsImage1.setAttribute("src", image1);
            //Second Image 
            const image2 = data._embedded.events[1].images[2].url;
            sportsImage2.setAttribute("src", image2);
            //Third Image
            const image3 = data._embedded.events[2].images[3].url;
            sportsImage3.setAttribute("src", image3);
            //Fourth Image 
            const image4 = data._embedded.events[3].images[2].url; 
            sportsImage4.setAttribute("src", image4); 
            //Fifth Image
            const image5 = data._embedded.events[4].images[2].url; 
            sportsImage5.setAttribute("src", image5); 


        } else {
            alert("Nothing to search");
        }
       
    } catch (err) {
        console.log(err);
    }

};

async function postSportsValues(data) {

console.log("Im Here")
            const venue = data._embedded.venues[0]
            const price_range_min = data.priceRanges[0].min.value
            const price_range_max = data.priceRanges[0].max.value
            const start_date = data.dates.start.localDate.value
            const start_time = data.dates.start.localTime.value
            // const venue = "The Forum"
            // const price_range_min = 150
            // const price_range_max = 540
            // const start_date = 	"2021-06-30"
            // const start_time = 	"2021-07-01T01:00:00Z"
        const postResponse = await fetch(`/event`, {
            method: "POST",
            body: JSON.stringify({
                venue,
                price_range_min,
                price_range_max,
                start_date,
                start_time,

            }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (postResponse.ok) {
            document.location.replace(`/`);

          } else {
            alert('Failed to edit dish');
          }
        }

            
    
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
             //Fifth Image
             const image5 = data._embedded.events[4].images[2].url; 
             musicImage5.setAttribute("src", image5); 
             //Sixth Image 
             const image6 = data._embedded.events[5].images[2].url;
             musicImage6.setAttribute("src", image6);



        } else {
            alert("Nothing to search");
        }
        return response;
    } catch (err) {
        console.log(err);
    }
};
async function postMusicValues() {
    for (var i = 0; i < data.events.length; i++){
        const embeddedValues = data._embedded
        const venue = data._embedded.venue[i]
        const price_range_min = embeddedValues.priceRanges[0].min.value
        const price_range_max = embeddedValues.priceRanges[0].max.value
        const start_date = embeddedValues.dates.start.localDate.value
        const start_time = embeddedValues.dates.start.localTime.value
    const postResponse = await fetch(`https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.json?size=10&classificationId=KZFzniwnSyZfZ7v7nJ&apikey=y7jtPwcsLI955aEToVqLFC7r53xG1Umr`, {
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

generateArts(); 
async function generateArts(data) {
    try {
        const response = await fetch(`https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.json?size=10&classificationId=KZFzniwnSyZfZ7v7na&apikey=y7jtPwcsLI955aEToVqLFC7r53xG1Umr`, {            
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json()
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
async function postArtsValues() {
    for (var i = 0; i < data.events.length; i++){
        const embeddedValues = data._embedded
        const venue = data._embedded.venue[i]
        const price_range_min = embeddedValues.priceRanges[0].min.value
        const price_range_max = embeddedValues.priceRanges[0].max.value
        const start_date = embeddedValues.dates.start.localDate.value
        const start_time = embeddedValues.dates.start.localTime.value
    const postResponse = await fetch(`https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.json?size=10&classificationId=KZFzniwnSyZfZ7v7na&apikey=y7jtPwcsLI955aEToVqLFC7r53xG1Umr`, {
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



