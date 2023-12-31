const CommentsRepository = require('../repository/comments.repository');

class CommentsService {
  constructor() {
    this.CommentsRepository = CommentsRepository;
  }

  async createComment(data) {
    return this.CommentsRepository.create(data);
  }

  async findAComment(query) {
    return this.CommentsRepository.findOne(query);
  }
  async updateARecord(condition, update) {
    return this.CommentsRepository.update(condition, update);
  }

  async updateMany(condition, update) {
    return this.CommentsRepository.updateMany(condition, update);
  }
  async GetAllComments(limit, page, data, selectedFields) {
    return this.CommentsRepository.all(limit, page, data, selectedFields);
  }

  async findRecordById(id) {
    return this.CommentsRepository.findById(id);
  }

  async deletAll() {
    return this.CommentsRepository.delete({});
  }

  async deletOne(condition) {
    return this.CommentsRepository.delete(condition);
  }
}

module.exports = CommentsService;
