

exports.createNote = async (req, res, next) => {
    try {
     
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };