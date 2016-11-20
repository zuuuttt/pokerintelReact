var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    num_sessions: {
        type: Number
    },
    total_profit: {
        type: Number
    },
    total_duration: {
        type: Number //in ms
    },
    hourly_rate: {
        type: Number
    },
    base_currency: {
        type: String
    }

});


userSchema.statics.findAllUsers=function(cb) {
    return this.find({},cb);
}

userSchema.statics.findByUsername = function(username, cb) {
    
    return this.findOne({username: username},cb);
}

userSchema.pre('save',function(next) {
    next()
})
exports.User=mongoose.model('User', userSchema);