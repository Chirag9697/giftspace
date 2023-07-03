const accountSid = 'AC397b566cff1158eaa0ef16b195c0faca';
const authToken = '29e57766eca439ca84ebda0a3a1eeb0f';
const client = require('twilio')(accountSid, authToken);
function initiate(to){
    client.messages
    .create({
        body: 'hello sir',
        from: '+14344361950',
        to: `${to}`
    })
    .then(message => console.log(message.sid))
}
module.exports=initiate;
    