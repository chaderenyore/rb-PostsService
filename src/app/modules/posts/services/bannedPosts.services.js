const BannedPostsRepository = require("../repository/bannedPosts.repository");

class BannedPostsService {
  constructor() {
    this.BannedPostsRepository = BannedPostsRepository;
  }
  
  async create(data) {
    return this.BannedPostsRepository.create(data)
  }

  async findARecord(query) {
    return this.BannedPostsRepository.findOne(query);
  }

  async update(condition, update) {
    return this.BannedPostsRepository.update(condition, update)
  }

  async getAll(limit, page, data, selectedFields) {
   return this.BannedPostsRepository.all(limit, page, data, selectedFields)

  }

  async findById(id) {
    return this.BannedPostsRepository.findById(id)
  }

  async deletAll() {
    this.BannedPostsRepository.delete({})
  }

  async deletOne (condition) {
    this.BannedPostsRepository.deleteOne(condition)
  }
  async updateMany(condition, update) {
    return this.Model.updateMany(condition, update, {
      new: true,
      lean: true,
    });
  }
}

module.exports = BannedPostsService;
