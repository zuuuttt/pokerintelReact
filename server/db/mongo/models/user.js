/**
 * Defining a User Model in mongoose
 * Code modified from https://github.com/sahat/hackathon-starter
 */

import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose';

// Other oauthtypes to be added

/*
 User Schema
 */

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  tokens: Array,
  profile: {
    name: { type: String, default: '' },
    gender: { type: String, default: '' },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    num_sessions: {type: Number, default: 0},
    total_profit: {type: Number, default: 0},
    total_duration: {type: Number, default: 0},
    hourly_rate: {type: Number, default: 0},
    base_currency: {type: String, required: true, uppercase: true, default: 'GBP'},
    picture: { type: String, default: '' }
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  google: {}
});

function encryptPassword(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  return bcrypt.genSalt(5, (saltErr, salt) => {
    if (saltErr) return next(saltErr);
    return bcrypt.hash(user.password, salt, null, (hashErr, hash) => {
      if (hashErr) return next(hashErr);
      user.password = hash;
      return next();
    });
  });
}

/**
 * Password hash middleware.
 */
UserSchema.pre('save', encryptPassword);

/*
 Defining our own custom document instance method
 */
UserSchema.methods = {
  comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return cb(err);
      return cb(null, isMatch);
    });
  }
};

/**
 * Statics
 */

UserSchema.statics = {};

UserSchema.statics.findAllUsers=function(cb) {
    return this.find({},cb);
}

UserSchema.statics.findByEmail = function(email, cb) {
    
    return this.findOne({email: email},cb);
}

export default mongoose.model('User', UserSchema);
