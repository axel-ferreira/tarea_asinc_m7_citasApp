
const { Pool} = require('pg')

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'citasApp',
    password: '9149',
    min: 5,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000,
    port: 5432
  }
  const pool = new Pool(config)

module.exports = pool

//_________consultas a PostgreSql con argumentos por linea de comandos ____________

  //.Agregar citas
async function agregarCita (nombre, cita) {
    // 1. Solicito un 'cliente' al pool de conexiones
    const client = await pool.connect()
    try {
        const resp = await client.query(
            `insert into citas (nombre, cita) values ($1, $2) returning *`, 
            [nombre, cita]
        )
        console.log('Cita agregada con éxito');
    } catch (error) {
        console.error(error)
    }
    client.release()
  }

  // .Consultar ls citas
async function mostrarCita(){
    const client = await pool.connect()

    try {
        const res = await client.query({
            text:'select * from citas;',
            rowMode: 'array',
            name: 'citas'
        }) 
    } catch (error) {
        console.error(error)
    }
    client.release()

    return res.rows
}

//_________Acciones por linea de comandos____________-

const accion = process.argv[2]

if (accion == 'agregar'){
    const nombre = process.argv[3]
    const cita = process.argv[4]
    agregarCita(nombre, cita)
}
else if (accion == 'mostrar'){
    mostrarCita()
}
else {
    console.log('Acción no implementada');
}

module.exports={agregarCita,mostrarCita}
