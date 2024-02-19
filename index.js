const express = require('express');
const app = express();
const auth = require('./routes/auth')
//

app.get('/',(req,res)=>{
    res.send('<h1>Welcome to the home Page..</h1>')
})


//middleware..
app.use('/auth',auth)
app.use(express.json());



app.listen(5000,()=>{
    console.log('Server is listening on port 5000');
});