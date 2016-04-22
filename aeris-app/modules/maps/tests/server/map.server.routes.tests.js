// 'use strict';

// var should = require('should'),
//   request = require('supertest'),
//   path = require('path'),
//   mongoose = require('mongoose'),
//   User = mongoose.model('User'),
//   Map = mongoose.model('Map'),
//   express = require(path.resolve('./config/lib/express'));

// /**
//  * Globals
//  */
// var app, agent, credentials, user, map;

// /**
//  * Map routes tests
//  */
// describe('Map CRUD tests', function () {

//   before(function (done) {
//     // Get application
//     app = express.init(mongoose);
//     agent = request.agent(app);

//     done();
//   });

//   beforeEach(function (done) {
//     // Create user credentials
//     credentials = {
//       username: 'username',
//       password: 'M3@n.jsI$Aw3$0m3'
//     };

//     // Create a new user
//     user = new User({
//       firstName: 'Full',
//       lastName: 'Name',
//       displayName: 'Full Name',
//       email: 'test@test.com',
//       username: credentials.username,
//       password: credentials.password,
//       provider: 'local'
//     });

//     // Save a user to the test db and create new Map
//     user.save(function () {
//       map = {
//         name: 'Map name'
//       };

//       done();
//     });
//   });

//   it('should be able to save a Map if logged in', function (done) {
//     agent.post('/api/auth/signin')
//       .send(credentials)
//       .expect(200)
//       .end(function (signinErr, signinRes) {
//         // Handle signin error
//         if (signinErr) {
//           return done(signinErr);
//         }

//         // Get the userId
//         var userId = user.id;

//         // Save a new Map
//         agent.post('/api/maps')
//           .send(map)
//           .expect(200)
//           .end(function (mapSaveErr, mapSaveRes) {
//             // Handle Map save error
//             if (mapSaveErr) {
//               return done(mapSaveErr);
//             }

//             // Get a list of Maps
//             agent.get('/api/maps')
//               .end(function (mapsGetErr, mapsGetRes) {
//                 // Handle Map save error
//                 if (mapsGetErr) {
//                   return done(mapsGetErr);
//                 }

//                 // Get Maps list
//                 var maps = mapsGetRes.body;

//                 // Set assertions
//                 (maps[0].user._id).should.equal(userId);
//                 (maps[0].name).should.match('Map name');

//                 // Call the assertion callback
//                 done();
//               });
//           });
//       });
//   });

//   it('should not be able to save an Map if not logged in', function (done) {
//     agent.post('/api/maps')
//       .send(map)
//       .expect(403)
//       .end(function (mapSaveErr, mapSaveRes) {
//         // Call the assertion callback
//         done(mapSaveErr);
//       });
//   });

//   it('should not be able to save an Map if no name is provided', function (done) {
//     // Invalidate name field
//     map.name = '';

//     agent.post('/api/auth/signin')
//       .send(credentials)
//       .expect(200)
//       .end(function (signinErr, signinRes) {
//         // Handle signin error
//         if (signinErr) {
//           return done(signinErr);
//         }

//         // Get the userId
//         var userId = user.id;

//         // Save a new Map
//         agent.post('/api/maps')
//           .send(map)
//           .expect(400)
//           .end(function (mapSaveErr, mapSaveRes) {
//             // Set message assertion
//             (mapSaveRes.body.message).should.match('Please fill Map name');

//             // Handle Map save error
//             done(mapSaveErr);
//           });
//       });
//   });

//   it('should be able to update an Map if signed in', function (done) {
//     agent.post('/api/auth/signin')
//       .send(credentials)
//       .expect(200)
//       .end(function (signinErr, signinRes) {
//         // Handle signin error
//         if (signinErr) {
//           return done(signinErr);
//         }

//         // Get the userId
//         var userId = user.id;

//         // Save a new Map
//         agent.post('/api/maps')
//           .send(map)
//           .expect(200)
//           .end(function (mapSaveErr, mapSaveRes) {
//             // Handle Map save error
//             if (mapSaveErr) {
//               return done(mapSaveErr);
//             }

//             // Update Map name
//             map.name = 'WHY YOU GOTTA BE SO MEAN?';

//             // Update an existing Map
//             agent.put('/api/maps/' + mapSaveRes.body._id)
//               .send(map)
//               .expect(200)
//               .end(function (mapUpdateErr, mapUpdateRes) {
//                 // Handle Map update error
//                 if (mapUpdateErr) {
//                   return done(mapUpdateErr);
//                 }

//                 // Set assertions
//                 (mapUpdateRes.body._id).should.equal(mapSaveRes.body._id);
//                 (mapUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

//                 // Call the assertion callback
//                 done();
//               });
//           });
//       });
//   });

//   it('should be able to get a list of Maps if not signed in', function (done) {
//     // Create new Map model instance
//     var mapObj = new Map(map);

//     // Save the map
//     mapObj.save(function () {
//       // Request Maps
//       request(app).get('/api/maps')
//         .end(function (req, res) {
//           // Set assertion
//           res.body.should.be.instanceof(Array).and.have.lengthOf(1);

//           // Call the assertion callback
//           done();
//         });

//     });
//   });

//   it('should be able to get a single Map if not signed in', function (done) {
//     // Create new Map model instance
//     var mapObj = new Map(map);

