require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const fs = require('fs');
const path = require('path');

async function testConnection() {
    const logFile = path.join(__dirname, 'test_error.log');

    try {
        console.log('1. Connecting to MongoDB...');
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is undefined check .env');
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('2. Connected!');

        console.log('3. Creating test user object...');
        const email = 'test' + Date.now() + '@example.com';
        const user = new User({
            name: 'Test User',
            email: email,
            password: 'password123'
        });

        console.log('4. Saving user (triggering pre-save hook)...');
        await user.save();
        console.log('5. User saved successfully:', user._id);

        console.log('Cleaning up...');
        await User.deleteOne({ _id: user._id });
        console.log('Done!');
        process.exit(0);
    } catch (error) {
        const errorLog = `
Timestamp: ${new Date().toISOString()}
Error Name: ${error.name}
Error Message: ${error.message}
Validation Errors: ${error.errors ? JSON.stringify(error.errors, null, 2) : 'None'}
Stack: ${error.stack}
    `;
        console.error('!!! TEST FAILED !!!', error.message);
        fs.writeFileSync(logFile, errorLog);
        process.exit(1);
    }
}

testConnection();
