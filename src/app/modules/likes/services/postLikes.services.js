const PostLikesRepository = require("../repository/postLikes.repository");

class PostLikesService {
  constructor() {
    this.PostLikesRepository = PostLikesRepository;
  }
  
  async createRecord(data) {
    return this.PostLikesRepository.create(data)
  }

  async findARecord(query) {
    return this.PostLikesRepository.findOne(query);
  }

  async updateARecord(condition, update) {
    return this.PostLikesRepository.update(condition, update)
  }

async updateMany(condition, update) {
    return this.PostLikesRepository.updateMany(condition, update);
  }
  async GetAllRecords(limit, page, data, selectedFields) {
   return this.PostLikesRepository.all(limit, page, data, selectedFields)

  }

  async findRecordById(id) {
    return this.PostLikesRepository.findById(id)
  }

  async deletAll() {
    return this.PostLikesRepository.delete({})
  }

  async deletOne (condition) {
    return this.PostLikesRepository.delete(condition)
  }
}

module.exports = PostLikesService;
