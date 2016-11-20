var mongoose = require('mongoose');
const User=mongoose.model('User')

var PokerSessionSchema = new mongoose.Schema({


    user: {
        email: {type: String,required: true,lowercase: true},
        name: {type: String, default: 'Playah'}
    },
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


PokerSessionSchema.post('save',(session)=>{
    
    User.update({email: play.user.email},{$inc: {total_profit: play.profit, total_duration: play.duration}},(err,raw)=> {
        if(err) {
            return handleError(err);
        }
        //console.log('Mongo Response',raw);
    });
    console.log("Session that was saved",play);
    
})

PokerSessionSchema.pre('save', function(next) {
    this.profit=this.cashout-this.buyin;
    this.duration=(this.end-this.start);   
    next();   
});

PokerSessionSchema.virtual('blinds.str').get(function () {
    var small=this.blinds[0].toString();
    var big=this.blinds[1].toString();
    return "£"+small+"/"+"£"+big;
});

//All instances of the sessionSchema will have a findAll, i.e. the Session model
// will have a findAll method.
PokerSessionSchema.statics.findAll=function(username,cb) {  
    return this.find({username: username},cb);
}

export default mongoose.model('PokerSession', PokerSessionSchema);




  