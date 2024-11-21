exports.up = (pgm) => {
  pgm.createTable('shop', {
    id: { type: 'serial', primaryKey: true },
    name: { type: 'text', notNull: true },
  });

  pgm.createTable('products', {
    plu: { type: 'text', primaryKey: true },
    name: { type: 'text', notNull: true },
  });

  pgm.createTable('stock', {
    plu: { type: 'text', notNull: true },
    shop_id: { type: 'integer', notNull: true },

    products_in_shop: { type: 'integer', default: 0 },
    products_in_order: { type: 'integer', default: 0 },
  });

  pgm.createTable('history', {
    id: { type: 'serial', primaryKey: true },
    plu: { type: 'text', notNull: true },
    shop_id: { type: 'integer' },
    action: { type: 'text', notNull: true },
    date: { type: 'timestamp', notNull: true },
  });

  pgm.addConstraint('stock', 'pk_stock', {
    primaryKey: ['plu', 'shop_id'],
  });

  pgm.addConstraint('stock', 'fk_stock_shop_id', {
    foreignKeys: {
      columns: 'shop_id',
      references: 'shop(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('history', 'fk_history_shop_id', {
    foreignKeys: {
      columns: 'shop_id',
      references: 'shop(id)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('history', 'fk_history_product_id', {
    foreignKeys: {
      columns: 'plu',
      references: 'products(plu)',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint('stock', 'fk_stock_product_id', {
    foreignKeys: {
      columns: 'plu',
      references: 'products(plu)',
      onDelete: 'CASCADE',
    },
  });

  pgm.sql(`
    INSERT INTO shop (name) VALUES 
    ('Shop 1'),
    ('Shop 2'),
    ('Shop 3');
  `);

  pgm.sql(`
    INSERT INTO products (plu, name) VALUES 
    ('a', 'Product A'),
    ('b', 'Product B'),
    ('c', 'Product C');
  `);

  pgm.sql(`
    INSERT INTO stock (plu, shop_id, products_in_shop, products_in_order) VALUES
    ('a', 1, 100, 20),
    ('b', 1, 150, 10),
    ('c', 2, 50, 5),
    ('a', 2, 75, 15),
    ('b', 3, 120, 30);
  `);
};

exports.down = (pgm) => {
  pgm.dropTable('stock');
  pgm.dropTable('products');
  pgm.dropTable('shop');
};
