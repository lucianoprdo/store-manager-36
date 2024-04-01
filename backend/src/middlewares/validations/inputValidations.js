const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  next();
};

const validateLength = (req, res, next) => {
  const { name } = req.body;
  if (name.length < 6) {
    return res
      .status(422)
      .json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const inputValidations = (req, res, next) => {
  validateName(req, res, () => {
    validateLength(req, res, next);
  });
};

module.exports = {
  inputValidations,
  validateName,
  validateLength,
};
