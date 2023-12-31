const PostsRepository = require("../repository/posts.repository");

class PostsService {
  constructor() {
    this.PostsRepository = PostsRepository;
  }
  
  async create(data) {
    return this.PostsRepository.create(data)
  }

  async findAPost(query) {
    return this.PostsRepository.findOne(query);
  }

  async update(condition, update) {
    return this.PostsRepository.update(condition, update)
  }

  async getAll(limit, page, data, selectedFields) {
   return this.PostsRepository.all(limit, page, data, selectedFields)

  }

  async findById(id) {
    return this.PostsRepository.findById(id)
  }

  async deletAll() {
    return this.PostsRepository.delete({})
  }

  async deleteOne (condition) {
    return this.PostsRepository.deleteOne(condition)
  }
  async updateMany(condition, update) {
    return this.PostsRepository.updateMany(condition, update);
  }

  async countDocuments(condition = {}) {
    return this.PostsRepository.count();
  }
}

module.exports = PostsService;
