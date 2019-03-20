const chalk = require('chalk');
var mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://sagarghimire:sagarghimire1@ds119606.mlab.com:19606/koseli', {
    useNewUrlParser: true
}, (err) => {
    if (err) {
        console.log(chalk.red(`Got some internal error connecting to the database:`))
    } else {
        console.log(chalk.italic(`Sucessfully connected to mLab`))
    };

});