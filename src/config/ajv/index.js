const Ajv = require("ajv");
const _ = require("lodash");

const ajv = new Ajv();

const validateSchema = validations => (req, res, next) => {
  const errors = [];
  validations.forEach(validation => {
    const validate = ajv.compile(validation.schema);
    const isValid = validate(req[validation.data]);

    if (!isValid) {
      const error = validate.errors[0];
      error.key = validation.data;
      errors.push(error);
    }
  });

  if (!_.isEmpty(errors)) next(errors);
  next();
};

module.exports = { validateSchema };
