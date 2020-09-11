const express = require("express");
const router = express.Router();
var client = require('./config').pool;
client.connect();

router.get('/countries', async (request, response, next) => {
    console.log("ok")
    try{
        let results = await client.query('SELECT * FROM countries ORDER BY id ASC');
        response.status(200).json(results.rows)
    }catch(error){
        console.error(error);
        await response.status(500).json({error: error});
    }
})

router.post('/', async (request, response, next) => {
    console.log("ok")
        const { name, capital } = request.body
        try{
            let results = await client.query('INSERT INTO countries (name, capital) VALUES ($1, $2) RETURNING id', [name, capital])
        response.status(200).send(results.rows)
        }catch(error){
            console.error(error);
            await response.status(500).json({error: error});
        }
})

router.put('/:id', async (request, response, next) => {
    console.log("ok")
        const id = parseInt(request.params.id)
        const { name, capital } = request.body
        try{
        let results = await client.query('UPDATE countries SET name = $1, capital = $2 WHERE id = $3', [name, capital, id])
        response.status(200).send(results.rows[0])
        }catch(error){
            console.error(error);
            await response.status(500).json({error: error});
        }
})

router.delete('/:id', async (request, response, next) => {
    console.log("ok")
    const id = parseInt(request.params.id)
    try{
        client.connect();
        let results = await client.query('DELETE FROM countries WHERE id = $1', [id])
        response.status(200).send({})
    }catch(error){
        console.error(error);
        await response.status(500).json({error: error});
        }
})

module.exports = router;