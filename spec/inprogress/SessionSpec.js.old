var mongoose = require('mongoose');
const server = require('../server')
const conn = 'mongodb://Nicolas:foobar@ds033996.mlab.com:33996/nico-mongodb'
const Session = require("../models/Session").Session;
const User = require("../models/User").User;



describe("Session creation", function() {

    beforeAll(function(done) {
        Session.remove({}, function(err) {
            if (err) {
                console.log(err)
            }
            done()
        })
    })



    it('1. does not validate session without username', function(done) {
        console.log('test 1');
        var testsession = {
            username: 'Samjam',
            venue: 'Viage'
        }
        var session = new Session(testsession)
        session.validate((err) => {
            expect(err.message).toEqual('Session validation failed')
            done()
        })


    })

    it("2. finds session that was just created in database", function(done) {
        console.log('test 2');
        var testsession = {
            username: 'Noforv',
            venue: 'Viage',
            variant: 'NLHM',
            blinds: [1, 2],
            buyin: 100,
            cashout: 200,
            start: new Date(1478701961127),
            end: new Date(1478701981127)
        }

        var tester = new Session(testsession)
        tester.save((err, next) => {
            if (err) return handleError(err)
            Session.findOne({
                username: 'Noforv'
            }, (err, result) => {
                if (err) throw err
                expect(result.venue).toEqual(testsession.venue)
                done()
            })
        })
    });

    it("3. Profit is calculated correctly for each saved session", function(done) {
        console.log('test 3');
        var testsession = {
            username: 'Noforv',
            venue: 'Viage',
            variant: 'NLHM',
            blinds: [1, 2],
            buyin: 100,
            cashout: 200,
            start: new Date(1478701961127),
            end: new Date(1478701981127)
        }

        var tester = new Session(testsession)
        tester.save((err, next) => {
            if (err) return handleError(err)
            Session.findOne({
                username: 'Noforv'
            }, (err, result) => {
                if (err) throw err
                expect(result.profit).toEqual(100)
                done()
            })
        })
    });

    it("4. Session duration is calculated correctly for each saved session", function(done) {
        console.log('test 4');
        var testsession = {
            username: 'Noforv',
            venue: 'Viage',
            variant: 'NLHM',
            blinds: [1, 2],
            buyin: 100,
            cashout: 200,
            start: new Date(1478701961127),
            end: new Date(1478701981127)
        }

        var tester = new Session(testsession)
        tester.save((err, next) => {
            if (err) return handleError(err)
            Session.findOne({
                username: 'Noforv'
            }, (err, result) => {
                if (err) throw err
                expect(result.duration).toEqual(testsession.end - testsession.start)
                done()
            })
        })
    });


    it('5. FindAll should return array of all that users sessions', (done) => {
        console.log('test 5');
        var testsession = {
            username: 'Samjam',
            venue: 'The Vic',
            variant: 'NLHM',
            blinds: [1, 2],
            buyin: 100,
            cashout: 200,
            start: new Date(1478701961127),
            end: new Date(1478701981127)
        }
        var testsession2 = {
            username: 'Samjam',
            venue: 'Elium',
            variant: 'NLHM',
            blinds: [1, 2],
            buyin: 100,
            cashout: 200,
            start: new Date(1478701961127),
            end: new Date(1478701981127)
        }
        var testsession3 = {
            username: 'Samjam',
            venue: 'Namur',
            variant: 'NLHM',
            blinds: [1, 2],
            buyin: 100,
            cashout: 200,
            start: new Date(1478701961127),
            end: new Date(1478701981127)
        }

        var session = new Session(testsession)
        var session2 = new Session(testsession2)
        var session3 = new Session(testsession3)

        session.save((err, next) => {
            if (err) return handleError(err)
            session2.save((err, next) => {
                if (err) return handleError(err)
                session3.save((err, next) => {
                    if (err) return handleError(err)
                    Session.findAll('Samjam', (err, result) => {
                        expect(result[0].venue).toEqual('The Vic')
                        expect(result[1].venue).toEqual('Elium')
                        expect(result[2].venue).toEqual('Namur')
                        done()
                    })
                })
            })
        })
    })

});