//     // Save the Map
//     mapObj.save(function () {
//       request(app).get('/api/maps/' + mapObj._id)
//         .end(function (req, res) {
//           // Set assertion
//           res.body.should.be.instanceof(Object).and.have.property('name', map.name);

//           // Call the assertion callback
//           done();
//         });
//     });
//   });

//   it('should return proper error for single Map with an invalid Id, if not signed in', function (done) {
//     // test is not a valid mongoose Id
//     request(app).get('/api/maps/test')
//       .end(function (req, res) {
//         // Set assertion
//         res.body.should.be.instanceof(Object).and.have.property('message', 'Map is invalid');

//         // Call the assertion callback
//         done();
//       });
//   });

//   it('should return proper error for single Map which doesnt exist, if not signed in', function (done) {
//     // This is a valid mongoose Id but a non-existent Map
//     request(app).get('/api/maps/559e9cd815f80b4c256a8f41')
//       .end(function (req, res) {
//         // Set assertion
//         res.body.should.be.instanceof(Object).and.have.property('message', 'No Map with that identifier has been found');

//         // Call the assertion callback
//         done();
//       });
//   });

//   it('should be able to delete an Map if signed in', function (done) {
//     agent.post('/api/auth/signin')
//       .send(credentials)
//       .expect(200)
//       .end(function (signinErr, signinRes) {
//         // Handle signin error
//         if (signinErr) {
//           return done(signinErr);
//         }

//         // Get the userId
//         var userId = user.id;

//         // Save a new Map
//         agent.post('/api/maps')
//           .send(map)
//           .expect(200)
//           .end(function (mapSaveErr, mapSaveRes) {
//             // Handle Map save error
//             if (mapSaveErr) {
//               return done(mapSaveErr);
//             }

//             // Delete an existing Map
//             agent.delete('/api/maps/' + mapSaveRes.body._id)
//               .send(map)
//               .expect(200)
//               .end(function (mapDeleteErr, mapDeleteRes) {
//                 // Handle map error error
//                 if (mapDeleteErr) {
//                   return done(mapDeleteErr);
//                 }

//                 // Set assertions
//                 (mapDeleteRes.body._id).should.equal(mapSaveRes.body._id);

//                 // Call the assertion callback
//                 done();
//               });
//           });
//       });
//   });

//   it('should not be able to delete an Map if not signed in', function (done) {
//     // Set Map user
//     map.user = user;

//     // Create new Map model instance
//     var mapObj = new Map(map);

//     // Save the Map
//     mapObj.save(function () {
//       // Try deleting Map
//       request(app).delete('/api/maps/' + mapObj._id)
//         .expect(403)
//         .end(function (mapDeleteErr, mapDeleteRes) {
//           // Set message assertion
//           (mapDeleteRes.body.message).should.match('User is not authorized');

//           // Handle Map error error
//           done(mapDeleteErr);
//         });

//     });
//   });

//   it('should be able to get a single Map that has an orphaned user reference', function (done) {
//     // Create orphan user creds
//     var _creds = {
//       username: 'orphan',
//       password: 'M3@n.jsI$Aw3$0m3'
//     };

//     // Create orphan user
//     var _orphan = new User({
//       firstName: 'Full',
//       lastName: 'Name',
//       displayName: 'Full Name',
//       email: 'orphan@test.com',
//       username: _creds.username,
//       password: _creds.password,
//       provider: 'local'
//     });

//     _orphan.save(function (err, orphan) {
//       // Handle save error
//       if (err) {
//         return done(err);
//       }

//       agent.post('/api/auth/signin')
//         .send(_creds)
//         .expect(200)
//         .end(function (signinErr, signinRes) {
//           // Handle signin error
//           if (signinErr) {
//             return done(signinErr);
//           }

//           // Get the userId
//           var orphanId = orphan._id;

//           // Save a new Map
//           agent.post('/api/maps')
//             .send(map)
//             .expect(200)
//             .end(function (mapSaveErr, mapSaveRes) {
//               // Handle Map save error
//               if (mapSaveErr) {
//                 return done(mapSaveErr);
//               }

//               // Set assertions on new Map
//               (mapSaveRes.body.name).should.equal(map.name);
//               should.exist(mapSaveRes.body.user);
//               should.equal(mapSaveRes.body.user._id, orphanId);

//               // force the Map to have an orphaned user reference
//               orphan.remove(function () {
//                 // now signin with valid user
//                 agent.post('/api/auth/signin')
//                   .send(credentials)
//                   .expect(200)
//                   .end(function (err, res) {
//                     // Handle signin error
//                     if (err) {
//                       return done(err);
//                     }

//                     // Get the Map
//                     agent.get('/api/maps/' + mapSaveRes.body._id)
//                       .expect(200)
//                       .end(function (mapInfoErr, mapInfoRes) {
//                         // Handle Map error
//                         if (mapInfoErr) {
//                           return done(mapInfoErr);
//                         }

//                         // Set assertions
//                         (mapInfoRes.body._id).should.equal(mapSaveRes.body._id);
//                         (mapInfoRes.body.name).should.equal(map.name);
//                         should.equal(mapInfoRes.body.user, undefined);

//                         // Call the assertion callback
//                         done();
//                       });
//                   });
//               });
//             });
//         });
//     });
//   });

//   afterEach(function (done) {
//     User.remove().exec(function () {
//       Map.remove().exec(done);
//     });
//   });
// });
