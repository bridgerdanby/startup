const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { PeerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
    console.log("create");
    if (await DB.getUser(req.body.email)) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = await DB.createUser(req.body.email, req.body.password);
  
      // Set the cookie
      setAuthCookie(res, user.token);
      console.log("sent")
      res.send({
        id: user._id,
      });
    }
  });
  
  // GetAuth token for the provided credentials
  apiRouter.post('/auth/login', async (req, res) => {
    console.log("logging in")
    const user = await DB.getUser(req.body.email);

    console.log(user);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        console.log("sending")
        res.send({ id: user._id });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });
  
  // DeleteAuth token if stored in cookie
  apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
  });
  
  // GetUser returns information about a user
  apiRouter.get('/user/:email', async (req, res) => {
    const user = await DB.getUser(req.params.email);
    if (user) {
      const token = req?.cookies.token;
      res.send({ email: user.email, authenticated: token === user.token });
      return;
    }
    res.status(404).send({ msg: 'Unknown' });
  });
  
  // secureApiRouter verifies credentials for endpoints
  var secureApiRouter = express.Router();
  apiRouter.use(secureApiRouter);
  
  secureApiRouter.use(async (req, res, next) => {
    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
      next();
    } else {
      res.status(401).send({ msg: 'Unauthorized' });
    }
  });

// GetGames
secureApiRouter.get('/games', async (_req, res) => {
    const games = await DB.getGames();
    res.send(games);
});

// SubmitGame
secureApiRouter.post('/game', async (req, res) => {
    await DB.addGame(req.body);
    const games = await DB.getGames();
    res.send(games);
});

//get favorites endpoint
secureApiRouter.get('/favorites/:username', async (req, res) => {
    console.log(req.params.username);
    const favorites = await DB.getFavorites(req.params.username);
    //console.log(favorites);
    res.send(favorites);
})

//add favorites
secureApiRouter.post('/favorite/:user', async (req, res) => {
    await DB.addFavorite(req.params.user, req.body);
    const favorites = await DB.getFavorites(req.params.user);
    res.send(favorites);
});

//remove favorite
secureApiRouter.post('/unfavorite', async (req, res) => {
    console.log("unfavorite");
    console.log(req.body);
    await DB.removeFavorite(req.body.user, req.body.game);
    const favorites = await DB.getFavorites(req.params.user);
    res.send(favorites);
});

//get game by time
secureApiRouter.get('/gamestime/:time', async (req, res) => {
    const games = await DB.getGamesByTime(req.params.time);
    res.send(games);
});

// Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
  });
  
  // Return the application's default page if the path is unknown
  app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
  });
  
  // setAuthCookie in the HTTP response
  function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
  }
  
  const httpService = app.listen(port, () => {
    //console.log(`Listening on port ${port}`);
  });

  //websocket
  new PeerProxy(httpService);