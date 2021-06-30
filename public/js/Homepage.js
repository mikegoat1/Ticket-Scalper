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

//Auto generate all the images in the homepage
async function generateSports() {
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&keyword=sports&apikey=y7jtPwcsLI955aEToVqLFC7r53xG1Umr`, {
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







async function generateMusic(data) {
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&keyword=music&apikey=y7jtPwcsLI955aEToVqLFC7r53xG1Umr`, {
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

async function generateArts(data) {
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&keyword=arts&apikey=y7jtPwcsLI955aEToVqLFC7r53xG1Umr`, {
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


  // fetch("https://ticketmasterstefan-skliarovv1.p.rapidapi.com/getSingleGenre", {
  // 	"method": "GET",
  // 	"body": {
  // 		"genreId": "KnvZfZ7vAde",
  // 		"apiKey": "y7jtPwcsLI955aEToVqLFC7r53xG1Umr"
  // 	}
  // })
  // .then(response => {
  // 	console.log(response);
  // })
  // .catch(err => {
  // 	console.error(err);
  // });