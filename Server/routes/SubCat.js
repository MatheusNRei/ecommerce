const express = require('express')
const router = express.Router()


//middlewares

const {authCheck,adminCheck} = require('../middlewares/auth')

//controller

const {create,read,update,remove,list} = require("../controllers/SubCat");
const { useCallback } = require('react');

//routes
router.post('/SubCat',authCheck,adminCheck,create);
router.get('/SubCat:slug',authCheck,adminCheck,read);
router.get('/SubCats',list);
router.put('/SubCat:slug',authCheck,adminCheck,update);
router.delete('/SubCat:slug',authCheck,adminCheck,remove);


module.exports = router;