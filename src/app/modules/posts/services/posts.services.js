const PostsRepository = require("../repository/posts.repository");
// const { message } = require("../../../../_constants/service.message");

class PostsService {
  constructor() {
    this.PostsRepository = PostsRepository;
  }
  
  async createRecord(data) {
    return this.PostsRepository.create(data)
  }

  async findARecord(query) {
    this.PostsRepository.findOne(query);
  }

  async updateARecord(condition, update) {
    this.PostsRepository.update(condition, update)
  }

  async GetAllRecords(limit, page, data, selectedFields) {
   this.PostsRepository.all(limit, page, data, selectedFields)

  }

  async findRecordById(id) {
    this.PostsRepository.findById(id)
  }

  async deletAll() {
    this.PostsRepository.delete({})
  }

  async deletOne (condition) {
    this.PostsRepository.delete(condition)
  }
}

module.exports = PostsService;
