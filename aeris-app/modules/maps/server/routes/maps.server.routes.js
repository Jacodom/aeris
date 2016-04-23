'use strict';

/**
 * Module dependencies
 */
var mapsPolicy = require('../policies/maps.server.policy');
var maps = require('../controllers/maps.server.controller');
var Register = require('../../../registers/server/models/register.server.model');
var User = require('../../../users/server/models/user.server.model');


module.exports = function(app) {
  // Maps Routes
  // app.route('/api/maps').all(mapsPolicy.isAllowed)
  //   .get(maps.list)
  //   .post(maps.create);

  // app.route('/api/maps/:mapId').all(mapsPolicy.isAllowed)
  //   .get(maps.read)
  //   .put(maps.update)
  //   .delete(maps.delete);

  // // Finish by binding the Map middleware
  // app.param('mapId', maps.mapByID);

  app.post('api/maps', function(req,res){
    /*
    var ar_der = req.body.ar_der,
        ar_izq = req.body.ar_izq,
        ab_der = req.body.ab_der,
        ab_izq = req.body.ab_izq,
        fecha = req.body.fecha,
        cant = 3;

    //  medida de la pantalla
    var largo = ar_der.lat - ar_izq.lat;
    var alto = ar_izq.lng - ab_izq.lng;

    //espaciados
    var espaciadoX = largo/cant
    var espaciadoY = alto/cant

    //array correlativo
    var lat[];
    var lng[];

    for (var i = 0; i <= cant; i++) {
      push.lat(ab_izq.lat + (i * espaciadoX));
      push.lng(ab_izq.lng + (i * espaciadoY));
    }

    var respuesta = [];

    User
      .find(pos.lat: { $gt: ab_izq.lat, $lt: ab_lng.lat }, pos.lng: { $gt: ab_izq.lng, $lt: ar_izq.lng })
      .populate('register')
      .exec( function(err, doc){
        if (err) return handleError(err);


        doc.forEach(function(i, reg){

          for (var i = 1; i <= cant; i++) {
            if (reg.pos.lat <= lat[i]){
              for (var j = 1; j <= cant; j++) {
                if (reg.pos.lng <= lng[i]){

                }
              }
            }
          }

        });

    });
*/
  });
};
