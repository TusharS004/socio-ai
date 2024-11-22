import Product from '../models/product.model.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    if(!req?.user?._id) {
        return res.status(403).json({ message: 'You are not authorized to create this product' });
    }
    const { title, price, currency, description, image, category, video } = req.body;
    const product = new Product({
        title,
        description,
        price,
        currency,
        image,
        video,
        category: category.toString().split(',').map((category) => category.trim()),
        owner: req.user._id,
    });
    try {
        const newProduct = await product.save();
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        let existingProduct = await Product.findById(req.params.id);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (req.user._id.toString() !== existingProduct.owner.toString()) {
            return res.status(403).json({ message: 'You are not authorized to update this product' });
        }

        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.status(200).json(product);
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (req.user._id.toString() !== product.owner.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this product' });
        }

        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};