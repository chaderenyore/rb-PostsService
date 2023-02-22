const LikesRepository = require("../repository/likes.repository");
// const { message } = require("../../../../_constants/service.message");

class LikesService {
  constructor() {
    this.LikesRepository = LikesRepository;
  }
  
  async createRecord(data) {
    return this.LikesRepository.create(data)
  }

  async findARecord(query) {
    this.LikesRepository.findOne(query);
  }

  async updateARecord(condition, update) {
    this.LikesRepository.update(condition, update)
  }

  async GetAllRecords(limit, page, data, selectedFields) {
   this.LikesRepository.all(limit, page, data, selectedFields)

  }

  async findRecordById(id) {
    this.LikesRepository.findById(id)
  }

  async deletAll() {
    this.LikesRepository.delete({})
  }

  async deletOne (condition) {
    this.LikesRepository.delete(condition)
  }
}

module.exports = LikesService;
