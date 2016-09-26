/* eslint-disable no-console, no-use-before-define */

import path from 'path'
import Express from 'express'
import session from 'express-session' 
import qs from 'qs'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'


import configureStore from '../common/store/configureStore'
import App from '../common/containers/App'
import { fetchCounter } from '../common/api/counter'

import passport from'passport'
import OAuth2Strategy from'passport-oauth2'
import request from'request'


const gitterHost = 'https://gitter.im';

const app = new Express()
const port = 3000

// gitter
var gitter = {
  fetch: function(path, token, cb) {
    var options = {
     url: gitterHost + path,
     headers: {
       'Authorization': 'Bearer ' + token
     }
    };

    request(options, function (err, res, body) {
      if (err) return cb(err);

      if (res.statusCode === 200) {
        cb(null, JSON.parse(body));
      } else {
        cb('err' + res.statusCode);
      }
    });
  },

  fetchCurrentUser: function(token, cb) {
    this.fetch('/api/v1/user/', token, function(err, user) {
      cb(err, user[0]);
    });
  },

  fetchRooms: function(user, token, cb) {
    this.fetch('/api/v1/user/' + user.id + '/rooms', token, function(err, rooms) {
      cb(err, rooms);
    });
  }
};

passport.use(new OAuth2Strategy({
    authorizationURL:   gitterHost + '/login/oauth/authorize',
    tokenURL:           gitterHost + '/login/oauth/token',
    clientID:           'a343a8b1a4be4f8e1ea281b319ea71f9d95a5999',
    clientSecret:       '444fe201b86b09c9077d78c189b837e65a487611',
    callbackURL:        '/login/callback',
    passReqToCallback:  true
  },
  function(req, accessToken, refreshToken, profile, done) {
    req.session.token = accessToken;
    gitter.fetchCurrentUser(accessToken, function(err, user) {
      return (err ? done(err) : done(null, user));
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, JSON.stringify(user));
});

passport.deserializeUser(function (user, done) {
  done(null, JSON.parse(user));
});

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
app.use(session({secret: 'keyboard cat'}))
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))
app.use(passport.initialize())
app.use(passport.session())

function handleRender(req, res) {
  // Query our mock API asynchronously
  fetchCounter(apiResult => {
    // Read the counter from the request, if provided
    let auth
    const params = qs.parse(req.query)
    
    if(req.session && req.user) {
      auth = { token: req.session.token, user: req.user } 
    }

    const preloadedState = { auth }  
    const store = configureStore(preloadedState)  
    // Grab the initial state from our Redux store
    const finalState = store.getState()  
    // Send the rendered page back to the client
    res.send(renderFullPage(finalState))
  })
}

function renderFullPage(preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Gitter</title>
      </head>
      <body>
        <div id="app"></div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

app.get('/', function(req, res){
  handleRender(req, res)
})

app.get('/login',
  passport.authenticate('oauth2')
);

app.get('/login/callback',
  passport.authenticate('oauth2', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);

app.get('/logout', function(req,res) {
  req.session.destroy();
  res.redirect('/');
});

app.get('/room/*', function(req,res) {
  handleRender(req, res)
})

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
