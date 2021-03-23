const BadRequest = require('./BadRequest');
const NotFound = require('./NotFound');
const Unauthorized = require('./Unauthorized');
const ServerError = require('./ServerError');
const ConflictError = require('./ConflictError');

module.exports = {
  BadRequest, NotFound, Unauthorized, ServerError, ConflictError,
};
