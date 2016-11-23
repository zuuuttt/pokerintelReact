var mongoose = require('mongoose');
const User=mongoose.model('User')

var PokerSessionSchema = new mongoose.Schema({


    user: {
        email: {type: String,required: true,lowercase: true},
        name: {type: String, default: 'Playah'}
    },
    venue: {//simple string for now later we make a Venue model
        type: String,
        required: true
    },
    variant: {//needs to be an enumerated list of strings
        type: String,//OK for now just 
        required: true
    },   
    blinds: {//Array with two items of type number
        type: Array,
        required: true
    },
    buyin: {//number- but always returned to user with currency
        type: Number,
        required: true
    },
    rebuys: {
      type: Array, //store each rebuy- first element is initial buyin
      required: false,
      // total buyin = sum of rebuys array
    },//eventually needs to be a required field
    cashout: {//add currency symbol when displaying to user
        type: Number,
        required: true
    },
    start: {//Store as Date object
        type: Date,
        required: true
    },
    end: {//store as date object
        type: Date,
        required: true
    },
    profit: {//add currency symbol when displaying to user->virtuals
        type: Number,
        default : 0
    },
    duration: {//end-start
        type: Number,//store as number of milliseconds easy to convert to
        default: 0    //any time unit for display e.g. 5 hours 30minutes
    },
    hourly: {//hourly profit profit/duration
        type: Number,//e.g. display $21.23 per hour//store 21.23
        default: 0                                     
    },
    rake: {
      type: Number,//this will need it's own model later for now ok
      default: 5
    },
    currency: {
      type: String,//list of currencies e.g. EUR,USD,GBP
      required: true,
      default: 'GBP'
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




  