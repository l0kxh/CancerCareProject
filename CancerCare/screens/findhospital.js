const axios = require('axios');

// Replace with the actual latitude and longitude of the user's location
const latitude = '37.7749';
const longitude = '-122.4194';
const radius = 5000; // Specify the radius in meters

const overpassUrl = "http://overpass-api.de/api/interpreter";
const overpassQuery = `
    [out:json];
    node(around:${radius},${latitude},${longitude})["amenity"="hospital"];
    out;
`;

axios.get(overpassUrl, { params: { data: overpassQuery } })
    .then(response => {
        const data = response.data;

        // Process the data as needed
        // for (const element of data['elements']) {
        //     console.log(element);
        //     // console.log(element['tags']['name'], element['lat'], element['lon']);
        // }
        console.log(data.elements)
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
