let express = require('express');
let app = express();
let workout = require('./controllers/logcontroller')

let log = require('./controllers/logcontroller');
let user = require('./controllers/usercontroller');
// app.use('/test', function(req,res){
//     res.send("This is a message from the test endpoint on the server!")
// });

// app.use('/zach', function(req,res){
//     res.send("My name is Zach and I am 30 years old")
// });
app.use('/workout', workout);
app.listen(3000, function(){
    console.log("App is listening on port 3000");
});
