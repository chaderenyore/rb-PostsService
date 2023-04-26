const CommunityPostsRepository = require("../repository/communityPosts.repository");

class CommunityPostsService {
  constructor() {
    this.CommunityPostsRepository = CommunityPostsRepository;
  }
  
  async create(data) {
    return this.CommunityPostsRepository.create(data)
  }

  async findAPost(query) {
    return this.CommunityPostsRepository.findOne(query);
  }

  async update(condition, update) {
    return this.CommunityPostsRepository.update(condition, update)
  }

  async getAll(limit, page, data, selectedFields) {
   return this.CommunityPostsRepository.all(limit, page, data, selectedFields)

  }

  async findById(id) {
    return this.CommunityPostsRepository.findById(id)
  }

  async deletAll() {
    return this.CommunityPostsRepository.delete({})
  }

  async deletOne (condition) {
    return this.CommunityPostsRepository.deleteOne(condition)
  }
  async updateMany(condition, update) {
    return this.CommunityPostsRepository.updateMany(condition, update);
  }
}

module.exports = CommunityPostsService;
