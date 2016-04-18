//ejemplo de consulta

app.get("/regristros", (req, res) => {  
    Registers
      .find()
      .populate('person')
      .exec( (err, doc) => {
        if (err) return handleError(err);
        console.log('El creador del registro es: %s', doc[0].person.nombre);
      });
});