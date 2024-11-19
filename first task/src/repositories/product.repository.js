import { db_pool } from '../db/db.js';

const db = db_pool;

class ProductRepository {
  async createProduct({ PLU, name }) {
    const result = await db.query(
      'INSERT INTO products (PLU, name) VALUES ($1, $2) RETURNING *',
      [PLU, name]
    );
    return result.rows[0];
  }

  async getFilteredProducts({ PLU, name }) {
    const result = await db.query(
      `SELECT * FROM products WHERE ($1::text IS NULL OR plu = $1::text) AND ($2::text IS NULL OR name = $2::text)`,
      [PLU, name]
    );
    return result.rows;
  }
}

export const productRepository = new ProductRepository();
