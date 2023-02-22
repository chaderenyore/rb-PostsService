const SuggestedRepository = require("../repository/suggested.repository");
// const { message } = require("../../../../_constants/service.message");

class SuggestedService {
  constructor() {
    this.SuggestedRepository = SuggestedRepository;
  }
  
  async createRecord(data) {
    return this.SuggestedRepository.create(data)
  }

  async findARecord(query) {
    this.SuggestedRepository.findOne(query);
  }

  async updateARecord(condition, update) {
    this.SuggestedRepository.update(condition, update)
  }

  async GetAllRecords(limit, page, data, selectedFields) {
   this.SuggestedRepository.all(limit, page, data, selectedFields)

  }

  async findRecordById(id) {
    this.SuggestedRepository.findById(id)
  }

  async deletAll() {
    this.SuggestedRepository.delete({})
  }

  async deletOne (condition) {
    this.SuggestedRepository.delete(condition)
  }
}

module.exports = LikesService;
