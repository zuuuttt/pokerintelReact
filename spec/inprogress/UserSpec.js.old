var mongoose = require('mongoose');
const server = require('../server')
const conn = 'mongodb://Nicolas:foobar@ds033996.mlab.com:33996/nico-mongodb'

console.log('stuffff');

// mongoose.connect(conn, function(err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Connected');
//     }
// });

const Session = require("../models/Session").Session;
const User = require("../models/User").User;



describe("User creation", function() {


    beforeAll(function(done) {
        User.remove({}, function(err) {
            if (err) {
                console.log(err)
            }
            done()
        })
    })



    // Check validation
    it('1. does not validate users without username', function(done) {
        console.log('test 1');
        var testUser2 = {
            name: 'Samjam'
        }
        var user = new User(testUser2)
        user.validate((err) => {
            expect(err.message).toEqual('User validation failed')
            done()
        })


    })

    // Check if created user can be found in db using findByUsername which should return a user object
    it("2. finds user that was just created in database", function(done) {
        console.log('test 2');
        var testUser = {
            username: 'Noforv',
            name: 'Nicolas'
        }
        var tester = new User(testUser)
        tester.save((err, next) => {
            if (err) return handleError(err)
            User.findByUsername('Noforv', (err, result) => {
                if (err) throw err
                expect(result.username).toEqual(testUser.username)
                done()
            })
        })
    });

    //Check if user can be submitted without username

    //Check uniqueness of username
    it('should not save existing username', (done) => {
        console.log('test 3');
        var testUser3 = {
            username: 'Noforv',
            name: 'Nico3'
        }
        var testUser = {
            username: 'Noforv',
            name: 'Nicolas'
        }
        var user3 = new User(testUser3)
        user3.save((err, cb) => {
            expect(err.code).toEqual(11000)
            done()
        })
    })

    it('should find all fucking users', (done) => {
        var testUser4 = {
            username: 'Samjam',
            name: 'Samuel'
        }
        var testUser5 = {
            username: 'Zuuuttt',
            name: 'Macbook'
        }
        var User4 = new User(testUser4)
        var User5 = new User(testUser5)
        User4.save((err, cb) => {
            User5.save((err, cb) => {
                User.findAllUsers(function(err, result) {
                    expect(result[0].username).toEqual('Noforv')
                    expect(result[1].username).toEqual('Samjam')
                    expect(result[2].username).toEqual('Zuuuttt')
                    done()
                })
            })
        })
    })

});