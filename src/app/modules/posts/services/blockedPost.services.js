const BlockedPostsRepository = require("../repository/blockedPosts.repository");

class BlockedPostsService {
  constructor() {
    this.BlockedPostsRepository = BlockedPostsRepository;
  }
  
  async create(data) {
    return this.BlockedPostsRepository.create(data)
  }

  async findAPost(query) {
    return this.BlockedPostsRepository.findOne(query);
  }

  async update(condition, update) {
    return this.BlockedPostsRepository.update(condition, update)
  }

  async find(condition) {
    return this.BlockedPostsRepository.find(condition)
  }
 
  async getAll(limit, page, data, selectedFields) {
   return this.BlockedPostsRepository.all(limit, page, data, selectedFields)

  }

  async findById(id) {
    return this.BlockedPostsRepository.findById(id)
  }

  async deletAll() {
    this.BlockedPostsRepository.delete({})
  }

  async deletOne (condition) {
    this.BlockedPostsRepository.deleteOne(condition)
  }
  async updateMany(condition, update) {
    return this.Model.updateMany(condition, update, {
      new: true,
      lean: true,
    });
  }
}

module.exports = BlockedPostsService;
