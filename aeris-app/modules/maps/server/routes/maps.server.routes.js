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

  
  
app.post('api/maps', function(req,res) { 
    var i,j,k;

    var ar_der = req.body.ar_der,
        ar_izq = req.body.ar_izq,
        ab_der = req.body.ab_der,
        ab_izq = req.body.ab_izq,
        fecha = req.body.fecha,
        cant = req.body.cant;
  
    //  medida de la pantalla
    var largo = ar_der.lng - ar_izq.lng;
    var alto = ar_izq.lat - ab_izq.lat;
  
    //espaciados para cuadrados(regiones)
    var espaciadoX = largo/cant;
    var espaciadoY = alto/cant;

    //esaciado para marcadores
    var espaciadoXmarcador = largo/(cant*2);
    var espaciadoYmarcador = alto/(cant*2);

    //array correlativo lonjitudes/latitudes se relacionan con el lugar en el array que ocupan
    var lat = [];
    var lng = [];

    //array de marcadores a pasar en el front-end
    var latMarc = [];
    var lngMarc = [];
    
    //llenando array de longitudes y latitudes
    for (i = 0; i <= cant; i++) {
      lng.push(ab_izq.lng + (i * espaciadoX));
      lat.push(ab_izq.lat + (i * espaciadoY));
    }

    //llenado de lat y lng de marcadores a enviar
    for (i = 0; i < cant; i++) {
      lngMarc.push(lng[i] + (i * espaciadoXmarcador));
      latMarc.push(lat[i] + (i * espaciadoYmarcador));
    }

    //arreglo de objetos a enviar
    var respuesta = [];

    //contadores y sumadores para sacar promedio
    var contTos = [], sumTos = [];
    var contDifResp = [], sumDifResp = [];
    var contEstornudos = [], sumEstornudos = [];
    var contSibilancia = [], sumSibilancia = [];
    var contObstNasal = [], sumObstNasal = [];
    var contArdorOjos = [], sumArdorOjos = [];
    var contCatarro = [], sumCatarro = [];
    var contMucosidad = [], sumMucosidad = [];

    //contadores de situacion personal de las regiones
    var cantFuma = [],
        cantAlergico = [],
        cantTrabajoPeligroso = [],
        cantTiroidesHyper = [],
        cantTiroidesHypo = [],
        cantCeliaco = [],
        cantDiabetesGest = [],
        cantDiabetes1 = [],
        cantDiabetes2 = [];

    for (i = 0; i < cant ; i++) {
        contTos[i] = [];
        sumTos = [];
        contDifResp = [];
        sumDifResp = [];
        contEstornudos = [];
        sumEstornudos = [];
        contSibilancia = [];
        sumSibilancia = [];
        contObstNasal = [];
        sumObstNasal = [];
        contArdorOjos = [];
        sumArdorOjos = [];
        contCatarro = [];
        sumCatarro = [];
        contMucosidad = [];
        sumMucosidad  = [];
        cantFuma = [];
        cantAlergico = [];
        cantTrabajoPeligroso = [];
        cantTiroidesHyper = [];
        cantTiroidesHypo = [];
        cantCeliaco = [];
        cantDiabetesGest = [];
        cantDiabetes1 = [];
        cantDiabetes2    = [];
    }

    //consulta a mongoDB restringiendo las lat y lng al cuadrado del mapa a pantalla completa
    User
      .find({
          'pos.lat': { $gt: ab_izq.lat, $lt: ab_izq.lat },
          'pos.lng': { $gt: ab_izq.lng, $lt: ar_der.lng }
      })
      //relacionando las personas con los registros
      .populate('register')
      .where({'create_at': fecha})
      .exec( function(err, doc){
        if (err) return handleError(err);
  
        //recorro todos los datos
        doc.forEach(function(l, reg){
          
          //recorro las latitudes
          for (i = 0; i < cant; i++) {
            if (reg.pos.lat <= lat[i]){
              //recorro las longitudes
              for (j = 0; j < cant; j++) {
                if (reg.pos.lng <= lng[j]){
                  
              //arreglo bidimensional representando coordenadas (x,y)  


                  //contadores para sacar promedio
                  contTos[i][j] += (reg.tos > 0) ? 1 : 0;
                  contDifResp[i][j] += (reg.dificultadRespiratoria) > 0 ? 1 : 0;
                  contEstornudos[i][j] += (reg.estornudos > 0) ? 1 : 0;
                  contSibilancia[i][j] += (reg.sibilancia > 0) ? 1 : 0;
                  contObstNasal[i][j] += (reg.obstruccionNasal > 0) ? 1 : 0;
                  contArdorOjos[i][j] += (reg.andorOjos > 0) ? 1 : 0;
                  contCatarro[i][j] += (reg.catarro > 0) ? 1 : 0;      
                  contMucosidad[i][j] += (reg.mucosidad > 0) ? 1 : 0;


                  //sumador para sacar promedio
                  sumTos[i][j] += (reg.tos > 0) ? reg.tos : 0;
                  sumDifResp[i][j] +=(reg.dificultadRespiratoria > 0) ? reg.dificultadRespiratoria : 0;
                  sumEstornudos[i][j] += (reg.estornudos > 0) ? reg.estornudos : 0;
                  sumSibilancia[i][j] += (reg.sibilancia > 0) ? reg.sibilancia : 0;
                  sumObstNasal[i][j] += (reg.obstruccionNasal > 0) ? reg.obstruccionNasal : 0;
                  sumArdorOjos[i][j] += (reg.andorOjos > 0) ? reg.andorOjos : 0;
                  sumCatarro[i][j] += (reg.catarro > 0) ? reg.catarro : 0;
                  sumMucosidad[i][j] += (reg.mucosidad > 0) ? reg.mucosidad : 0;
                  

                  //estadisticas de personas
                  cantFuma[i][j] += reg.smoke ? 1 : 0;
                  cantAlergico[i][j] += reg.allergic ? 1 : 0;
                  cantTrabajoPeligroso[i][j] += reg.toxic ? 1 : 0;
                  cantTiroidesHyper[i][j] += ((reg.thyroid.tiene) && (reg.thyroid.tiene =='hyper' )) ? 1 : 0;
                  cantTiroidesHypo[i][j] += ((reg.thyroid.tiene) && (reg.thyroid.tiene =='hypo' )) ? 1 : 0;
                  cantCeliaco[i][j] += reg.celiac ? 1 : 0;
                  cantDiabetesGest[i][j] += ((reg.diabetes.tiene) && (reg.diabetes.tipo == 'gestacional')) ? 1 : 0;
                  cantDiabetes1[i][j] += ((reg.diabetes.tiene) && (reg.diabetes.tipo == 'type1')) ? 1 : 0;
                  cantDiabetes2[i][j] += ((reg.diabetes.tiene) && (reg.diabetes.tipo == 'type2')) ? 1 : 0;

                }
              }
            }
          }

        });
      });//fin exec



    //llenando un array de objetos para enviar
    for (k = 1 ; k <= (cant*cant) ; k++) {      
        
        //for anidados para recorrer arrays bidimensionales y asignarlos al array de objetos
        for (i = 0; i < cant; i++) {
          for (j = 0; j < cant; j++) {
          

            respuesta[k] = {
              promedioTos: (sumTos[i][j]/contTos[i][j]), //promedios 
              promedioDificultadRespiratoria: (sumDifResp[i][j]/contDifResp[i][j]), //promedios
              promedioEstornudo: (sumEstornudos[i][j]/contEstornudos[i][j]), //promedios
              promedioSibilancia: (sumSibilancia[i][j]/contSibilancia[i][j]), //promedios
              promedioObstruccionNasal: (sumObstNasal[i][j]/contObstNasal[i][j]), //promedios
              promedioArdorOjos: (sumArdorOjos[i][j]/contArdorOjos[i][j]), //promedios
              promedioCatarro: (sumCatarro[i][j]/contCatarro[i][j]), //promedios
              promedioMucosidad: (sumMucosidad[i][j]/contMucosidad[i][j]), //promedios
              cantidadFumadores: cantFuma[i][j],
              cantidadAlergicos: cantAlergico[i][j],
              cantidadTrabajoPeligroso: cantTrabajoPeligroso[i][j],
              cantidadTiroidesHyper: cantTiroidesHyper[i][j],
              cantidadTiroidesHypo: cantTiroidesHypo[i][j],
              cantidadCeliaco: cantCeliaco[i][j],
              cantidadDiabetesGestacional: cantDiabetesGest[i][j],
              cantidadDiabetes1: cantDiabetes1[i][j],
              cantidadDiabetees2: cantDiabetes2[i][j],
              latMarcador: latMarc[k],
              lngMarcador: lngMarc[k],
            }

          }        
        }
    }

    res.json(respuesta);
  
  });


};
