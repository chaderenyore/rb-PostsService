const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const RecycleService = require("../../posts/services/recycleBin.services");

exports.clearBinPosts = async (req, res, next) => {
    try {
      // get the array of post_ids from the body
      const { post_ids } = req.body;
      // loop through idss and delete from community while adding to banned posts and user's posts
      for (let i = 0; i < post_ids.length; i++) {
        // future implementation
        // search for posts and if report count exceed a certain value ,delete
        // check if post exist
        console.log("IDS ============ ", post_ids[0]);
        const post = await new RecycleService().findARecord({post_id: post_ids[i]});
        if(!post){
          return next(
            createError(HTTP.OK, [
              {
                status: RESPONSE.SUCCESS,
                message: `Id At Position ${i} is Invalid`,
                statusCode: HTTP.Ok,
                data: {},
                code: HTTP.Ok,
              },
            ])
          );
        }
    //   destructively clear posts
        const bin = await new RecycleService().deletOne({post_id: post_ids[i]});
      }
      return createResponse("Recycled Bin Emptied", {})(
        res,
        HTTP.OK
      );
    } catch (err) {
      logger.error(err);
      return next(createError.InternalServerError(err));
    }
  };
  