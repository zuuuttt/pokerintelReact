import PokerSession from '../models/PokerSession.js'

export function save(req, res) {
  
 
  PokerSession.create(req.body, (err,pokerSession) => {
    
    if (err) {
      console.log('THIS IS THE ERROR IN CONTROLLERS!!!!!!!!!!!!!!!!!!!!!!!!!')
      console.log(err);
      return res.status(400).send(err);
    }
    
    return res.send(pokerSession);
  });
}

export default {
    save
}

//
//router.post('/user/:username/session/create', (req, res,next) => {
//
//    var sessionObj = {
//        username: req.params.username,
//        venue: req.body.venue,
//        variant: req.body.variant,
//        blinds: [req.body.smblind, req.body.bigblind],
//        buyin: req.body.buyin,
//        cashout: req.body.cashout,
//        start: new Date(req.body.start),
//        end: new Date(req.body.end)
//    }
//    
//  
//            var session = new Session(sessionObj);
//            session.save()
//            .then((saved_session)=> {
//                res.redirect('/user/'+req.params.username+'/session/list')
//            })
//            .catch(next);
//        
//  
//  
//    
//   
//})