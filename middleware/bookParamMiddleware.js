const { Book } = require("../db/models");

const findBook = async (bookId, next) => {
  try {
    const foundBook = await Book.findByPk(bookId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return foundBook;
  } catch (error) {
    next(error);
  }
};
exports.bookParamsMiddleware = async (req, res, next, bookId) => {
  const book = await findBook(bookId, next);
  console.log("💎: ", book);
  if (book) {
    req.book = book;
    next();
  } else {
    const error = new Error("Book not found!");
    error.status = 404;
    next(error);
  }
};
