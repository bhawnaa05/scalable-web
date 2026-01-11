const { body, validationResult } = require('express-validator');

const validateRequest = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    next();
  };
};

const authValidations = {
  register: validateRequest([
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').notEmpty().trim()
  ]),
  login: validateRequest([
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ])
};

const taskValidations = {
  create: validateRequest([
    body('title').notEmpty().trim().isLength({ min: 3, max: 100 }),
    body('description').optional().trim(),
    body('status').optional().isIn(['todo', 'in-progress', 'done']),
    body('priority').optional().isIn(['low', 'medium', 'high']),
    body('dueDate').optional().isISO8601().toDate(),
    body('tags').optional().isArray()
  ])
};

module.exports = { authValidations, taskValidations };