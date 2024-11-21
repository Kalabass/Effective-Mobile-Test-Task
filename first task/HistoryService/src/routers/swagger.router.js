/**
 * @swagger
 * tags:
 *   name: History
 *   description: API for managing and retrieving history data
 */

/**
 * @swagger
 * /history:
 *   post:
 *     tags:
 *       - History
 *     summary: Get filtered history
 *     description: Retrieves a list of history records based on the provided filters (shop_id, plu, action, date range, pagination).
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shop_id:
 *                 type: number
 *                 description: ID of the shop for filtering history.
 *               plu:
 *                 type: string
 *                 description: Product lookup code for filtering history.
 *               action:
 *                 type: string
 *                 description: Type of action to filter history (e.g., 'increase', 'decrease').
 *               date_from:
 *                 type: string
 *                 format: date
 *                 description: Start date for filtering history (ISO 8601 format).
 *               date_to:
 *                 type: string
 *                 format: date
 *                 description: End date for filtering history (ISO 8601 format).
 *               page:
 *                 type: integer
 *                 description: Page number for pagination (default is 1).
 *                 example: 1
 *               limit:
 *                 type: integer
 *                 description: Number of records per page (default is 10).
 *                 example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved filtered history
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
 *                       id:
 *                         type: integer
 *                         description: History record ID
 *                       shop_id:
 *                         type: string
 *                         description: ID of the shop
 *                       plu:
 *                         type: string
 *                         description: Product lookup code
 *                       action:
 *                         type: string
 *                         description: Action type (e.g., 'increase', 'decrease')
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp of the action
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       description: Total number of records matching the filter
 *                     page:
 *                       type: integer
 *                       description: Current page number
 *                     limit:
 *                       type: integer
 *                       description: Number of records per page
 *                     totalPages:
 *                       type: integer
 *                       description: Total number of pages
 *       400:
 *         description: Invalid request (e.g., missing required parameters)
 *       500:
 *         description: Internal server error
 */
