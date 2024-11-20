import { db_pool } from '../db/db.js';

const db = db_pool;

class StockRepository {
  async getOneStock(plu, shop_id) {
    const result = await db.query(
      'SELECT * FROM stock WHERE plu = $1 AND shop_id = $2',
      [plu, shop_id]
    );

    return result.rows[0];
  }

  async createStock({ plu, shop_id, products_in_shop, products_in_order }) {
    const result = await db.query(
      'INSERT INTO stock(plu, shop_id, products_in_shop, products_in_order) values($1, $2,  COALESCE($3, 0), COALESCE($4, 0)) returning *',
      [plu, shop_id, products_in_shop, products_in_order]
    );

    return result.rows[0];
  }

  async increaseStock({ amount_in_shop, amount_in_order, plu, shop_id }) {
    const result = await db.query(
      'UPDATE stock SET products_in_shop = products_in_shop + COALESCE($1, 0), products_in_order = products_in_order + COALESCE($2, 0) WHERE plu = $3 AND shop_id = $4 returning * ',
      [amount_in_shop, amount_in_order, plu, shop_id]
    );

    return result.rows[0];
  }

  async decreaseStock({ amount_in_shop, amount_in_order, plu, shop_id }) {
    const result = await db.query(
      'UPDATE stock SET products_in_shop = products_in_shop - COALESCE($1, 0), products_in_order = products_in_order - COALESCE($2, 0) WHERE plu = $3 AND shop_id = $4 returning * ',
      [amount_in_shop, amount_in_order, plu, shop_id]
    );
    return result.rows[0];
  }

  async getFilteredStock({
    plu,
    shop_id,
    minShop,
    maxShop,
    minOrder,
    maxOrder,
  }) {
    const result = await db.query(
      `SELECT * FROM stock
			 WHERE ($1::text IS NULL OR plu = $1::text)
				 AND ($2::integer IS NULL OR shop_id = $2::integer)
				 AND ($3::integer IS NULL OR products_in_shop >= $3::integer)
				 AND ($4::integer IS NULL OR products_in_shop <= $4::integer)
				 AND ($5::integer IS NULL OR products_in_order >= $5::integer)
				 AND ($6::integer IS NULL OR products_in_order <= $6::integer)`,
      [plu, shop_id, minShop, maxShop, minOrder, maxOrder]
    );

    return result.rows;
  }
}

export const stockRepository = new StockRepository();
