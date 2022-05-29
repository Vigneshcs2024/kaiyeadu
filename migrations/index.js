const axios = require('axios');

const criminalFile = require('./sampleData.json');
const userFile = require('./userData.json');
const stationFile = require('./police_stations_data.json');

const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjYTFjNGQ1LTcyYjktNGQwNS05OTFjLTM1ZGQwMjUyNDc5NiIsIm5hbWUiOiJBZG1pbiIsImRlc2lnbmF0aW9uIjoiU0kiLCJyb2xlIjoibWFzdGVyIiwiaWF0IjoxNjUzODIyMDEzLCJleHAiOjE2NTM5MDg0MTMsImlzcyI6IlROUE9MIn0.OsAE3l78wA05ySfQY51gjIrWW1SWDfTVg51Z8nRMajY';

// criminalFile.arrayOfJson.forEach(async element => {
// 	try {
// 		const res = await axios.post('http://localhost:5000/criminal/create', element, {
// 			headers: {
// 				Authorization: `Bearer ${token}`
// 			}
// 		});
// 		console.log(res.data.message);
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

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

stationFile.arrayOfJson.forEach(async element => {
	try {
		const res = await axios.post('http://localhost:5000/police-station/create', element, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		console.log(res.data.message);
	} catch (err) {
		console.log(err);
	}
});
