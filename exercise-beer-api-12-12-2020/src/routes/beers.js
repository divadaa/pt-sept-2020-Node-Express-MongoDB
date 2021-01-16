const express = require('express')
const router = express.Router()
const fs = require('fs')
const { defaultMaxListeners } = require('stream')

// All your beers services go here...

const BEERS_N = 'src/db/beers.json'

router.get('/random', (req, res) => {
    fs.readFile(BEERS_N, function (err, data) {    
        if (!err) {
            const dataToJson = JSON.parse(data)
            const randomNumber = Math.random()*300;
            const randomNumberR = Math.round(randomNumber)

            const dataBeersRandom = dataToJson.filter(function (beer) {
                    
                return beer.id === randomNumberR                  
            })

            
            
            
            res.status(200).json({
                success: true,
                data: dataBeersRandom,
                
            })
        }
          else {
            res.status(500).json({
                success: false,
                message: "muy mal"
            })
        }
    })
}) 

router.get('/', (req, res) => {
    fs.readFile(BEERS_N, function (err, data) {    
        if (!err) {
            const dataToJson = JSON.parse(data)
            const data25 = dataToJson.slice(0,25);
            res.status(200).json({
                success: true,
                data: data25,
                length: data25.length
            })
        }
          else {
            res.status(500).json({
                success: false,
                message: "muy mal"
            })
        }
    })
})

router.get('/:id', (req, res) => {
     fs.readFile(BEERS_N, function (err, data) {
            if (!err) {
                const dataIdBeers =  JSON.parse(data)
                const dataBeers = dataIdBeers.filter(function (beer) {
                    
                    return beer.id === Number(req.params.id)                  
                })
                res.status(200).json({
                    success: true,
                    data: dataBeers,
                })

            }       

            else {
                res.status(500).json({
                    success: false,
                    message: "hay que meter el dato"
                })
            }

        }


    
    
    )

})
 


module.exports = router