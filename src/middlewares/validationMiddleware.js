const Joi = require('joi');

module.exports = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
      topic: Joi.string().min(3).max(30).required(),
      text: Joi.string().min(10).max(400).required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        status: 'error',
        message: validationResult.error.details[0].message,
      });
    }

    next();
  },

  patchPostValidation: (req, res, next) => {
    const schema = Joi.object({
      topic: Joi.string().min(3).max(30).optional(),
      text: Joi.string().min(10).max(400).optional(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        status: 'error',
        message: validationResult.error.details[0].message,
      });
    }
    next();
  },
};
