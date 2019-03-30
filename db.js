const chalk = require('chalk');
var mongoose = require('mongoose');
var database=require('./config/index')
mongoose.set('useCreateIndex', true);
module.exports = mongoose.connect(database.app.database, {
    useNewUrlParser: true
}, (err) => {
    if (err) {
        console.log(chalk.red(`Got some internal error connecting to the database:`))
    } else {
        console.log(chalk.italic(`Sucessfully connected to mLab`))
    };

});