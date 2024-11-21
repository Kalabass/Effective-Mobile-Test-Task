import { db_pool } from '../db/db.js';

const db = db_pool;

class HistoryRepository {
  createHistoryLog = async ({ plu, shop_id, action, date }) => {
    const result = await db.query(
      'INSERT INTO history (PLU, shop_id, action, date) VALUES($1, $2, $3, $4) RETURNING *',
      [plu, shop_id, action, date]
    );

    return result.rows[0];
  };

  getFilteredHistory = async ({
    shop_id,
    plu,
    action,
    date_from,
    date_to,
    limit,
    offset,
  }) => {
    const result = await db.query(
      `SELECT *, COUNT(*) OVER() AS total_count
       FROM history
       WHERE ($1::integer IS NULL OR shop_id = $1::integer)
         AND ($2::text IS NULL OR PLU = $2::text)
         AND ($3::text IS NULL OR action = $3::text)
         AND (
           ($4::timestamp IS NOT NULL AND $5::timestamp IS NOT NULL AND date >= $4::timestamp AND date <= $5::timestamp) OR
           ($4::timestamp IS NOT NULL AND $5::timestamp IS NULL AND date >= $4::timestamp) OR
           ($4::timestamp IS NULL AND $5::timestamp IS NOT NULL AND date <= $5::timestamp) OR
           ($4::timestamp IS NULL AND $5::timestamp IS NULL)
         )
       ORDER BY date DESC
       LIMIT $6
       OFFSET $7`,
      [shop_id, plu, action, date_from, date_to, limit, offset]
    );

    const rows = result.rows;
    const total = rows.length > 0 ? parseInt(rows[0].total_count, 10) : 0;

    return { data: rows, total };
  };
}

export const historyRepository = new HistoryRepository();
