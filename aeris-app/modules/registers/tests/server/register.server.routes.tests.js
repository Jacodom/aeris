'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Register = mongoose.model('Register'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, register;

/**
 * Register routes tests
 */
describe('Register CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Register
    user.save(function () {
      register = {
        name: 'Register name'
      };

      done();
    });
  });

  it('should be able to save a Register if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Register
        agent.post('/api/registers')
          .send(register)
          .expect(200)
          .end(function (registerSaveErr, registerSaveRes) {
            // Handle Register save error
            if (registerSaveErr) {
              return done(registerSaveErr);
            }

            // Get a list of Registers
            agent.get('/api/registers')
              .end(function (registersGetErr, registersGetRes) {
                // Handle Register save error
                if (registersGetErr) {
                  return done(registersGetErr);
                }

                // Get Registers list
                var registers = registersGetRes.body;

                // Set assertions
                (registers[0].user._id).should.equal(userId);
                (registers[0].name).should.match('Register name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Register if not logged in', function (done) {
    agent.post('/api/registers')
      .send(register)
      .expect(403)
      .end(function (registerSaveErr, registerSaveRes) {
        // Call the assertion callback
        done(registerSaveErr);
      });
  });

  it('should not be able to save an Register if no name is provided', function (done) {
    // Invalidate name field
    register.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Register
        agent.post('/api/registers')
          .send(register)
          .expect(400)
          .end(function (registerSaveErr, registerSaveRes) {
            // Set message assertion
            (registerSaveRes.body.message).should.match('Please fill Register name');

            // Handle Register save error
            done(registerSaveErr);
          });
      });
  });

  it('should be able to update an Register if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Register
        agent.post('/api/registers')
          .send(register)
          .expect(200)
          .end(function (registerSaveErr, registerSaveRes) {
            // Handle Register save error
            if (registerSaveErr) {
              return done(registerSaveErr);
            }

            // Update Register name
            register.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Register
            agent.put('/api/registers/' + registerSaveRes.body._id)
              .send(register)
              .expect(200)
              .end(function (registerUpdateErr, registerUpdateRes) {
                // Handle Register update error
                if (registerUpdateErr) {
                  return done(registerUpdateErr);
                }

                // Set assertions
                (registerUpdateRes.body._id).should.equal(registerSaveRes.body._id);
                (registerUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Registers if not signed in', function (done) {
    // Create new Register model instance
    var registerObj = new Register(register);

    // Save the register
    registerObj.save(function () {
      // Request Registers
      request(app).get('/api/registers')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Register if not signed in', function (done) {
    // Create new Register model instance
    var registerObj = new Register(register);

    // Save the Register
    registerObj.save(function () {
      request(app).get('/api/registers/' + registerObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', register.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Register with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/registers/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Register is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Register which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Register
    request(app).get('/api/registers/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Register with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Register if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Register
        agent.post('/api/registers')
          .send(register)
          .expect(200)
          .end(function (registerSaveErr, registerSaveRes) {
            // Handle Register save error
            if (registerSaveErr) {
              return done(registerSaveErr);
            }

            // Delete an existing Register
            agent.delete('/api/registers/' + registerSaveRes.body._id)
              .send(register)
              .expect(200)
              .end(function (registerDeleteErr, registerDeleteRes) {
                // Handle register error error
                if (registerDeleteErr) {
                  return done(registerDeleteErr);
                }

                // Set assertions
                (registerDeleteRes.body._id).should.equal(registerSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Register if not signed in', function (done) {
    // Set Register user
    register.user = user;

    // Create new Register model instance
    var registerObj = new Register(register);

    // Save the Register
    registerObj.save(function () {
      // Try deleting Register
      request(app).delete('/api/registers/' + registerObj._id)
        .expect(403)
        .end(function (registerDeleteErr, registerDeleteRes) {
          // Set message assertion
          (registerDeleteRes.body.message).should.match('User is not authorized');

          // Handle Register error error
          done(registerDeleteErr);
        });

    });
  });

  it('should be able to get a single Register that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Register
          agent.post('/api/registers')
            .send(register)
            .expect(200)
            .end(function (registerSaveErr, registerSaveRes) {
              // Handle Register save error
              if (registerSaveErr) {
                return done(registerSaveErr);
              }

              // Set assertions on new Register
              (registerSaveRes.body.name).should.equal(register.name);
              should.exist(registerSaveRes.body.user);
              should.equal(registerSaveRes.body.user._id, orphanId);

              // force the Register to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Register
                    agent.get('/api/registers/' + registerSaveRes.body._id)
                      .expect(200)
                      .end(function (registerInfoErr, registerInfoRes) {
                        // Handle Register error
                        if (registerInfoErr) {
                          return done(registerInfoErr);
                        }

                        // Set assertions
                        (registerInfoRes.body._id).should.equal(registerSaveRes.body._id);
                        (registerInfoRes.body.name).should.equal(register.name);
                        should.equal(registerInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Register.remove().exec(done);
    });
  });
});
