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
    console.log(`${url}/tournaments.json${apiKey}`);
    axios.get(`${url}/tournaments.json${apiKey}`)
    .then(posts => {
        rs.status(200).json(posts.data)
    }).catch(error => {
        res.status(500).send(error)
    });
});

module.exports = router;