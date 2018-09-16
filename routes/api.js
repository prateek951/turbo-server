// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const Profile = require('../models/Profile');

//@desc('GET','/','retrieve the profile')

router.get('/profile',(req, res) => {
	res.json({
		confirmation: 'success',
		date : 'This is the profile endpoint'
	});
});


module.exports = router
