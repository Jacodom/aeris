(function (google) {
  'use strict';

  angular
    .module('maps')
    .controller('MapsListController', MapsListController);

  MapsListController.$inject = ['MapsService'];

  function MapsListController(MapsService) {
    console.log(google);
    var vm = this;

    var mapOptions = {
        center: new google.maps.LatLng(21, 78),
        zoom: 5,
        maxZoom: 6
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var getTileUrl = function(tile, zoom) {
        return "//map1.vis.earthdata.nasa.gov/wmts-webmerc/" +
               "MODIS_Terra_Aerosol/default/2013-12-02/" +
               "GoogleMapsCompatible_Level6/" +
                zoom + "/" + tile.y + "/" +
                tile.x + ".png";
    };

    var layerOptions = {
        alt: "MODIS_Terra_Aerosol",
        getTileUrl: getTileUrl,
        maxZoom: 6,
        minZoom: 1,
        name: "MODIS_Terra_Aerosol",
        tileSize: new google.maps.Size(256, 256),
        opacity: 0.5
    };

    var imageMapType = new google.maps.ImageMapType(layerOptions);
    map.overlayMapTypes.insertAt(0, imageMapType);
  }
})(google);
