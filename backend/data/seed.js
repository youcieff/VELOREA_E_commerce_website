const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');

dotenv.config({ path: './backend/.env' });

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany();
        await Category.deleteMany();
        await Product.deleteMany();

        // Create Admin User
        const admin = await User.create({
            name: 'Velora Admin',
            email: 'admin@velora.com',
            password: 'password123', // Will be hashed by pre-save hook
            role: 'admin'
        });

        // Create Categories
        const categories = await Category.insertMany([
            { 
              name: 'Future Tech', 
              description: 'Cutting edge electronics and gadgets.',
              image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000'
            },
            { 
              name: 'Luxury Living', 
              description: 'Premium home decor and essentials.',
              image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000'
            },
            { 
              name: 'Elite Fashion', 
              description: 'Curated apparel for the modern standard.',
              image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1000'
            }
        ]);

        // Create Products
        await Product.insertMany([
            {
                name: 'Obsidian X1 Drone',
                description: 'Stealth-grade carbon fiber drone with 8K thermal imaging.',
                price: 2499,
                category: categories[2]._id,
                user: admin._id,
                countInStock: 5,
                images: ['https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=1000'],
                keywords: ['drone', 'camera', 'tech', 'obsidian', 'طيارة', 'درون', 'كاميرا']
            },
            {
                name: 'Platinum Chrono',
                description: 'Limited edition sapphire crystal timepiece with architectural dial.',
                price: 1850,
                category: categories[0]._id,
                user: admin._id,
                countInStock: 12,
                images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000'],
                keywords: ['watch', 'chrono', 'timepiece', 'ساعة', 'ساعه', 'بريميوم']
            },
            {
                name: 'Zenith Glass Lamp',
                description: 'Hand-blown glass lamp with reactive ambient glow technology.',
                price: 450,
                category: categories[1]._id,
                user: admin._id,
                countInStock: 20,
                images: ['https://images.unsplash.com/photo-1507473885765-e6ed657f997a?q=80&w=1000'],
                keywords: ['lamp', 'light', 'glass', 'decor', 'ساعة', 'أباجورة', 'اضاءة']
            }
        ]);

        console.log('Database Seeded Successfully! 🚀');
        console.log('Admin Email: admin@velora.com');
        console.log('Admin PW: password123');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
