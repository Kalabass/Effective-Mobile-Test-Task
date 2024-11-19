import { check } from 'express-validator';
export const validateStock = [
  check('PLU')
    .exists({ checkFalsy: true })
    .withMessage('PLU is required')
    .isString()
    .withMessage('PLU must be a string'),
  check('shop_id')
    .exists({ checkFalsy: true })
    .withMessage('shop_id is required')
    .isInt()
    .withMessage('shop_id must be an integer'),
];
