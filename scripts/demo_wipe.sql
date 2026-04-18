SET FOREIGN_KEY_CHECKS = 0;

-- Wipe transactional tables
TRUNCATE TABLE cart_items;
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE price_history_log;
TRUNCATE TABLE seller_notifications;
TRUNCATE TABLE school_bundles;
TRUNCATE TABLE products;
TRUNCATE TABLE sellers;
TRUNCATE TABLE users;
TRUNCATE TABLE schools;

SET FOREIGN_KEY_CHECKS = 1;

-- Reseed schools catalog
INSERT INTO schools (id, name, location, added_by_seller) VALUES
  (1, 'Shiv Nadar School',     'Noida',    NULL),
  (2, 'The Knowledge Habitat', 'Delhi',    NULL),
  (3, 'Amity International',   'Gurugram', NULL);

SELECT 'Database wiped successfully. Run the Node.js seed script next.' AS status;
