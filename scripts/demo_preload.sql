-- Seed initial orders history
INSERT INTO orders (user_id, total_amount, shipping_fee, status, created_at) VALUES
  (3, 898.00, 0.00, 'Delivered', NOW() - INTERVAL 5 DAY),
  (3, 699.00, 50.00, 'Delivered', NOW() - INTERVAL 3 DAY),
  (3, 848.00, 0.00, 'Shipped',   NOW() - INTERVAL 1 DAY);

-- Seed order_items associations
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES
  (1, 1, 1, 499.00),
  (1, 2, 1, 399.00);

INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES
  (2, 11, 1, 649.00);

INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES
  (3, 3, 1, 249.00),
  (3, 13, 1, 599.00);

-- Sync stock with historical purchases
UPDATE products SET stock = stock - 1 WHERE id IN (1, 2, 11, 3, 13);

-- Configure product trigger criteria
UPDATE products SET stock = 12 WHERE id = 18;

-- Log price history
UPDATE products SET price = 549.00 WHERE id = 1;

SELECT 'Pre-demo data seeded successfully!' AS status;
