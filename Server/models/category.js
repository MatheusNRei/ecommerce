const mongoose = require ('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
         type: String,
         trim: true,
         required: true,
         minlength: [4,'min. 4 caracteres'],
         maxlength: [32, 'max 32 caracteres'],

    },
    slug: {
         type: String,
         unique: true,
         lowercase: true,
         index: true,


    }
},{timestamps: true}
)

module.exports = mongoose.model ('Categorias',categorySchema)
