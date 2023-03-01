const CommentLikesRepository = require("../repository/commentLikes.repository");

class ComentLikesService {
  constructor() {
    this.CommentLikesRepository = CommentLikesRepository;
  }
  
  async create(data) {
    return this.CommentLikesRepository.create(data)
  }

  async findARecord(query) {
    this.CommentLikesRepository.findOne(query);
  }

  async updateARecord(condition, update) {
    this.CommentLikesRepository.update(condition, update)
  }

  async GetAllRecords(limit, page, data, selectedFields) {
   this.CommentLikesRepository.all(limit, page, data, selectedFields)

  }

  async findRecordById(id) {
    this.CommentLikesRepository.findById(id)
  }

  async deletAll() {
    this.CommentLikesRepository.delete({})
  }

  async deletOne (condition) {
    this.CommentLikesRepository.delete(condition)
  }
}

module.exports = ComentLikesService;
