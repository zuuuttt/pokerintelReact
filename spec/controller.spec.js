import User from '../server/db/mongo/models/user'
import PokerSession from '../server/db/mongo/models/PokerSession';
import supertest from 'supertest'
const test_sessions=require("./testdata/test_sessions.json");
let test_user={
  email:  'zuuuttt@pokerintel.co',
  password: 'pokerintel'
}
//import ObjectID from 'mongodb';
import express from 'express';
import webpack from 'webpack';
import { ENV } from '../server/config/appConfig';
import { connect } from '../server/db';
import passportConfig from '../server/config/passport';
import expressConfig from '../server/config/express';
import routesConfig from '../server/config/routes';
import mongoose from 'mongoose'
//require('jasmine-matchers/dist/matchers')

const app = express();


connect(); //connect to DB

//configure passport
passportConfig();


/*
 * Bootstrap application settings
 */
expressConfig(app);

/*
 * Getting express routes for the app
 *
 *
 */
 routesConfig(app);

//clean the database
let purgeDB=function () {
    

    User.remove({},(err)=> {
        if(err) {
            return HandleError(err); //needs to be implemented
        }
    });
  
    PokerSession.remove({},(err) => {
      if(err) {
        return HandleError(err);
      }
    })
console.log("all records deleted")
}

purgeDB();

const agent = supertest.agent(app);

describe("POST /signup and POST /login routes- tests signup and user login functionality", function() {

    it("tests that we can create a new user which does not exist in the database", function(done) {
      console.log("am i here?")
        agent.post("/signup")               
            .type('form') // mimic the action of submittin a request with a form
            .send(test_user) // {email,password}
            .expect( function(res){// Check that the responce does or does not have the information necessary to make the test pass
              //console.log("REsponse",res.body)
                
                expect(res.status).toBe(200)
                
                
            })
            .end(function(err, res) {          // Allways add these lines when using Supertest with Jasmine
                if(err) {
                   
                    return done.fail(err)
                }
                
                done()
            })
        
    })
    
    it("tests cannot signup with same email address- should receive error", function(done) {
      agent.post("/signup")               
            .type('form') 
            .send(test_user) 
            .expect( function(res){
                
                expect(res.status).toBe(409)

            })
            .end(function(err, res) {          // Allways add these lines when using Supertest with Jasmine
                if(err) {
                   
                    return done.fail(err)
                }
             done();   
            
        })        
    })
    
    it("tests we can retrieve the user and adds _id field to test_user for use in later tests",
      function(done) {
              console.log("before findone")
              User.findOne({email: test_user.email},(err,user) => {
                console.log("test here")
                if(err) {
                  return HandleError(err);
                }
                test_user = user;
                
                expect(test_user).toBeDefined();
                
                done()
            });
         
            
    });
       
    
});
/////////////////////////////////////////// 

describe("test the storing and retrieving of poker session data\n", function() {
    let test_session=test_sessions[0];
    let saved_session={};//pokersession used in the following tests
    
    it("tests POST /SaveCompletedPokerSession save one completed cash session to the database", function(done) {
        
        //line below ensures the test_session has a user
        //field which contains the id of the user that 
        //was previously saved to the database
        test_session.user=test_user['_id'].toString();
        
        agent.post("/SaveCompletedPokerSession")               
            .type('form') 
            .send(test_session)
            .expect((res)=> {
             
              expect(res.status).toBe(200)
              saved_session=res.body;
            })
            .end(function(err, res) {          // Allways add these lines when using Supertest with Jasmine
                if(err) {
                   
                    return done.fail(err)
                }
                
                done()
            })
            
    });
  
    it("tests that the saved poker session had profit correctly saved by save.post middleware", function (done) {
      console.log(saved_session);
      let expected_profit=test_session.cashout-test_session.buyin;
      expect(saved_session.profit).toEqual(expected_profit);
      
      done();
    });
  
    it("tests that the sum of rebuys totals the buyin amount. When rebuys.length = 1 then rebuys[0]===buyin", function (done) {
      let total_rebuys=saved_session.rebuys.reduce((prev,curr) => {
        return prev+=curr;
      },0);
      
      expect(total_rebuys).toEqual(saved_session.buyin)
      done();
    });
  
    it("tests that the calculated duration is a number, i.e. the number of milliseconds between start and end date values", function(done) {
      expect(typeof saved_session.duration).toEqual('number')
      done();
    });
  
    it("tests that the calculated duration is correct by checking start and end date", function (done) {
      let end_date=new Date(test_session.end);
      let start_date=new Date(test_session.start);
      let expected_duration=end_date-start_date;
      expect(expected_duration).toEqual(saved_session.duration);
      done();
    });
  
    it("tests that there is a virtual getter which provides blinds in a suitable format for display to the user", function (done) {
      expect("£2/£2").toEqual(saved_session.blinds.str);
      done();
    });
  
    it("tests that there is a virtual getters which displays buyin with currency symbol for user display", function (done) {
      expect("£"+saved_session.buyin).toEqual(saved_session.buyin.display);
      done();
    });
  
    it("tests that there is a virtual getter which displays cashout amount with currency symbol for user display", function (done) {
      expect("£"+saved_session.cashout).toEqual(saved_session.cashout.display);
      done()
    });
    
});



//    it("tests that users total profit field was updated when we saved the poker session", function(done) {
//      User.findOne({email: test_user.email},(err,user) => {
//        if(err) {
//          return HandleError(err)
//        }
//        let expected_profit=test_session.cashout-test_session.buyin;
//        console.log("user stats")
//        console.log(user.profile.total_profit,user.profile.total_duration)
//        expect(user.profile.total_profit).toEqual(expected_profit);
//        done();
//      });
//    });
//  
//    it("tests that total_duration field was updated for the user", function (done) {
//       User.findOne({email: test_user.email},(err,user) => {
//        if(err) {
//          return HandleError(err)
//        }
//        let expected_duration=test_session.end-test_session.start;
//        console.log("user stats")
//        console.log(user.profile.total_profit,user.profile.total_duration)
//        expect(user.profile.total_duration).toEqual(expected_duration);
//        done();
//      });
//    });

        



