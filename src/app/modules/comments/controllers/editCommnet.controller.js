const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const CommentService = require("../services/comments.services");


const logger = require("../../../../../logger.conf");

exports.editComment = async (req, res, next) => {
  try {
    // check if same parameters where inputed
    if (Object.entries(req.body).length > 0 === false) {
      return next(
        createError(HTTP.BAD_REQUEST, [
          {
            status: RESPONSE.ERROR,
            message: "No Fields Marked For Edit",
            statusCode: HTTP.BAD_REQUEST,
            data: {},
            code: HTTP.BAD_REQUEST,
          },
        ])
      );
    }
    // check if comment exists
      const updatedComment = await new CommentService().updateARecord(
        {_id: req.body.comment_id },
        {comment_body_text: req.body.comment_body_text, was_edited: true}
      );
      if (!updatedComment) {
        return next(
          createError(HTTP.BAD_REQUEST, [
            {
              status: RESPONSE.ERROR,
              message: "This Comment Does Not Exist",
              statusCode: HTTP.BAD_REQUEST,
              data: {},
              code: HTTP.BAD_REQUEST,
            },
          ])
        );
      } else {
        return createResponse(`Comment Edited`, updatedComment)(res, HTTP.OK);
      }
  } catch (err) {
    logger.error(err);
    return next(createError.InternalServerError(err));
  }
};
