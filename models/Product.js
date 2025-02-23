import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    sizes: { type: [String], required: true },
    colors: { type: [String], required: true },
    category: { type: String, required: true },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);