module.exports = async (req, res , next) => {
  try {
    if (req.user.admin) {
      next();
    } else {
      throw new Error('the user is not an admin')
    }
  } catch (err) {
    res.status(401).json({
      message: 'Authorization failed',
      error: err
    });
  }
}
