const express = require('express');
const moment = require('moment');
const { agregarCita,mostrarCita}= require('db_funciones.js')

const app = express()

app.use(express.static('public')) // para manejo de archivos estáticos
app.use(express.urlencoded()) // para recibir datos de formulario POST

app.post('/quotes', async (req, res) => {
  console.log(req.body); 
  await (req.body.nombre, req.body.cita, req.body.fecha)
  res.redirect('/')
  })


app.get('/quotes', async (req, res) => {
  const lugares = await mostrarCitas()
  res.json(citas)
})  

app.get('*', (req, res) => {
    res.statusCode = 404
    res.send('Ruta no implementada')
})
  
app.listen(3000, () => {
    console.log(`Servidor en puerto 3000`);
});  