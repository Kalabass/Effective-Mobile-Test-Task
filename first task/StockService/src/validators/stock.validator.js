import { check } from 'express-validator';
export const validateStock = [
  check('plu')
    .exists({ checkFalsy: true })
    .withMessage('plu is required')
    .isString()
    .withMessage('plu must be a string'),
  check('shop_id')
    .exists({ checkFalsy: true })
    .withMessage('shop_id is required')
    .isInt()
    .withMessage('shop_id must be an integer'),
];
