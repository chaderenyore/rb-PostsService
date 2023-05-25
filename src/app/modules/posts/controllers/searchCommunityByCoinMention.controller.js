const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const logger = require("../../../../../logger.conf");
const CommunityPostsService = require("../services/communityPosts.services");
const { FilterRuleFilterSensitiveLog } = require("@aws-sdk/client-s3");

exports.searchPostsByCoinMention = async (req, res, next) => {
  try {
    const { coin_name } = req.query
    const filteredPosts = await new CommunityPostsService().getAll(
      req.query.limit,
      req.query.page,
    {
      $or: [
        { post_title: { $regex: '.*' + coin_name + '.*', $options: "i" } },
        { post_body_text: { $regex: '.*' + coin_name + '.*', $options: "i" } },
      ],
    }
    );
    if (filteredPosts && filteredPosts.data.length === 0) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: `No Matches For ${coin_name}`,
            statusCode: HTTP.OK,
            data: {},
            code: HTTP.OK,
          },
        ])
      );
    } else {
      return createResponse(
        `Match For ${coin_name} Fetched`,
        filteredPosts
      )(res, HTTP.OK);
    }
  } catch (err) {
    console.error(err);
    return next(createError.InternalServerError(err));
  }
};
