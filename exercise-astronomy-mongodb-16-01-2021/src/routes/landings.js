const route = require("express").Router();
const { Router } = require("express");
const { restart } = require("nodemon");
const LandingsMass = require("../models/landings");
const geo = require("mapbox-geocoding");
geo.setAccessToken('pk.eyJ1IjoiZGl2YWRhYSIsImEiOiJja2kwa21wbTUwdXkzMnVvYWxodGMzbXVsIn0.eB0rTgmQJt2kV4wqGxJHQQ');

route.get("/", async (req, res, next) => {
  console.log("req", req.params);
  console.log("req", req.query);

  const mass = req.query.minimun_mass;
  console.log(mass);
  const massNum = Number(mass);
  try {
    const result = await LandingsMass.find(
      { mass: { $gte: massNum } },
      { name: 1, mass: 1, _id: 0 }
    ).lean();

    console.info("> successfull", result);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("> crash", error.message);
    next(new Error("error twice crash"));
  }
});

route.get("/mass/:mass", async (req, res, next) => {
  console.log("req", req.params);
  const mass = req.params.mass;
  const specificMassNum = Number(mass);
  try {
    const result = await LandingsMass.find(
      { mass: { $eq: specificMassNum } },
      { name: 1, mass: 1, _id: 0 }
    ).lean();

    console.info("successfull", result);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("> crash", error.message);
    next(new Error("error twice crash"));
  }
});

route.get("/recclass/:recclass/", async (req, res, next) => {
  console.log("req", req.params);

 
  const recclass = req.params.recclass;
 
  try {
    const result = await LandingsMass.find(
      { recclass: { $eq: recclass } },
      { name: 1, recclass: 1, _id: 0 }
    ).lean();

    console.info("successfull", result);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("> crash", error.message);
    next(new Error("error twice crash"));
  }
});

const isInvalidDate = (date) => Number.isNaN(date.getTime())
const addOneYear = (date) => date.setYear(date.getFullYear() + 1)

route.get("/date", async (req, res, next) => {
  console.log("req", req.query);

  const year = req.query.year
  const yearFrom = req.query.from;
  const yearTo = req.query.to;

  console.log(year);
  console.log(yearFrom);
  console.log(yearTo);
  try {
    const result = await LandingsMass.find(
      {
        year: {
          ...(isInvalidDate(new Date(yearFrom)) ? {}  : { $gte: new Date(yearFrom) }),
          ...(isInvalidDate(new Date(yearTo)) ? {}  : { $lt: addOneYear(new Date(yearTo)) }),
        },
      },
      { name: 1, mass: 1, year: 1, _id: 0 }
    ).lean();

    console.info("> successfull", result);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("> crash", error.message);
    next(new Error("error twice crash"));
  }
});

const city = (latitude, longitude) => geo.reverseGeocode('mapbox.places', latitude , longitude , function (err, geoData) {
  console.log(geoData);})

route.get("/geo/:geolocation", async (req, res, next) => {
  console.log("req", req.params);
  const geolocation = req.params.geolocation
  console.log(geolocation)

  try {
    const result = await LandingsMass.find(

      { name: geolocation },
      { name: 1, geolocation: 1, _id: 0}
    ).lean();

    

    const lat = result[0].geolocation.latitude
    const long = result[0].geolocation.longitude

    city(lat, long)

  
      

  
      console.info("succesfull", result);
      res.status(200).json({
        success: true,
        data: result,
  });
  } catch (error) {
    console.error("> crash", error.message);
    next(new Error("error twice crash"));
  }
});





// 5. GET para obtener el nombre de la ciudad, país, región o lo que corresponda a partir del nombre del meteorito
// - Ejemplo: `/astronomy/landings/aachen`

// Endpoints relativos a Landings

module.exports = route;
