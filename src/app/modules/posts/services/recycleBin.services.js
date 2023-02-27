const RecycleBinRepository = require("../repository/recycleBin.repository");

class RecycleBinService {
  constructor() {
    this.RecycleBinRepository = RecycleBinRepository;
  }
  
  create(data) {
    return this.RecycleBinRepository.create(data)
  }

  findARecord(query) {
    return this.RecycleBinRepository.findOne(query);
  }

  update(condition, update) {
    return this.RecycleBinRepository.update(condition, update)
  }

  getAll(limit, page, data, selectedFields) {
   return this.RecycleBinRepository.all(limit, page, data, selectedFields)

  }

  findById(id) {
    return this.RecycleBinRepository.findById(id)
  }

  deletAll() {
    this.RecycleBinRepository.delete({})
  }

  deletOne (condition) {
    this.RecycleBinRepository.delete(condition)
  }
  updateMany(condition, update) {
    return this.Model.updateMany(condition, update, {
      new: true,
      lean: true,
    });
  }
}

module.exports = RecycleBinService;
