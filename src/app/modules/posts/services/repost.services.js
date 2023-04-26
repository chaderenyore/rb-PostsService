const RePostsRepository = require("../repository/reposts.repository");

class RePostService {
  constructor() {
    this.RePostsRepository = RePostsRepository;
  }
  
  async create(data) {
    return this.RePostsRepository.create(data)
  }

  async findOne(query) {
    return this.RePostsRepository.findOne(query);
  }

  async update(condition, update) {
    return this.RePostsRepository.update(condition, update)
  }

  async getAll(limit, page, data, selectedFields) {
   return this.RePostsRepository.all(limit, page, data, selectedFields)

  }

  async findById(id) {
    return this.RePostsRepository.findById(id)
  }

  async deletAll() {
    this.RePostsRepository.delete({})
  }

  async deletOne (condition) {
    this.RePostsRepository.deleteOne(condition)
  }
  async updateMany(condition, update) {
    return this.RePostsRepository.updateMany(condition, update);
  }
}

module.exports = RePostService;
