import { db_pool } from '../db/db.js';

const db = db_pool;

class ShopRepository {
  async getOneShop(shop_id) {
    const result = await db.query('SELECT * FROM shop WHERE id = $1', [
      shop_id,
    ]);

    return result.rows[0];
  }
}

export const shopRepository = new ShopRepository();
