
const express = require('express');
const router = express.Router()
const Menu = require('../models/menu.js');
const Dish = require('../models/dish.js');
const Station = require('../models/station.js');

module.exports = router;


// Health check
router.get('/health', (req, res) => {
    var date = new Date();
    res.status(200).send(`API is OK as of ${date}`); 
});


//Post menu for day
router.post('/menus', async (req, res) => {
    var data = new Menu({
        date: req.body.date,
        items: req.body.items,
        station: req.body.station
    })

    try {
        var dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get menu by date
router.get('/menus/:date?', async (req, res) => {
    try{
        if (!req.params.date){
            const data = await Menu.find();
            res.json(data)
        }
        else{
            var date = req.params.date
            var data = await Menu.find({"date": date})
            res.json(data)
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Delete menu by date
router.delete('/menus/:date?', async (req, res) => {
    try {
        var date = req.params.date;
        await Menu.findOneAndDelete({"date": date})
        res.send(`Entry dated: ${date} has been deleted`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//post individual dish
router.post('/dishes', async (req, res) => {
    var data = new Dish({
        dish: req.body.dish
    })

    try {
        var dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//get all dishes
router.get('/dishes', async (req, res) => {
    try{
        const data = await Dish.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/stations', async (req, res) => {
    var data = new Station({
        dish: req.body.station
    })

    try {
        var dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//get all dishes
router.get('/stations', async (req, res) => {
    try{
        const data = await Station.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


