const BlockedPostsRepository = require("../repository/blockedPosts.repository");

class BlockedPostsService {
  constructor() {
    this.BlockedPostsRepository = BlockedPostsRepository;
  }
  
  create(data) {
    return this.BlockedPostsRepository.create(data)
  }

  findAPost(query) {
    return this.BlockedPostsRepository.findOne(query);
  }

  update(condition, update) {
    return this.BlockedPostsRepository.update(condition, update)
  }

  getAll(limit, page, data, selectedFields) {
   return this.BlockedPostsRepository.all(limit, page, data, selectedFields)

  }

  findById(id) {
    return this.BlockedPostsRepository.findById(id)
  }

  deletAll() {
    this.BlockedPostsRepository.delete({})
  }

  deletOne (condition) {
    this.BlockedPostsRepository.delete(condition)
  }
  updateMany(condition, update) {
    return this.Model.updateMany(condition, update, {
      new: true,
      lean: true,
    });
  }
}

module.exports = BlockedPostsService;
