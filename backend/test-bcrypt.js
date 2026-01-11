const bcrypt = require('bcryptjs');

async function testHash() {
    try {
        console.log('Testing bcrypt...');
        const salt = await bcrypt.genSalt(10);
        console.log('Salt generated:', salt);
        const hash = await bcrypt.hash('password123', salt);
        console.log('Hash generated:', hash);
        console.log('Bcrypt is working!');
    } catch (err) {
        console.error('Bcrypt failed:', err);
    }
}

testHash();
