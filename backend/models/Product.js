const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Please add a name'], trim: true, maxlength: [100, 'Name can not be more than 100 characters'] },
    description: { type: String, required: [true, 'Please add a description'], maxlength: [2000, 'Description can not be more than 2000 characters'] },
    price: { type: Number, required: [true, 'Please add a price'] },
    images: { type: [String], default: ['no-photo.jpg'] },
    keywords: [{ type: String }],
    category: { type: mongoose.Schema.ObjectId, ref: 'Category', required: true },
    countInStock: { type: Number, required: [true, 'Please add stock count'], default: 0 },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Product', ProductSchema);
