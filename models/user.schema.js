var mongoose = require('maongoose');
const Schema = mongoose.Schema;
var bcypt = require('bcrypt');

/* user schema attribute */
var userSchema = new Schema({
    email: {
        type: email,
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
        bcypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

/*compare password in the database */
userSchema.methods.comparePassword = (password) => {
    return bcypt.compareSync(password, this.password)
};
module.exports=mongoose.model('User',userSchema)