# pokerintelReact
Poker Intel app built on React-Go.
Use `npm run unit-tests` to run unit tests

Tests are in the spec/controller.spec.js file.  Test data is in 
Hashim.json file.  Contains a user and a list of sessions for that
user.
Main files to edit are:
```
mongo/models/PokerSession.js
mongo/controllers/PokerSession.js
server/config/routes.js
spec/controller.spec.js
```

Functions to handle http req and res and operations are exported from
the controller.
Routes are configured in routes.js, routes.js will call the functions
in the controller.

So far we have added /savePokerSession route
Also added the start function to controller.  Currently broken as the
test data for session uses the user username.  Our mongoose user model
expects that it will be the users email that is in the start pokersession
request.  Need to fix the test so that the we submit user id as part of
the request rather than a username.  Also consider changing the PokerSession model so that we take in user ID rather than the user object inside the PokerSession object.

##====To Do controllers/api routes=====
1) Fix test for startPokerSession
2) Change PokerSession model so it contains userID rather than userObj
3) Complete code for /startPokerSession route so we can save a completed cash session
##==============In Models=====================
1) Add static methods or virtuals for handling the storage and displays of fields like currency
2) complete the Pokersession model so we have cash_session and tourney_session which inherit from PokerSession model see data model drawing
##=======Tests========
1)add tests for how PokerSessions are stored and what the data looks like when rtrieved i.e. using virtuals for currencies etc.



