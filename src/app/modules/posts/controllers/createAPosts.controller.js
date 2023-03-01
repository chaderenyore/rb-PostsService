const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const PostService = require("../services/posts.services");
const CommunityPostService = require("../services/communityPosts.services");
const logger = require("../../../../../logger.conf");
const { bannedWords } = require("../../../../_helpers/BannedWords");
const KEYS = require("../../../../_config/keys");


exports.createPost = async (req, res, next) => {
  try {
    //  filter banned words from title and text
    const BannedWords = await bannedWords();
    logger.log("info", BannedWords);
    // store body text and tile in an array
   const titleArray = req.body.post_title.split(" ");
   const bodyArray = req.body.post_body_text.split(" ");
    if (titleArray.includes(BannedWords) || bodyArray.includes(BannedWords)) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Some Banned Words Detected",
            statusCode: HTTP.OK,
            data: null,
            code: HTTP.OK,
          },
        ])
      );
    } else {
    // Get user Info for creating post
    const user = await axios.post(
      `${KEYS.USER_SERVICE_URI}/users/v1/user/${req.user.user_id}?platform=web`,
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    );
    if(user && user.data && user.data.code === 200){
           // create post
           let firstname;
           let fullname;
           if(user.data.data.first_name && user.data.data.firstname !== " "){
            firstname = user.data.data.firstname;
            fullname = firstname;
           }
           if(user.data.data.last_name && user.data.data.last_name !== " "){
            fullname = `${firstname} ${user.data.data.last_name}`
           }
    const dataToPostModel = {
      poster_id: req.user.user_id,
      poster_fullname: fullname || "",
      poster_image: user.data.data.image ? user.data.data.image : "",
      poster_username: user.data.data.username ? user.data.data.username : "",
      post_type: "original",
      ...req.body
    }
    // create post record
    const newPost = await new PostService().create(dataToPostModel);
    if(newPost){
      console.log("NEWPOST ================== ", newPost);
      const dataToCommunityPostModel = {
        poster_id: req.user.user_id,
        original_post_id: newPost._id,
        poster_fullname: fullname || "",
        poster_username: user.data.data.username ? user.data.data.username : "",
        poster_username: user.data.data.username ? user.data.data.username : "",
        post_type: "original",
        ...req.body
      }
      // create community post
     const communityPost = await new CommunityPostService().create(dataToCommunityPostModel);
     console.log("Community Post ======= ", communityPost);
    }
    console.log("New Post : ========= : ", newPost);
    return createResponse("Post Created", newPost)(res, HTTP.OK);
      } else {
        return next(
          createError(HTTP.BAD_REQUEST, [
            {
              status: RESPONSE.ERROR,
              message: "Unable To Create Post, Try Again",
              statusCode: HTTP.BAD_REQUEST,
              data: null,
              code: HTTP.BAD_REQUEST,
            },
          ])
        );
      }
    }
  } catch (err) {
    console.log(err);

    return next(createError.InternalServerError(err));
  }
};
