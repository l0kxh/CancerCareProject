// fetch(
//   `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
//     'vnr vignana jyothi'
//   )}&key=${"0e0e927ec8874af38dd0a8614fe2e9c6"}`
// )
//   .then((response) => response.json())
//   .then((data) => {
//     const places = data.results.map(result => result.formatted);
//     console.log(places)
//   });
fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent('kamared')}`)
.then(data=>data.json())
.then(res=>console.log(res))