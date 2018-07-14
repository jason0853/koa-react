const mongoose = require('mongoose');
const crypto = require('crypto');
const { Schema } = mongoose;

function hash(password) {
  return crypto
    .createHmac('sha256', process.env.SECRET_KEY)
    .update(password)
    .digest('hex');
}

const Account = new Schema({
  profile: {
    username: String,
    thumbnail: { type: String, default: '/static/images/default_thumbnail.png' }
  },
  email: { type: String },
  social: {
    facebook: {
      id: String,
      accessToken: String
    },
    google: {
      id: String,
      accessToken: String
    }
  },
  password: String,
  thoughtCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

Account.statics.localRegister = function({ email, username, password }) {
  const account = new this({
    email,
    profile: {
      username
    },
    password: hash(password)
  });

  return account.save();
};

Account.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

Account.statics.findByUsername = function(username) {
  return this.findOne({ username });
};

Account.statics.findByEmailOrUsername = function({ email, username }) {
  return this.findOne({
    $or: [{ 'profile.username': username }, { email }]
  });
};

module.exports = mongoose.model('Account', Account);
