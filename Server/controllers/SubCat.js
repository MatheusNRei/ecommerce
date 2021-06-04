const SubCat = require('../models/SubCat')
const slugify = require ('Slugify')
exports.create = async (req,res) => {
try{
const {name} = req.body
const SubCat = await new SubCat({name,slug: slugify (name)}).save();
res.json(SubCat);
}
catch(err) {
    res.status(400).send('erro função create')
}
}
exports.read = async (req,res) => {
    try{
        let category = await SubCat.findOne({slug: req.params.slug}.exec())
        res.json(SubCat);
    }
    catch(err) {
        res.status(400).send('erro função read')
    } 
}
exports.list = async (req,res) => {
    try{
        res.json(await SubCat.find({}).sort ({createdAt: -1}).exec());
    }
    catch(err) {
        res.status(400).send('erro função list')
    }
}
exports.update = async (req,res) => {
    const {name} = req.body;
    try{
        const updated = await SubCat.findOneAndUpdate( {slug: req.params.slug}, {name,slug: slugify (name)},{new: true})
        res.json(updated)

    }
    catch(err) {
        res.status(400).send('erro função update')
    }
}
exports.remove = async (req,res) => {
    try{
      const deleted = await SubCat.findOneAndDelete({slug: req.params.slug}).exec();
      res.json('SubCat:'+{slug} + 'deletada')
    }
    catch(err) {
        res.status(400).send('erro função remove')
    }
}