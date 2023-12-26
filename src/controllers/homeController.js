const BookModel = require('../models/BookModel');

exports.index = async(req, res) => {
  const books = await BookModel.searchBooks();
  res.render('index', { books })
};

