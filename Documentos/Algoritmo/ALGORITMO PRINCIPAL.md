```javascript 
@@ -23,58 +23,146 @@ module.exports = function(app) {
    // // Finish by binding the Map middleware
    // app.param('mapId', maps.mapByID);
- - // app.post(&#39;api/maps&#39;, function(req,res){

- //

- // var ar_der = req.body.ar_der,

- // ar_izq = req.body.ar_izq,

- // ab_der = req.body.ab_der,

- // ab_izq = req.body.ab_izq,

- // fecha = req.body.fecha,

- // cant = 3;

- //

- // // medida de la pantalla

- // var largo = ar_der.lat - ar_izq.lat;

- // var alto = ar_izq.lng - ab_izq.lng;

- //

- // //espaciados

- // var espaciadoX = largo/cant

- // var espaciadoY = alto/cant

- //

- // //array correlativo

- // var lat[];

- // var lng[];

- //

- // for (var i = 0; i &lt;= cant; i++) {

- // push.lat(ab_izq.lat + (i * espaciadoX));

- // push.lng(ab_izq.lng + (i * espaciadoY));

- // }

- //

- // var respuesta = [];

- //

- // User

- // .find(pos.lat: { $gt: ab_izq.lat, $lt: ab_lng.lat }, pos.lng: { $gt: ab_izq.lng, $lt: ar_izq.lng })

- // .populate(&#39;register&#39;)

- // .exec( function(err, doc){

- // if (err) return handleError(err);

- //

- //

- // doc.forEach(function(i, reg){

- //

- // for (var i = 1; i &lt;= cant; i++) {

- // if (reg.pos.lat &lt;= lat[i]){

- // for (var j = 1; j &lt;= cant; j++) {

- // if (reg.pos.lng &lt;= lng[i]){

- //

- // }

- // }

- // }

- // }

- //

- // });

- //

- // });

- //

- // });

+ app.post(&#39;api/maps&#39;, function(req,res){

+ var i,j,k

+

+ var ar_der = req.body.ar_der,

+ ar_izq = req.body.ar_izq,

+ ab_der = req.body.ab_der,

+ ab_izq = req.body.ab_izq,

+ fecha = req.body.fecha,

+ cant = req.body.cant;

+

+ // medida de la pantalla

+ var largo = ar_der.lng - ar_izq.lng;

+ var alto = ar_izq.lat - ab_izq.lat;

+

+ //espaciados para cuadrados(regiones)

+ var espaciadoX = largo/cant

+ var espaciadoY = alto/cant

+

+ //esaciado para marcadores

+ var espaciadoXmarcador = largo/(cant*2)

+ var espaciadoYmarcador = alto/(cant*2)

+

+ //array correlativo lonjitudes/latitudes se relacionan con el lugar en el array que ocupan

+ var lat[];

+ var lng[];

+

+ //array de marcadores a pasar en el front-end

+ var latMarc[];

+ var lngMarc[];

+

+ //llenando array de longitudes y latitudes

+ for (i = 0; i &lt;= cant; i++) {

+ push.lng(ab_izq.lng + (i * espaciadoX));

+ push.lat(ab_izq.lat + (i * espaciadoY));

+ }

+

+ //llenado de lat y lng de marcadores a enviar

+ for (i = 0; i &lt; cant; i++) {

+ push.lngMarc(lng[i] + (i * espaciadoXmarcador));

+ push.latMarc(lat[i] + (i * espaciadoYmarcador++));

+ }

+

+ //arreglo de objetos a enviar

+ var respuesta = [];

+

+ //contadores y sumadores para sacar promedio

+ var contTos[], sumTos[];

+ var contDifResp[], sumDifResp[];

+ var contEstornudos[], sumEstornudos[];

+ var contSibilancia[], sumSibilancia[];

+ var contCatarro[], sumCatarro[];

+

+ //contadores de situacion personal de las regiones

+ var cantFuma, cantAlergico, cantTrabajoPeligroso, cantHipertiroides, cantCeliaco, cantDiabetes1, cantDiabetes2;

+

+ //consulta a mongoDB restringiendo las lat y lng al cuadrado del mapa a pantalla completa

+ User

+ .find({

+ pos.lat: { $gt: ab_izq.lat, $lt: ab_lng.lat },

+ pos.lng: { $gt: ab_izq.lng, $lt: ar_izq.lng },

+ &#39;create_at&#39;: fecha

+ })

+ //relacionando las personas con los registros

+ .populate(&#39;register&#39;)

+ .exec( function(err, doc){

+ if (err) return handleError(err);

+

+ //recorro todos los datos

+ doc.forEach(function(l, reg){

+

+ //recorro las latitudes

+ for (i = 0; i &lt; cant; i++) {

+ if (reg.pos.lat &lt;= lat[i]){

+ //recorro las longitudes

+ for (j = 0; j &lt; cant; j++) {

+ if (reg.pos.lng &lt;= lng[j]){

+

+ //arreglo bidimensional representando coordenadas (x,y)

+

+ //contadores para sacar promedio

+ contTos[i][j] ++;

+ contDifResp[i][j] ++;

+ contEstornudos[i][j] ++;

+ contSibilancia[i][j] ++;

+ contCatarro[i][j] ++;

+

+ //sumador para sacar promedio

+ sumTos[i][j] +=reg.tos;

+ sumDifResp[i][j] +=reg.dificultadRespiratoria;

+ sumEstornudos[i][j] +=reg.estornudos;

+ sumSibilancia[i][j] +=reg.sibilancia;

+ sumCatarro[i][j] +=reg.catarro;

+

+ //estadisticas de personas

+ cantFuma[i][j] += reg.fuma ? 1 : 0;

+ cantAlergico[i][j] += reg.alergico ? 1 : 0;

+ cantTrabajoPeligroso[i][j] += reg.trabajoPeligroso ? 1 : 0;

+ cantHipertiroides[i][j] += reg.hipertiroides ? 1 : 0;

+ cantCeliaco[i][j] += reg.celiaco ? 1 : 0;

+ cantDiabetes1[i][j] += ((reg.diabetes.tiene) &amp;&amp; (reg.diabetes.tipo == 1)) ? 1 : 0;

+ cantDiabetes2[i][j] += ((reg.diabetes.tiene) &amp;&amp; (reg.diabetes.tipo == 2)) ? 1 : 0;

+

+ break;

+ }

+ }

+ }

+ }

+

+ });

+

+ });

+

+ for (k = 1 ; k &lt;= (cant*cant) ; k++) {

+ for (i = 0; i &lt; cant; i++) {

+ for (j = 0; j &lt; cant; j++) {

+

+ respuesta[k] = {

+ promedioTos: (sumTos[i][j]/contTos[i][j]),

+ promedioDificultadRespiratoria: (sumDifResp[i][j]/contDifResp[i][j]),

+ promedioEstornudo: (sumEstornudos[i][j]/contEstornudos[i][j]),

+ promedioSibilancia: (sumSibilancia[i][j]/contSibilancia[i][j]),

+ promedioCatarro: (sumCatarro[i][j]/contCatarro[i][j]),

+ cantidadFumadores: cantFuma[i][j],

+ cantidadAlergicos: cantAlergico[i][j],

+ cantidadTrabajoPeligroso: cantTrabajoPeligroso[i][j],

+ cantidadHipertiroides: cantHipertiroides[i][j],

+ cantidadCeliaco: cantCeliaco[i][j],

+ cantidadDiabetes1: cantDiabetes1[i][j],

+ cantidadDiabetees2: cantDiabetes2[i][j],

+ latMarcador: latMarc[k],

+ lngMarcador: lngMarc[k],

+ }

+

+ }

+ }

+ }

+ res.json(respuesta);

+

+

+ });



// app.post(&#39;api/maps&#39;, function(req,res){

/*

```