const express = require('express');
const router = express.Router();
const pool = require('../config/db'); 

router.get('/', async (req, res) => {
    try {
        // We add placeholder images so the React frontend has something to draw!
        const query = `
            SELECT 
                id, 
                name, 
                location,
                'https://via.placeholder.com/400x200?text=School+Building' AS image_url,
                'https://via.placeholder.com/150?text=Logo' AS logo_url
            FROM schools 
            ORDER BY id ASC
        `;
        
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;