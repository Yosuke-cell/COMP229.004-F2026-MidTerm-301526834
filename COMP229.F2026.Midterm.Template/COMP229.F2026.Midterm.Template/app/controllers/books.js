let BookModel = require('../models/books');

module.exports.getBook = async function (req, res, next) {
  try {
    // Find one using the id sent in the parameter of the request
    let bookId = req.params.id;
    let book = await BookModel.findOne({ _id: bookId });


    res.json({
      success: true,
      message: "Book retrieved successfully.",
      data: book
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.create = async function (req, res, next) {
  try {
    // Get input from the request
    let book = req.body;

    // Insert into the DB
    let result = await BookModel.create(book);
    console.log("Result: ", result);

    // Send a response
    res.status(200);
    res.json(
      {
        success: true,
        message: "Book created successfully.",
        data: result
      }
    );

  } catch (error) {
    console.log(error);
    next(error);
  }

}

module.exports.getAll = async function (req, res, next) {
  try {
    // Get all from the DB.
    let list = await BookModel.find();

    // Send a response
    res.json({
        success: true,
        message: "Book list retrieved successfully.",
        data: list
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.update = async function (req, res, next) {
  try {
    // Get input from the request
    let bookId = req.params.id;
    let updatedBook = BookModel(req.body);
    updatedBook._id = bookId;

    // Submit the change
    let result = await BookModel.updateOne({ _id: bookId }, updatedBook);
    console.log("Result: ", result);

    // Handle the result: send a response.
    if (result.modifiedCount > 0) {
      res.status(200);
      res.json(
        {
          success: true,
          message: "Book updated successfully."
        }
      );
    } else {
      throw new Error('Book not updated. Are you sure it exists?')
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}


module.exports.remove = async function (req, res, next) {
  try {
    // Delete  using the id sent in the parameter of the request
    let bookId = req.params.id;
    let result = await BookModel.deleteOne({ _id: bookId });
    console.log("Result: ", result);

    // Handle the result and send a response
    if (result.deletedCount > 0) {
      res.status(200);
      res.json(
        {
          success: true,
          message: "Book deleted successfully."
        }
      );
    } else {
      throw new Error('Book not deleted. Are you sure it exists?')
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}