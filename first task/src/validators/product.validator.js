import { check } from 'express-validator';
export const validateProduct = [
  check('PLU')
    .exists({ checkFalsy: true })
    .withMessage('PLU is required')
    .isString()
    .withMessage('PLU must be a string'),
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('name is required')
    .isString()
    .withMessage('name must be a string'),
];
