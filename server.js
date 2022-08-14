const express = require('express');
const moment = require('moment');
const { agregarCita,mostrarCita}= require('./db_funciones.js')

const app = express()

app.use(express.static('public')) // para manejo de archivos estáticos
app.use(express.urlencoded()) // para recibir datos de formulario POST donde se ingresa nombre y cita

app.post('/quotes', async (req, res) => {
  console.log(req.body); //acceder a los datos de un formulario con el metodo post a travez del atriuto body
  await agregarCita(req.body.nombre, req.body.cita)
  res.redirect('/')
  })

app.get('/quotes', async (req, res) => {
  const citas = await mostrarCita()
  return res.json(citas)
})  

app.get('*', (req, res) => {
    res.statusCode = 404
    res.send('Ruta no implementada')
})
  
app.listen(3000, () => {
    console.log(`Servidor en puerto 3000`);
});  