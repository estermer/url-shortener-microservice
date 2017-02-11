const mongoose = require('mongoose');
let Schema  = mongoose.Schema;

const UrlSchema = new Schema({
  path: String
});

const UrlModel = mongoose.model('Url', UrlSchema);

module.exports = UrlModel;
