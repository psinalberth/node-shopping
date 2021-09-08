import * as mongodb from 'mongodb';
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {

  mongoClient.connect('mongodb://root:password@localhost:27019/test?retryWrites=true')
    .then(client => {
      _db = client.db();
      callback();
    })
    .catch(err => console.log(err));
};

const getDb = () => {
  if (_db) return _db;
  throw 'No database found!'
}


export { mongoConnect, getDb };