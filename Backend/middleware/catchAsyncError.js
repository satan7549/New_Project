/*
1.) This file to help us to avoide to write try catch block
in every function.
2.) thefunc is callback function.
*/
module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
