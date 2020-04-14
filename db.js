var mongoose = require('mongoose');
var config = require('./config');
module.exports = {
    connectDB : function() {
        mongoose.connect(config.db, {useNewUrlParser: true,useUnifiedTopology: true});
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
        console.log("DataBase Connected");  
        });
    },
}
