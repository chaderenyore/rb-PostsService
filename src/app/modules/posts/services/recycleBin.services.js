const RecycleBinRepository = require("../repository/recycleBin.repository");

class RecycleBinService {
  constructor() {
    this.RecycleBinRepository = RecycleBinRepository;
  }
  
  async create(data) {
    return this.RecycleBinRepository.create(data)
  }

  async findARecord(query) {
    return this.RecycleBinRepository.findOne(query);
  }

  async update(condition, update) {
    return this.RecycleBinRepository.update(condition, update)
  }

  async getAll(limit, page, data, selectedFields) {
   return this.RecycleBinRepository.all(limit, page, data, selectedFields)

  }

  async findById(id) {
    return this.RecycleBinRepository.findById(id)
  }

  async deletAll() {
    this.RecycleBinRepository.delete({})
  }

  async deletOne (condition) {
    this.RecycleBinRepository.deleteOne(condition)
  }
  async updateMany(condition, update) {
    return this.Model.updateMany(condition, update, {
      new: true,
      lean: true,
    });
  }
}

module.exports = RecycleBinService;
