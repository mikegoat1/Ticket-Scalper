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


async function generateInfo(data) {
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