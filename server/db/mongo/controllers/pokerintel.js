const express = require('express');
const router = express.Router();
const User = require("../models/User").User;
const Session=require("../models/Session").Session;

function handleError(err,req,res,next) {
    console.log("error handleError",err);
    if(err.code===11000) {              
        res.redirect('/')
    }
    if(err.name==='ValidationError') {
        res.redirect('/')
    }
   
}

router.get('/', (req, res) => {
    User.findAllUsers(function(err, result) {
        
        res.render('index.ejs', {
            usernames: result
        })
    })
})

router.get('/about', (req, res) => {
    res.render('about.ejs')
})

router.get('/user/new', (req, res) => {
    res.render('createuser.ejs')
})

router.post('/user/create', (req, res,next) => {
    
        
        var username = req.body.username
 
        var userObj = {
            "username": username,
            "name": req.body.name
        }
        var user=new User(userObj);      
        
        user.save().then((saved_user)=> {
            
            res.redirect('/user/'+username);
        })
        .catch(next)
      
});

router.use(handleError);


router.get('/user/:username', (req, res) => {
    User.findByUsername(req.params.username,(err,user)=> {
        //console.log(user);
        res.render('userprofile.ejs',user);
    });
});


router.get('/user/:username/session/new', (req, res) => {
    res.render('createpokersession', {
        username: req.params.username
    })
})

router.post('/user/:username/session/create', (req, res,next) => {

    var sessionObj = {
        username: req.params.username,
        venue: req.body.venue,
        variant: req.body.variant,
        blinds: [req.body.smblind, req.body.bigblind],
        buyin: req.body.buyin,
        cashout: req.body.cashout,
        start: new Date(req.body.start),
        end: new Date(req.body.end)
    }
    
  
            var session = new Session(sessionObj);
            session.save()
            .then((saved_session)=> {
                res.redirect('/user/'+req.params.username+'/session/list')
            })
            .catch(next);
        
  
  
    
   
})
router.use(handleError);

router.get('/user/:username/session/list',(req,res) => {
    Session.findAll(req.params.username,(err,sessions)=> {
        res.render('userpokersessions.ejs', {
                sessions: sessions,
                username: req.params.username
        });
        
    });
});


module.exports = router