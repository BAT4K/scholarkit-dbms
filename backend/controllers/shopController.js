const pool = require('../config/db');

// 1. Get Groups (Hardcoded to bridge React to our new MySQL schema)
exports.getSchoolGroups = async (req, res) => {
    try {
        // Since we dropped the grade_groups table in favor of an ENUM,
        // we feed the frontend exactly what it expects to draw the tabs.
        const groups = [
            { id: 1, name: 'Foundation', sort_order: 1 },
            { id: 2, name: 'Primary', sort_order: 2 },
            { id: 3, name: 'Secondary', sort_order: 3 }
        ];
        res.json(groups);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

// 2. Get Catalog (Updated for the new 'products' table)
exports.getGroupCatalog = async (req, res) => {
    try {
        const { group_id, school_id } = req.query;

        if (!group_id) {
            return res.status(400).json({ error: 'Missing group_id' });
        }

        // Convert the numeric ID from the React frontend into our MySQL ENUM strings
        let gradeString = 'all';
        if (group_id == 1) gradeString = 'foundation';
        if (group_id == 2) gradeString = 'primary';
        if (group_id == 3) gradeString = 'secondary';

        // Query our new products table. 
        // We mock 'image_url' and 'specific_gender' so the React frontend doesn't crash.
        let query = `
            SELECT 
                id, 
                name, 
                price, 
                'https://via.placeholder.com/150' AS image_url, 
                1 AS is_mandatory,
                'Unisex' AS specific_gender,
                school_id
            FROM products 
            WHERE (grade_group = ? OR grade_group = 'all')
        `;

        const queryParams = [gradeString];

        // Filter by School ID if the user selected one
        if (school_id) {
            query += ` AND school_id = ?`;
            queryParams.push(school_id);
        }

        // Execute the MySQL query
        const [rows] = await pool.query(query, queryParams);
        res.json(rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};