const pool = require('../config/db');

exports.getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        // Fetch the latest 10 unread notifications for this specific seller
        const [rows] = await pool.query(
            'SELECT id, message, is_read, created_at FROM seller_notifications WHERE seller_id = ? ORDER BY created_at DESC LIMIT 10',
            [userId]
        );
        res.json(rows);
    } catch (err) {
        console.error("Notifications Error:", err);
        res.status(500).json({ message: "Server error fetching notifications" });
    }
};