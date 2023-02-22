const CommentsRepository = require("../repository/comments.repository");
// const { message } = require("../../../../_constants/service.message");

class CommentsService {
  constructor() {
    this.CommentsRepository = CommentsRepository;
  }
  
  async createRecord(data) {
    return this.CommentsRepository.create(data)
  }

  async findARecord(query) {
    this.CommentsRepository.findOne(query);
  }

  async updateARecord(condition, update) {
    this.CommentsRepository.update(condition, update)
  }

  async GetAllRecords(limit, page, data, selectedFields) {
   this.CommentsRepository.all(limit, page, data, selectedFields)

  }

  async findRecordById(id) {
    this.CommentsRepository.findById(id)
  }

  async deletAll() {
    this.CommentsRepository.delete({})
  }

  async deletOne (condition) {
    this.CommentsRepository.delete(condition)
  }
}

module.exports = CommentsService;
