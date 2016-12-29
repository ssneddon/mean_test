var mongoose = require('mongoose');

module.exports = function(config) {
 mongoose.connect(config.db);
 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection   error...'));
 db.once('open', function callback() {
  console.log('multivision db opened');
 });

 var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String
 });
 var user = mongoose.model('User', userSchema);

 user.find({}).exec(function(err, collection){
     if(collection.length === 0){
                user.create({firstName:'Joe',lastName:'Eames', userName:'joe'});
user.create({firstName:'John',lastName:'Papa', userName:'john'});
user.create({firstName:'Dan',lastName:'Wahlin', userName:'dan'});
         }

 })
}
