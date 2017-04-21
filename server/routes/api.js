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
	//return res.status(401).send('Error message');

	axios.get(`${API}/clients.json`,
	{
		auth: { username: '221dd596d86ee03ddaf6794db22b2d5d', password: '' }
	})
	.then(clients =>
	{
		const promises = clients.data.map((client) =>
		{
			return axios.get(`${API}/clients/${client.ClientID}.json`,
			{
				auth: { username: '221dd596d86ee03ddaf6794db22b2d5d', password: '' }
			})
			.then(clientData =>
			{
				client.clientData = clientData.data;

				return client;
			})
			.catch(error =>
			{
				reject('Failed to get client data');
			});
		});

		return Promise.all(promises);
	})
	.then(clients =>
	{
		return res.status(200).json(clients);
	})
	.catch(error =>
	{
		return res.status(500).send('Something broke');
	});
});

router.get('/client/:clientid', (req, res) =>
{
	const clientid = req.params.clientid;

	if (!clientid)
	{
		return res.status(500).send('No clientid provided');
	}

	let client = {};

	axios.get(`${API}/clients/${clientid}.json`,
	{
		auth: { username: '221dd596d86ee03ddaf6794db22b2d5d', password: '' }
	})
	.then(clientData =>
	{
		client.clientData = clientData.data;

		return axios.get(`${API}/clients/${clientid}/lists.json`,
		{
			auth: { username: '221dd596d86ee03ddaf6794db22b2d5d', password: '' }
		});
	})
	.then(subscriberLists =>
	{
		client.subscriberLists = subscriberLists.data;

		client.subscriberLists = client.subscriberLists.map((list) =>
		{
			list.selected = false;
			return list;
		});

		return axios.get(`${API}/clients/${clientid}/templates.json`,
		{
			auth: { username: '221dd596d86ee03ddaf6794db22b2d5d', password: '' }
		});
	})
	.then(templates =>
	{
		client.templates = templates.data;

		return axios.get(`${API}/clients/${clientid}/drafts.json`,
		{
			auth: { username: '221dd596d86ee03ddaf6794db22b2d5d', password: '' }
		});		
	})
	.then(drafts =>
	{
		client.drafts = drafts.data;

		return res.status(200).json(client);
	})	
	.catch(error =>
	{
		return res.status(500).send('Something broke');
	});
});

router.post('/client/:clientid/newemail', (req, res) =>
{
	const clientid = req.params.clientid;
	const newEmail = 
	{
		Name: req.body.name,
		Subject: req.body.subject,
		FromName: req.body.fromname,
		FromEmail: req.body.fromemail,
		ReplyTo: req.body.replyto,
		ListIDs: (Array.isArray(req.body.lists))? req.body.lists : [req.body.lists],
		TemplateID: req.body.templateid,
		TemplateContent: {
		    Singlelines: [
		      {
		        Content: 'This is a heading',
		        Href: 'http://example.com/'
		      }
		    ],
		    Multilines: [
		      {
		        Content: '<p>This is example</p><p>multiline <a href="http://example.com">content</a>...</p>'
		      }
		    ]
		  }
	}

	axios.post(`${API}/campaigns/${clientid}/fromtemplate.json`, newEmail,
	{
		auth: { username: '221dd596d86ee03ddaf6794db22b2d5d', password: '' }
	})
	.then(campaignid =>
	{
		return res.status(200).json({campaignid : campaignid.data});
	})
	.catch(error =>
	{
		return res.status(500).send('Something broke');
	});
});

module.exports = router;