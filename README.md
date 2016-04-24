 <div style="text-align:center;"><img src="https://raw.githubusercontent.com/Jacodom/aeris/master/Dise%C3%B1o/Logo/Aeris%20Logo%20Base.png" alt="Drawing" style="width: 90px;"/></div>
 
#Aeris

Aeris es una plataforma que correlaciona datos satelitales proporcionados por la NASA e información de síntomas de afecciones respiratorias y enfermedades crónicas aportada por cada usuario. A partir de la escasez actual de información relevante que de pautas acerca de la relación entre síntomas y enfermedades, y agentes contaminantes del aire, se busca contribuir generando un nexo entre salud y medio ambiente a nivel mundial. El objetivo de la plataforma es generar un mapa que muestre marcadores que representan los datos ingresados por el usuario y las imágenes provistas por GIBS (Global Imagery Browse Services) para una experiencia de navegación interactiva. La información provista por los usuarios será de acceso libre, siendo entonces una plataforma crowdsourcing en vistas de contribuir con la salud pública y comunidad científica.

Para más información acerca del [proyecto](https://github.com/Jacodom/aeris/blob/master/Documentos/Documentos/PROYECTO.md)
Para más información acerca del [equipo](https://github.com/Jacodom/aeris/blob/master/Documentos/Documentos/TEAM.md)
Para más información sobre el [algoritmo principal](https://github.com/Jacodom/aeris/blob/master/Documentos/Algoritmo/ALGORITMO%20PRINCIPAL.md)

#App
Este proyecto fue generado con [Angular Full-Stack Generator](https://github.com/angular-fullstack/generator-angular-fullstack) version 3.5.0

#Recursos
##Back-end
- [AngularJS](http://angularjs.org/)
- [HTML5](https://www.w3.org/html/logo/)
- [CSS](https://www.w3.org/html/logo/)
- [Bootstrap](http://getbootstrap.com/)
- [Fontawesome](http://fortawesome.github.io/Font-Awesome/)
- [Bower](http://bower.io/)
- [Yeoman](http://yeoman.io/)
- [Mocha](https://mochajs.org/)
- [Jasmine](http://jasmine.github.io/2.0/introduction.html)

##Front-end
- [NodeJS](http://nodejs.org/en/)
- [MongoDB](http://www.mongodb.org/)
- [Express](http://expressjs.com/es/)
- [MeanJS](http://meanjs.org/)
- [NPM](http://www.npmjs.com/)
- [Mongoose](http://mongoosejs.com/)
- [Mermelada](http://github.com/cortezcristian/mermelada)

##APIs
- [GIBS](http://https://earthdata.nasa.gov/about/science-system-description/eosdis-components/global-imagery-browse-services-gibs)
- [Google Maps](http://www.google.com.ar/maps)

#Comenzando
##Requisitos
- [Git](https://git-scm.com/)
- [Node.js and npm](https://github.com/Jacodom/aeris/blob/master/nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](http://bower.io/) ```(npm install --global bower)```
- [Grunt](http://gruntjs.com/) ```(npm install --global grunt-cli)```
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with ```mongod```

##Desarrollo
1. Run ```
npm install
``` to install server dependencies.
2. Run ```
bower install
``` to install front-end dependencies.
3. Run ```
mongod
``` in a separate shell to keep an instance of the MongoDB Daemon running
4. Run ```
grunt serve
``` to start the development server. It should automatically open the client in your browser when ready.

##Contrucción
Run ```
grunt build
``` for building and grunt serve for preview.

##Prueba
Running ```
npm test
``` will run the unit tests with karma.




