// Formating the search
// if(data.indexOf(" ") > 0) {
//     let theData = data.replace(/\s/g, '%20')
//     console.log(theData)
//     searchLocation(theData);
//   } else {
//     searchLocation(city);
//   }

async function searchBar(data) {

  

    const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&keyword=${data}}&apikey=y7jtPwcsLI955aEToVqLFC7r53xG1Umr`, {
      method: "GET",
      body: {
        "genreId": "KnvZfZ7vAde",
        "apiKey": "y7jtPwcsLI955aEToVqLFC7r53xG1Umr"
      }
    });
    if (response.ok) {
      console.log(response);
    } else {
      alert("Nothing to search");
    }
    return response;
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