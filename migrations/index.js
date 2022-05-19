const axios = require('axios');

const file = require('./sampleData.json');

const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjYTFjNGQ1LTcyYjktNGQwNS05OTFjLTM1ZGQwMjUyNDc5NiIsIm5hbWUiOiJBZG1pbiIsImRlc2lnbmF0aW9uIjoiU0kiLCJyb2xlIjoibWFzdGVyIiwiaWF0IjoxNjUyOTM3MjU2LCJleHAiOjE2NTMwMjM2NTYsImlzcyI6IlROUE9MIn0.y1or6-s1MXpzKXTtJ57Brcvh5S1e7QS4LwQ90gTBgcQ';

file.arrayOfJson.forEach(async element => {
	try {
		const res = await axios.post('http://localhost:5000/criminal/create', element, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		console.log(res.data.message);
	} catch (err) {
		console.log(err);
	}
});
