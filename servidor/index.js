//
const express = require ('express');
const conectarDB = require ('./config/db')
const cors = require("cors");
// Creamos el servidor
const app = express();

//conectamos a la BBDD
conectarDB();

app.use(cors());
app.use(express.json());
app.use ('/api/productos/',require('./routes/producto'));
//Definimos ruta principal


app.listen(4000, () =>
{
    console.log("El servidor está corriendo perfectamente");
})