var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');
//this is the connection to mongo using mongoose
module.exports = function(config) {
  // here we are setting the connection to the mongodb with the db member of the config file.
 mongoose.connect(config.db);
 var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection   error...'));
 db.once('open', function callback() {
  console.log('multivision db opened');
 });
//define the mongoose schema
 var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  salt: String,
  hashed_pwd: String,
  roles: [String]
 });

userSchema.methods = {
    authenticate: function(passwordToMatch){
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
}
//create a mongoose model from the schema
 var User = mongoose.model('User', userSchema);

 User.find({}).exec(function(err, collection){
     if(collection.length === 0){
         var salt, hash;
         salt = encrypt.createSalt();
         hash = encrypt.hashPwd(salt, 'joe');
         User.create({firstName:'Joe',lastName:'Eames', userName:'joe', salt:salt, hashed_pwd:hash, roles:['admin']});
       salt = encrypt.createSalt();
       hash = encrypt.hashPwd(salt, 'john');
         User.create({firstName:'John',lastName:'Papa', userName:'john', salt:salt, hashed_pwd:hash, roles:[]});
       salt = encrypt.createSalt();
       hash = encrypt.hashPwd(salt, 'dan');
         User.create({firstName:'Dan',lastName:'Wahlin', userName:'dan', salt:salt, hashed_pwd:hash});
     }

 });
}


