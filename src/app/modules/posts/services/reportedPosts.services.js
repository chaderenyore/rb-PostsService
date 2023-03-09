const ReportedPostsRepository = require("../repository/reportedPosts.repository");

class ReportedPostsService {
  constructor() {
    this.ReportedPostsRepository = ReportedPostsRepository;
  }
  
  async create(data) {
    return this.ReportedPostsRepository.create(data)
  }

  async findARecord(query) {
    return this.ReportedPostsRepository.findOne(query);
  }

  async update(condition, update) {
    return this.ReportedPostsRepository.update(condition, update)
  }

  async getAll(limit, page, data, selectedFields) {
   return this.ReportedPostsRepository.all(limit, page, data, selectedFields)

  }

  async findById(id) {
    return this.ReportedPostsRepository.findById(id)
  }

  async deletAll() {
    this.ReportedPostsRepository.delete({})
  }

  async deletOne (condition) {
    this.ReportedPostsRepository.deleteOne(condition)
  }
  async updateMany(condition, update) {
    return this.Model.updateMany(condition, update, {
      new: true,
      lean: true,
    });
  }
}

module.exports = ReportedPostsService;
