var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

/* user schema attribute */
var userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        minlength: 8,
    },
    profile: {
        name: {
            type: String,
            default: '',
        },
        picture: {
            type: String,
            default: ''
        }
    },
    address: String,
    history: [{
        date: Date,
        paid: {
            type: Number,
            default: 0
        },
        // item: {
        //     type: Schema.Types.ObjectId,
        //     ref: ''
        // }
    }]
});

/*hash the password before saving to database */
userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

/*compare password in the database */
userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password)
};
module.exports=mongoose.model('User',userSchema)