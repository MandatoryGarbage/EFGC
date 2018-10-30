const express = require('express');
const router = express.Router();
const axios = require('axios');
const url = 'https://api.challonge.com/v1';
const apiKey = '?api_key=tOYOgijdEPmckv1X8LFOulq30YtPDLCedKkXWBHl'

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/tournaments', (req, res) => {
    console.log(`${url}/tournaments.json${apiKey}&created_after=2018-10-10`);
    axios.get(`${url}/tournaments.json${apiKey}&created_after=2018-10-10`)
    .then(tournaments => {
        res.status(200).json(tournaments.data)
    }).catch(error => {
        console.log(error);
        res.status(500).send(error)
    });
});

module.exports = router;