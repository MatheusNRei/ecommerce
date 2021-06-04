const Category = require('../models/category')
const slugify = require ('Slugify')
exports.create = async (req,res) => {
try{
const {name} = req.body
const category = await new Category({name,slug: slugify (name)}).save();
res.json(category);
}
catch(err) {
    res.status(400).send('erro função create')
}
}
exports.read = async (req,res) => {
    try{
        let category = await Category.findOne({slug: req.params.slug}.exec())
        res.json(category);
    }
    catch(err) {
        res.status(400).send('erro função read')
    } 
}
exports.list = async (req,res) => {
    try{
        res.json(await Category.find({}).sort ({createdAt: -1}).exec());
    }
    catch(err) {
        res.status(400).send('erro função list')
    }
}
exports.update = async (req,res) => {
    const {name} = req.body;
    try{
        const updated = await Category.findOneAndUpdate( {slug: req.params.slug}, {name,slug: slugify (name)},{new: true})
        res.json(updated)

    }
    catch(err) {
        res.status(400).send('erro função update')
    }
}
exports.remove = async (req,res) => {
    try{
      const deleted = await Category.findOneAndDelete({slug: req.params.slug}).exec();
      res.json('cat:'+{slug} + 'deletada')
    }
    catch(err) {
        res.status(400).send('erro função remove')
    }
}