module.exports = function (app) {
  var userModel = require("../model/user/user.model.server")
  var bcrypt = require("bcrypt-nodejs");

  var passport = require('passport');
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  var LocalStrategy = require('passport-local').Strategy;
  passport.use(new LocalStrategy(localStrategy));

  app.get("/api/user/:userId", findUserById);
  app.get("/api/user", findUsers);
  app.post("/api/user", createUser);
  app.put("/api/user/:userId", updateUser);
  app.delete("/api/user/:userId", deleteUser);

  app.post('/api/register', register);
  app.post('/api/login', passport.authenticate('local'), login);
  app.post('/api/logout', logout);
  app.post('/api/loggedIn', loggedIn);


  function logout(req, res) {
    req.logOut();
    res.send(200);
  }


  function login(req, res) {
    res.json(req.user);
  }

  function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
      .createUser(user)
      .then(function(user){
        req.login(user, function(err) {
          res.json(user);
        });
      });
  }
  function loggedIn(req, res) {
    if(req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.send('0');
    }
  }

  function createUser(req, res) {
    var user = {
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }

    userModel.createUser(user)
      .then(function (user) {
        res.json(user);
      });
  }

  function findUserById(req, res) {
    var userId = req.params["userId"];

    userModel.findUserById(userId)
      .then(function (user) {
        res.json(user);
      });
  }

  function findUsers(req, res) {
    var username = req.query["username"];
    var password = req.query["password"];
    if (username && password) {
      var promise = userModel.findUserByCredentials(username, password);
      promise.then(function(user){
        if (user) {
          res.json(user);
        }
        else {
          res.json({});
        }
      });

      return;
    } else if (username) {
      userModel.findUserByUsername(username)
        .then(function (user) {
          if (user) {
            res.json(user);
          }
          else {
            res.json({});
          }
        });
      return;
    }

    userModel.findAllUsers()
      .then(function (users) {
        res.json(users);
      });
  }

  function updateUser(req, res) {
    var userId = req.params.userId;
    var user = {
      username: req.body.username,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    };

    userModel.updateUser(userId, user)
      .then(function (user) {
        res.json(user);
      });
  }

  function deleteUser(req, res) {
    var userId = req.params.userId;

    userModel.deleteUser(userId)
      .then(function (user) {
        res.json(user);
      });
  }

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function (user) {
          done(null, user);
        },
        function (err) {
          done(err, null);
        });
  }

  function localStrategy(usrn, pass, done) {
    userModel
      .findUserByUsername(usrn)
      .then(
        function(user) {
          if(user.username === usrn
            && bcrypt.compareSync(pass, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }});}
}
