var mongoose = require('mongoose');
const User=mongoose.model('User')
const variants=[
  'No Limit Holdem',
  'Pot Limit Omaha',
  'Limit Holdem',
  'Limit O8',
  'Pot Limit O8',
  'Mixed',
  'Other'
];
const currencies=[
  'EUR',
  'GBP',
  'USD'
]

var PokerSessionSchema = new mongoose.Schema({

    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true
    
    
    },
   
    venue: {//simple string for now later we make a Venue model
        type: String,
        required: true
    },
    variant: {//needs to be an enumerated list of strings
        type: String,
        enum: variants,//OK for now just 
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
      percentage: {type: Number,required: true, default: 5},
      cap: {type: Number,required: true, default: 10}
    },
    currency: {
      type: String,
      enum: currencies,//list of currencies e.g. EUR,USD,GBP
      required: true,
      default: 'GBP'
    }


});


PokerSessionSchema.post('save',(pokerSession) => {
  User.update( {_id: pokerSession.user},{
    $inc: {
      total_profit: pokerSession.profit, 
      total_duration: pokerSession.duration
    }
  },(err,raw) => {
        if(err) {
            return handleError(err);
        }
    });
    
    
})

PokerSessionSchema.pre('save', function(next) {
    this.profit=this.cashout-this.buyin;
    this.duration=(this.end-this.start);   
    next();   
});

PokerSessionSchema.virtual('blinds.display').get(function () {
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




  