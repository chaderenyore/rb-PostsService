const ReportedPostsRepository = require("../repository/reportedPosts.repository");

class ReportedPostsService {
  constructor() {
    this.ReportedPostsRepository = ReportedPostsRepository;
  }
  
  create(data) {
    return this.ReportedPostsRepository.create(data)
  }

  findARecord(query) {
    return this.ReportedPostsRepository.findOne(query);
  }

  update(condition, update) {
    return this.ReportedPostsRepository.update(condition, update)
  }

  getAll(limit, page, data, selectedFields) {
   return this.ReportedPostsRepository.all(limit, page, data, selectedFields)

  }

  findById(id) {
    return this.ReportedPostsRepository.findById(id)
  }

  deletAll() {
    this.ReportedPostsRepository.delete({})
  }

  deletOne (condition) {
    this.ReportedPostsRepository.delete(condition)
  }
  updateMany(condition, update) {
    return this.Model.updateMany(condition, update, {
      new: true,
      lean: true,
    });
  }
}

module.exports = ReportedPostsService;
