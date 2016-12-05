const Hashim=require('./old/Hashim.json');
const fs=require('fs');

let sessions=Hashim.sessions.map((session) => {
  if(session.variant.includes('Holdem') || session.variant.includes('NLHE')) {
    session.variant='No Limit Holdem'
  }
  if (session.variant.includes('Omaha')) {
    session.variant='Pot Limit Omaha'
  }
  return (
  
   {
    venue: session.venue,
    variant: session.variant,
    buyin: session.buyin,
    cashout: session.cashout,
    start: session.start,
    end: session.end,
    blinds: session.blinds,
    currency: 'GBP',
    rake: {
      percentage: 5,
      cap: 10
    }

  }
 )
  
})

sessions=JSON.stringify(sessions)
fs.appendFile('test_sessions.json', sessions, (err) => {
  if (err) throw err;
  console.log('The test sessions were appended to file!');
});

