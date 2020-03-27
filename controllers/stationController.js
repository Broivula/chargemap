'use strict';
const stationModel = require('../models/station');
const connectionModel = require('../models/connection');
const connectionTypeModel = require('../models/connectionType')
const currentTypeModel = require('../models/currentType')
const levelTypeModel = require('../models/level')
const station_list_get = async (req, res) => {
  try{
    const stations = await stationModel.find().populate({   
      path : 'Connections', 
      populate : [{
        path: 'LevelID',
      },
      {
        path: 'ConnectionTypeID'
      },
      {
        path: 'CurrentTypeID'
      }]
    }).limit( req.query.limit ? parseInt(req.query.limit) : 10 );

    res.send(stations);
  }catch(err){
    res.status(500).json({ err_message: err.message });
    console.error('error at station_list_get: ', err);
  }
};

const station_get = async (req, res) => {
  try{
    console.log('here we are bois');
    const station = await stationModel.findById(req.params.id);
    res.json(station);
  }catch(err){
    res.status(500).json({ err_message: err.message });
    console.error('error at station_list_get: ', err);
  }
};

const station_post = async (req, res) => {
  // so, here we should first add the collection of connections
  // they include: 
  // ConnectionType
  // CurrentType
  // LevelType
  try{
/*
    console.log('starting posting process..');
    const connectionTypeID = await connectionTypeModel.create({
      FormalName : req.body.Connections.ConnectionType.FormalName,
      Title : req.body.Connections.ConnectionType.Title
    });
    const currentTypeID = await currentTypeModel.create({
      Description : req.body.Connections.CurrentType.Description,
      Title : req.body.Connections.CurrentType.Title,
    });
    const levelTypeID = await levelTypeModel.create({
      Title: req.body.Connections.LevelType.Title,
      Comments: req.body.Connections.LevelType.Comments,
      IsFastChargeCapable : req.body.Connections.LevelType.IsFastChargeCapable
    });
    */

    const connections = await connectionModel.create({
      ConnectionTypeID : await connectionTypeModel.create({
      FormalName : req.body.Connections.ConnectionType.FormalName,
      Title : req.body.Connections.ConnectionType.Title
      }),
      CurrentTypeID :await currentTypeModel.create({
      Description : req.body.Connections.CurrentType.Description,
      Title : req.body.Connections.CurrentType.Title,
      }),
      LevelTypeID : await levelTypeModel.create({
      Title: req.body.Connections.LevelType.Title,
      Comments: req.body.Connections.LevelType.Comments,
      IsFastChargeCapable : req.body.Connections.LevelType.IsFastChargeCapable
    }),
      Quantity : req.body.Connections.Quantity
    })

    const new_station = await stationModel.create({
      Title : req.body.Title,
      Town : req.body.Town,
      AddressLine1 : req.body.AddressLine1,
      StateOrProvince : req.body.StateOrProvince,
      Postcode: req.body.Postcode,
      Location: {
       type: "Point",
       coordinates: [req.body.Location.long, req.body.Location.lat], // first is long, second lat
      }, 
      Connections: connections 

    })
    
    console.log(connections);
    res.send(`addition successfull, added with id of ${new_station._id}`)
  }catch(err){
    res.sendStatus(500);
    console.log(err);
  }
}

const station_remove = async (req, res) => {
  console.log('here');
  try{
    await stationModel.deleteOne({_id: req.params.id});
    res.sendStatus(200);
  }catch(err){
    res.status(500).json({ err_message: err.message });
    console.error('error at station_remove: ', err);
  }
  
}

module.exports = {
  station_list_get,
  station_get,
  station_post,
  station_remove
};
