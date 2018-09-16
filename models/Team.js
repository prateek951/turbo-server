const mongoose = require('mongoose');
const Team = new mongoose.Schema({
    team_name : {
        type: String,
        required: true,
        trim : true,
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    conference: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Team',Team);