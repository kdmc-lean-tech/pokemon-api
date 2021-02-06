const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const DuplicatedKey = 'Key duplicated in the collection, some of the fields are of unique type.';

module.exports = {
  
  clientError: (res, message) => {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: !message ? ReasonPhrases.BAD_REQUEST : message
    });
  },

  unauthorizedError: (res, message) => {
    res.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      message: !message ? ReasonPhrases.UNAUTHORIZED : message
    });
  },

  internalServerError: (res, error, message) => {
    if (error.code === 11000) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: !message ? DuplicatedKey : message
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.internalServerError,
        message: !message ? ReasonPhrases.INTERNAL_SERVER_ERROR : message
      });
    }
  },

  notFoundError: (res, message) => {
    res.status(StatusCodes.NOT_FOUND).json({
      status: StatusCodes.NOT_FOUND,
      message: !message ? ReasonPhrases.NOT_FOUND : message
    });
  },

  successResponse: (res, body, message) => {
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      body,
      message: !message ? ReasonPhrases.OK : message
    });
  },

  createdReponse: (res, body, message) => {
    res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      body,
      message: !message ? ReasonPhrases.CREATED : message
    });
  },
}
