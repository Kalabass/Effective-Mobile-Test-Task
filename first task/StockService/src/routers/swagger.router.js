/**
 * @swagger
 * tags:
 *   name: StockAndProducts
 *   description: API for managing stock
 */

/**
 * @swagger
 * /stock/filtered:
 *   post:
 *     summary: Get filtered stock
 *     description: Returns a filtered list of stock items based on optional filters in the request body.
 *     requestBody:
 *       required:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shop_id:
 *                 type: integer
 *                 description: ID of the shop
 *               plu:
 *                 type: string
 *                 description: Product lookup code (PLU)
 *               amount_in_shop:
 *                 type: object
 *                 description: Filter by amount in the shop
 *                 properties:
 *                   min:
 *                     type: integer
 *                   max:
 *                     type: integer
 *               amount_in_order:
 *                 type: object
 *                 description: Filter by amount in the order
 *                 properties:
 *                   min:
 *                     type: integer
 *                   max:
 *                     type: integer
 *             required:
 *               - shop_id
 *     responses:
 *       200:
 *         description: Successfully retrieved filtered stock
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       plu:
 *                         type: string
 *                         description: Product lookup code (PLU)
 *                       name:
 *                         type: string
 *                         description: Product name
 *                       amount_in_shop:
 *                         type: integer
 *                         description: Amount available in the shop
 *                       amount_in_order:
 *                         type: integer
 *                         description: Amount in orders
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /stock:
 *   post:
 *     summary: Create a stock item
 *     description: Creates a new stock item in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plu:
 *                 type: string
 *                 description: Product lookup code (PLU)
 *               shop_id:
 *                 type: integer
 *                 description: ID of the shop
 *               products_in_shop:
 *                 type: integer
 *                 description: The number of products in the shop
 *                 default: 0
 *               products_in_order:
 *                 type: integer
 *                 description: The number of products in orders
 *                 default: 0
 *             required:
 *               - plu
 *               - shop_id
 *     responses:
 *       201:
 *         description: Stock item created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /stock/increase:
 *   patch:
 *     tags:
 *       - Stock
 *     summary: Increase stock quantity
 *     description: Updates the stock by increasing the amount in the shop and in orders.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plu
 *               - shop_id
 *               - amount_in_shop
 *               - amount_in_order
 *             properties:
 *               plu:
 *                 type: string
 *                 description: Product lookup code
 *               shop_id:
 *                 type: integer
 *                 description: ID of the shop
 *               amount_in_shop:
 *                 type: integer
 *                 description: Amount to increase in shop
 *               amount_in_order:
 *                 type: integer
 *                 description: Amount to increase in orders
 *     responses:
 *       200:
 *         description: Successfully increased stock
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Updated stock information
 *       404:
 *         description: Stock not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /stock/decrease:
 *   patch:
 *     tags:
 *       - Stock
 *     summary: Decrease stock quantity
 *     description: Updates the stock by decreasing the amount in the shop and in orders.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plu
 *               - shop_id
 *               - amount_in_shop
 *               - amount_in_order
 *             properties:
 *               plu:
 *                 type: string
 *                 description: Product lookup code
 *               shop_id:
 *                 type: integer
 *                 description: ID of the shop
 *               amount_in_shop:
 *                 type: integer
 *                 description: Amount to decrease in shop
 *               amount_in_order:
 *                 type: integer
 *                 description: Amount to decrease in orders
 *     responses:
 *       200:
 *         description: Successfully decreased stock
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Updated stock information
 *       404:
 *         description: Stock not found
 *       400:
 *         description: Invalid request (e.g., attempting to decrease more than available)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /products:
 *   post:
 *     tags:
 *       - Product
 *     summary: Create a new product
 *     description: Creates a new product if it does not already exist based on the PLU.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plu
 *               - name
 *             properties:
 *               plu:
 *                 type: string
 *                 description: Product lookup code (PLU)
 *               name:
 *                 type: string
 *                 description: Name of the product
 *     responses:
 *       201:
 *         description: Successfully created product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Created product information
 *       400:
 *         description: Product already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get filtered products
 *     description: Retrieves products based on optional filters (PLU and/or name).
 *     parameters:
 *       - name: plu
 *         in: query
 *         description: Product lookup code (PLU) to filter by.
 *         required: false
 *         schema:
 *           type: string
 *       - name: name
 *         in: query
 *         description: Product name to filter by.
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of filtered products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       plu:
 *                         type: string
 *                         description: Product lookup code (PLU)
 *                       name:
 *                         type: string
 *                         description: Product name
 *       500:
 *         description: Internal server error
 */
