import User from '../server/db/mongo/models/user'
import supertest from 'supertest'
const Hashim=require("./testdata/Hashim.json")
//import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import express from 'express';
import webpack from 'webpack';
import { ENV } from '../server/config/appConfig';
import { connect } from '../server/db';
import passportConfig from '../server/config/passport';
import expressConfig from '../server/config/express';
import routesConfig from '../server/config/routes';

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
            return HandleError(err);
        }
    });
console.log("all records deleted")
}

purgeDB();

const agent = supertest.agent(app);

describe("POST /signup and POST /login routes- tests signup and user login functionality", function() {

    it("tests that we can create a new user which does not exist in the database", function(done) {
      console.log("am i here?")
        agent.post("/signup")               
            .type('form') // mimic the action of submittin a request with a form
            .send(Hashim.user) // {email,password}
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
            .type('form') // mimic the action of submittin a request with a form
            .send(Hashim.user) // {email,password}
            .expect( function(res){// Check that the responce does or does not have the information necessary to make the test pass
              //console.log("Response",res.body)
                
                expect(res.status).toBe(409)

            })
            .end(function(err, res) {          // Allways add these lines when using Supertest with Jasmine
                if(err) {
                   
                    return done.fail(err)
                }
                
                done()
            })        
    })    
    
});
/////////////////////////////////////////// 
describe("test the storing and retrieving of poker session data", function() {

    it("tests POST /startPokerSession save one completed cash session to the database", function(done) {
        //console.log("am i here?")
        agent.post("/startPokerSession")               
            .type('form') 
            .send(Hashim.sessions[0]) //use first session in Hashim.json
            .expect((res)=> {
              expect(res.status).toBe(200)
          
            })
            .end(done)
    })
});

        



