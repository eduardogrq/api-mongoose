
const express = require('express')
const mongoose = require('mongoose')
const Koder = require('./koderModel')

const server = express()

// DB Conection
const DB_USER = 'eduardogrq'
const DB_PASSWORD = 'Tuyyosomos1mismo'
const DB_HOST = 'kodemia11g.utnt4.mongodb.net'
const DB_NAME = 'kodemia'

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

//middlewares

server.use(express.json())

// ************************************************************************************

server.get('/koders', async (request, response) => {

    const gender = request.query.gender

    // Condicional con función de filtro por género o imprimir todo sin query de género
    let allKoders
    gender? allKoders = await Koder.find({ gender: gender }): allKoders = await Koder.find()

    response.json({
        message: 'all koders',
        success: true,
        data: {
            koders: allKoders
        }
    })
})


server.listen(8080, () => {
    console.log('server is listening')
})

// Primero conectar a la base de datos y después al servidor
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {

    })
    .catch((error) => {
        console.log('error: ', error)
    })