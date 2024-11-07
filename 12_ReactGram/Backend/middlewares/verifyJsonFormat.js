// Prevents the backend crashed for a Json invalid.

module.exports = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {    
    return res.status(400).json({ errors: ["Invalid JSON, verify that's format!"] });
  }
  next();
};


