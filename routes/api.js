// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router();
const HTTP_STATUS = require('http-status-codes');
const Profile = require('../models/Profile');

//@desc('GET','/','retrieve the profile')

router.get('/profile',(req, res) => {

	Profile.find({}).then(profiles => res.status(HTTP_STATUS.OK).json({
		confirmation: 'success',
		data: profiles
	})).catch(err => res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
		confirmation: 'fail',
		message: err.message
	}));
	
});


module.exports = router
