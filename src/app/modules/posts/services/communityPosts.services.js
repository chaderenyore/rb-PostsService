const CommunityPostsRepository = require("../repository/communityPosts.repository");

class CommunityPostsService {
  constructor() {
    this.CommunityPostsRepository = CommunityPostsRepository;
  }
  
  create(data) {
    return this.CommunityPostsRepository.create(data)
  }

  findAPost(query) {
    return this.CommunityPostsRepository.findOne(query);
  }

  update(condition, update) {
    return this.CommunityPostsRepository.update(condition, update)
  }

  getAll(limit, page, data, selectedFields) {
   return this.CommunityPostsRepository.all(limit, page, data, selectedFields)

  }

  findById(id) {
    return this.CommunityPostsRepository.findById(id)
  }

  deletAll() {
    this.CommunityPostsRepository.delete({})
  }

  deletOne (condition) {
    this.CommunityPostsRepository.delete(condition)
  }
  updateMany(condition, update) {
    return this.Model.updateMany(condition, update, {
      new: true,
      lean: true,
    });
  }
}

module.exports = CommunityPostsService;
