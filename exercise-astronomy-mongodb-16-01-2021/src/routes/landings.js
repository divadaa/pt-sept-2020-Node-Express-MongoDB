const route = require('express').Router()
const { Router } = require('express')
const { restart } = require('nodemon')
const LandingsMass = require('../seeds/landings')

route.get('/', async (req, res, next) => {
    try {
      const result = await LandingsMass.find()

      

   
    })


    //1. GET para obtener nombre y masa de todos aquellos meteoritos cuya masa sea igual o superior a una masa (gr) dada (con query parameters)
    //- Ejemplo: `/astronomy/landings?minimum_mass=200000`

        //const result = await LandingsMass.find()

        //    console.info('> successfull', result)
          //  restart.status(200).json({
            //    success: true,
              //  data: result

        console.log(req)

    }

    catch (error) {
        console.error('> crash', error.message)

        next(new Error('error twice crash'))
    }

})




// Endpoints relativos a Landings

module.exports = route