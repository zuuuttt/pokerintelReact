var mongoose = require('mongoose');
const User=mongoose.model('User')

var sessionSchema = new mongoose.Schema({


    username: {type: String,required: true},
    
    venue: {
        type: String,
        required: true
    },
    //6th
    variant: {
        type: String,
        required: true
    },
    //7th
    blinds: {
        type: Array,
        required: true
    },
    //11th
    buyin: {
        type: Number,
        required: true
    },
    //12th
    cashout: {
        type: Number,
        required: true
    },
    //1st
    start: {
        type: Date,
        required: true
    },
    //2nd
    end: {
        type: Date,
        required: true
    },
    //let
    profit: {
        type: Number,
        default
        : 0
    },
    //5th
    duration: {
        type: Number,
        default: 0
    }


});


sessionSchema.post('save',(session)=>{
    
    User.update({username: session.username},{$inc: {total_profit: session.profit, total_duration: session.duration}},(err,raw)=> {
        if(err) {
            return handleError(err);
        }
        //console.log('Mongo Response',raw);
    });
    console.log("Session that was saved",session);
    
})

sessionSchema.pre('save', function(next) {
    this.profit=this.cashout-this.buyin;
    this.duration=(this.end-this.start);   
    next();   
});

sessionSchema.virtual('blinds.str').get(function () {
    var small=this.blinds[0].toString();
    var big=this.blinds[1].toString();
    return "£"+small+"/"+"£"+big;
});

//All instances of the sessionSchema will have a findAll, i.e. the Session model
// will have a findAll method.
sessionSchema.statics.findAll=function(username,cb) {  
    return this.find({username: username},cb);
}


exports.Session=mongoose.model('Session', sessionSchema);



  