import { check } from 'express-validator';
export const validateProduct = [
  check('plu')
    .exists({ checkFalsy: true })
    .withMessage('plu is required')
    .isString()
    .withMessage('plu must be a string'),
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('name is required')
    .isString()
    .withMessage('name must be a string'),
];
