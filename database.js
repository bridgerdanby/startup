const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const userCollection = client.db('familytimegenie').collection('user');
const gameCollection = client.db('familytimegenie').collection('games');
const favoriteCollection =  client.db('familytimegenie').collection('favorites')

function getUser(email) {
    console.log("user");
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function addGame(game) {
  scoreCollection.insertOne(game);
}

function getGames() {
  const query = {};
  //get the games
  const options = { };
  const cursor = gameCollection.find(query, options);
  return cursor.toArray();
}

function getGamesByTime(time) {
  const query = { "time": {time}};
  //get the games
  const options = { };
  const cursor = gameCollection.find(query, options);
  return cursor.toArray();
}

function getFavorites(_user) {
    const query = { user: _user };
    const options = { };
    //console.log("query: ");
    //console.log(query);
    const cursor = favoriteCollection.find(query, options);
    //console.log("favorites ");
    //console.log(cursor.toArray())

    return cursor.toArray();
}

async function addFavorite(_user, game) {
    const fav = {
        user: _user,
        name: game.name,
        description: game.description,
        time: game.time,
        level: game.level
    }
    favoriteCollection.insertOne(fav);
    return true;
}

function removeFavorite(_user, _name) {
    //remove from db
    console.log("remove");
    console.log(_user, _name);
    const user = favoriteCollection.findOne( { user: _user, name:_name } ).user;
    favoriteCollection.deleteOne({ user: _user, name:_name });
    return user;
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addGame,
  getGames,
  getFavorites,
  addFavorite,
  getGamesByTime,
  removeFavorite,
};
