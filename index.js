
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
    const age = request.query.age
    const isMinAge = new Boolean(request.query.is_min_age)

    // Condicional con función de filtro por género o imprimir todo sin query de género
    const filters = {}

    if(gender) filters.gender = gender

    if(age) {
        if(isMinAge.valueOf()){
            filters.age = { $gte: age }
        } else{
            filters.age = age
        }
    }
    // gender ? allKoders = await Koder.find({ gender: gender }): allKoders = await Koder.find()

    const allKoders = await Koder.find(filters)

    response.json({
        message: 'all koders',
        success: true,
        data: {
            koders: allKoders
        }
    })
})

server.post('/koders', async(request, response)=>{

    // Manejo de errores, esto para que el servidor no deje de responder si recibe algo diferente.
    try{
        const {name, lastName, age, gender} = request.body
        await Koder.create({name, lastName, age, gender})
        response.json({
            message : 'koder created: ', newKoder
        })

    } catch(error){
        response.status(400)
        response.json({
            success: false,
            message: error.message
        })
    }
    
})

// Primero conectar a la base de datos y después al servidor
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {

    })
    .catch((error) => {
        console.log('error: ', error)
    })

server.listen(8080, () => {
    console.log('server is listening')
})

