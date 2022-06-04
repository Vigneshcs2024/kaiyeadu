const axios = require('axios');

const criminalFile = require('./criminalData.json');
const userFile = require('./userData.json');
const stationFile = require('./police_stations_data.json');

const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjYTFjNGQ1LTcyYjktNGQwNS05OTFjLTM1ZGQwMjUyNDc5NiIsIm5hbWUiOiJBZG1pbiIsImRlc2lnbmF0aW9uIjoiU0kiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTQzNjQzMzIsImV4cCI6MTY1NDQ1MDczMiwiaXNzIjoiVE5QT0wifQ.VrzFs-rRjmzp5-6FzSmHVluYwtrU1jc7e9OdveTNiw0';

console.log('Criminal data insertion started ! ');
let startingDate = new Date();

criminalFile.arrayOfJson.forEach(async element => {
	try {
		await axios.post('http://localhost:5000/criminal/create', element, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
	} catch (err) {
		console.log(err);
	}
});

// userFile.arrayOfJson.forEach(async element => {
// 	try {
// 		const res = await axios.post('http://localhost:5000/user/create', element, {
// 			headers: {
// 				Authorization: `Bearer ${token}`
// 			}
// 		});
// 		console.log(res.data.message);
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

// stationFile.arrayOfJson.forEach(async (element,ind) => {
// 	try {
// 		const res = await axios.post('http://localhost:5000/police-station/create', element, {
// 			headers: {
// 				Authorization: `Bearer ${token}`
// 			}
// 		});
// 		console.log(res.data.message + (ind + 1));
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

console.log('Criminal data insertion successful !! ');
console.log('Total Records : ' + criminalFile.arrayOfJson.length);
console.log(`Total time taken - ${Math.abs(startingDate - new Date())}ms `);
