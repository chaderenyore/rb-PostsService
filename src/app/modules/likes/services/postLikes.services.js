const PostLikesRepository = require("../repository/postLikes.repository");

class PostLikesService {
  constructor() {
    this.PostLikesRepository = PostLikesRepository;
  }
  
  async createRecord(data) {
    return this.PostLikesRepository.create(data)
  }

  async findARecord(query) {
    this.PostLikesRepository.findOne(query);
  }

  async updateARecord(condition, update) {
    this.PostLikesRepository.update(condition, update)
  }

  async GetAllRecords(limit, page, data, selectedFields) {
   this.PostLikesRepository.all(limit, page, data, selectedFields)

  }

  async findRecordById(id) {
    this.PostLikesRepository.findById(id)
  }

  async deletAll() {
    this.PostLikesRepository.delete({})
  }

  async deletOne (condition) {
    this.PostLikesRepository.delete(condition)
  }
}

module.exports = PostLikesService;
