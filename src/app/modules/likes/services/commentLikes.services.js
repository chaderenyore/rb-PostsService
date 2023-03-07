const CommentLikesRepository = require("../repository/commentLikes.repository");

class ComentLikesService {
  constructor() {
    this.CommentLikesRepository = CommentLikesRepository;
  }
  
  async create(data) {
    return this.CommentLikesRepository.create(data)
  }

  async findARecord(query) {
    return this.CommentLikesRepository.findOne(query);
  }

  async updateARecord(condition, update) {
    return this.CommentLikesRepository.update(condition, update)
  }

  async GetAllRecords(limit, page, data, selectedFields) {
   return this.CommentLikesRepository.all(limit, page, data, selectedFields)

  }

  async findRecordById(id) {
    return this.CommentLikesRepository.findById(id)
  }

  async deletAll() {
    return this.CommentLikesRepository.delete({})
  }

  async deletOne (condition) {
    return this.CommentLikesRepository.delete(condition)
  }
}

module.exports = ComentLikesService;
