const path = require('path');
const backendDir = path.join(__dirname, '..', 'backend');
const bcrypt = require(path.join(backendDir, 'node_modules', 'bcryptjs'));
const mysql = require(path.join(backendDir, 'node_modules', 'mysql2', 'promise'));
require(path.join(backendDir, 'node_modules', 'dotenv')).config({ path: path.join(backendDir, '.env') });

const DEMO_PASSWORD = 'Demo@1234';

async function seed() {
  const pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
  });

  const hash = await bcrypt.hash(DEMO_PASSWORD, 10);
  console.log('Password hash generated for all demo users.');

  // 1. INSERT USERS
  const users = [
    { name: 'Admin User',     email: 'admin@scholarkit.com',  role: 'admin' },
    { name: 'Ravi Kumar',     email: 'seller@scholarkit.com', role: 'seller' },
    { name: 'Priya Sharma',   email: 'parent@scholarkit.com', role: 'customer' },
  ];

  const userIds = {};
  for (const u of users) {
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [u.name, u.email, hash, u.role]
    );
    userIds[u.role] = result.insertId;
    console.log(`[SUCCESS] ${u.role.padEnd(8)} -> ${u.email} (id: ${result.insertId})`);
  }

  // 2. INSERT SELLER PROFILE
  const [sellerResult] = await pool.query(
    'INSERT INTO sellers (user_id, company_name, contact_phone) VALUES (?, ?, ?)',
    [userIds.seller, 'ScholarKit Uniforms Pvt. Ltd.', '9876543210']
  );
  const sellerId = sellerResult.insertId; // This is sellers.id, NOT users.id
  console.log(`[SUCCESS] Seller profile created (sellers.id: ${sellerId}).`);

  // 3. UPDATE SCHOOLS - Link to seller
  await pool.query('UPDATE schools SET added_by_seller = ?', [sellerId]);
  console.log('[SUCCESS] Schools linked to seller.');

  // 4. INSERT PRODUCTS (6 per school = 18 total)
  const products = [
    // Shiv Nadar School (school_id=1)
    { school_id: 1, name: 'White Shirt (Foundation)',  price: 499, stock: 50, category: 'Shirt',      grade_group: 'foundation', discount_percent: 0,  size: 'S', image_url: 'https://res.cloudinary.com/dgvqpepa7/image/upload/v1776533032/scholarkit/products/jzaafqhziidb08xmyggo.webp' },
    { school_id: 1, name: 'Blue House T-Shirt',        price: 399, stock: 40, category: 'Sportswear', grade_group: 'all',        discount_percent: 10, size: 'M', image_url: 'https://res.cloudinary.com/dgvqpepa7/image/upload/v1776532968/scholarkit/products/bbgohylyx8pdt2ha9gxg.webp' },
    { school_id: 1, name: 'School Belt',               price: 249, stock: 25, category: 'Accessory',  grade_group: 'all',        discount_percent: 0,  size: 'Free Size', image_url: 'https://res.cloudinary.com/dgvqpepa7/image/upload/v1776533011/scholarkit/products/ybckunwf4g91tdovmovy.webp' },
    { school_id: 1, name: 'Boys Shorts (Primary)',     price: 449, stock: 60, category: 'Shorts',     grade_group: 'primary',    discount_percent: 15, size: 'M', image_url: 'https://res.cloudinary.com/dgvqpepa7/image/upload/v1776532992/scholarkit/products/t7nytuco67biiewtw7xs.webp' },
    { school_id: 1, name: 'Girls Skirt (Primary)',     price: 549, stock: 80, category: 'Skirt',      grade_group: 'primary',    discount_percent: 0,  size: 'M', image_url: 'https://res.cloudinary.com/dgvqpepa7/image/upload/v1776533003/scholarkit/products/cymb9prxjttepmq18bu4.webp' },
    { school_id: 1, name: 'School Socks',              price: 199, stock: 70, category: 'Accessory',  grade_group: 'all',        discount_percent: 5,  size: 'Free Size', image_url: 'https://res.cloudinary.com/dgvqpepa7/image/upload/v1776533019/scholarkit/products/qe9l8tfoml3bu7plkyku.webp' },

    // The Knowledge Habitat (school_id=2)
    { school_id: 2, name: 'White Shirt (Primary)',     price: 549, stock: 45, category: 'Shirt',      grade_group: 'primary',    discount_percent: 0,  size: 'M', image_url: 'https://res.cloudinary.com/dgvqpepa7/image/upload/v1776533166/scholarkit/products/jlj5mfnhwe1gt7a2iy4y.webp' },
    { school_id: 2, name: 'Green House T-Shirt',       price: 399, stock: 35, category: 'Sportswear', grade_group: 'all',        discount_percent: 0,  size: 'M', image_url: 'https://res.cloudinary.com/dgvqpepa7/image/upload/v1776533136/scholarkit/products/s3mmnlur84dysa2d8tvh.webp' },
    { school_id: 2, name: 'School Shoes (Velcro)',     price: 899, stock: 30, category: 'Footwear',   grade_group: 'foundation', discount_percent: 10, size: 'S', image_url: 'https://res.cloudinary.com/dgvqpepa7/image/upload/v1776533152/scholarkit/products/cyphchha13rwghx4zsf5.webp' },
    { school_id: 2, name: 'Boys Trousers (Senior)',    price: 649, stock: 55, category: 'Trouser',    grade_group: 'secondary',  discount_percent: 0,  size: 'L', image_url: 'https://res.cloudinary.com/dgvqpepa7/image/upload/v1776533093/scholarkit/products/wa9ad2hbcureqpjrvrar.webp' },
    { school_id: 2, name: 'Girls Trousers (Senior)',   price: 649, stock: 40, category: 'Trouser',    grade_group: 'secondary',  discount_percent: 20, size: 'L', image_url: 'https://res.cloudinary.com/dgvqpepa7/image/upload/v1776533093/scholarkit/products/wa9ad2hbcureqpjrvrar.webp' },
    { school_id: 2, name: 'School Belt',               price: 249, stock: 20, category: 'Accessory',  grade_group: 'all',        discount_percent: 0,  size: 'Free Size', image_url: 'https://res.cloudinary.com/dgvqpepa7/image/upload/v1776533143/scholarkit/products/iav2ymoqy5sxlzpvcpey.webp' },

    // Amity International (school_id=3)
    { school_id: 3, name: 'Mens Shirt (Senior)',       price: 599, stock: 50, category: 'Shirt',      grade_group: 'secondary',  discount_percent: 5,  size: 'L', image_url: 'https://res.cloudinary.com/dgvqpepa7/image/upload/v1776533423/scholarkit/products/cn0kvgdzatnb91wbijck.png' },
    { school_id: 3, name: 'Red House T-Shirt',         price: 349, stock: 45, category: 'Sportswear', grade_group: 'all',        discount_percent: 0,  size: 'M', image_url: 'https://res.cloudinary.com/dgvqpepa7/image/upload/v1776533434/scholarkit/products/roj5rna9iqixlu1djept.png' },
    { school_id: 3, name: 'Lace Shoes (Senior)',       price: 999, stock: 65, category: 'Footwear',   grade_group: 'secondary',  discount_percent: 0,  size: 'L', image_url: 'https://res.cloudinary.com/dgvqpepa7/image/upload/v1776533398/scholarkit/products/pfdok50wtot1hwze9hpj.webp' },
    { school_id: 3, name: 'Girls Skirt (Foundation)',  price: 499, stock: 70, category: 'Skirt',      grade_group: 'foundation', discount_percent: 0,  size: 'S', image_url: 'https://res.cloudinary.com/dgvqpepa7/image/upload/v1776533382/scholarkit/products/jxmwpbliiw76payzmoxo.png' },
    { school_id: 3, name: 'School Socks',              price: 199, stock: 100, category: 'Accessory', grade_group: 'all',        discount_percent: 10, size: 'Free Size', image_url: 'https://res.cloudinary.com/dgvqpepa7/image/upload/v1776533443/scholarkit/products/jert7v0sqmn9br5l8h8d.png' },
    { school_id: 3, name: 'Boys Shorts (Foundation)',  price: 399, stock: 15, category: 'Shorts',     grade_group: 'foundation', discount_percent: 0,  size: 'S', image_url: 'https://res.cloudinary.com/dgvqpepa7/image/upload/v1776533373/scholarkit/products/xxweobxleoacnjhtzqx8.png' },
  ];

  for (const p of products) {
    await pool.query(
      `INSERT INTO products (seller_id, school_id, name, price, stock, category, grade_group, discount_percent, image_url, size)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [sellerId, p.school_id, p.name, p.price, p.stock, p.category, p.grade_group, p.discount_percent, p.image_url, p.size]
    );
  }
  console.log(`[SUCCESS] ${products.length} products seeded across 3 schools.`);

  console.log('\\n------------------------------------------------');
  console.log('ScholarKit - Demo Data Ready!');
  console.log('------------------------------------------------');
  console.log('LOGIN CREDENTIALS (all passwords: Demo@1234)');
  console.log('Admin    -> admin@scholarkit.com');
  console.log('Seller   -> seller@scholarkit.com');
  console.log('Customer -> parent@scholarkit.com');
  console.log('');

  await pool.end();
}

seed().catch(err => {
  console.error('[ERROR] Seed failed:', err);
  process.exit(1);
});
