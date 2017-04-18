const express = require('express');
const router  = express.Router();
const axios   = require('axios');
const API = 'https://api.createsend.com/api/v3.1';

router.get('/', (req, res) =>
{	
	res.send('api works');
});

router.get('/clients', (req, res) =>
{
	axios.get(`${API}/clients.json`,
	{
		auth: { username: '221dd596d86ee03ddaf6794db22b2d5d', password: '' }
	})
	.then(clients =>
	{
		return res.status(200).json(clients.data);
	})
	.catch(error =>
	{	
		console.log(error);
		return res.status(500).send('Something broke');
	});
});

module.exports = router;