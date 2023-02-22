const PostsRepository = require("../repository/posts.repository");

class PostsService {
  constructor() {
    this.PostsRepository = PostsRepository;
  }
  
  create(data) {
    return this.PostsRepository.create(data)
  }

  findARecord(query) {
    this.PostsRepository.findOne(query);
  }

  update(condition, update) {
    this.PostsRepository.update(condition, update)
  }

  getAll(limit, page, data, selectedFields) {
   this.PostsRepository.all(limit, page, data, selectedFields)

  }

  findById(id) {
    this.PostsRepository.findById(id)
  }

  deletAll() {
    this.PostsRepository.delete({})
  }

  deletOne (condition) {
    this.PostsRepository.delete(condition)
  }
  updateMany(condition, update) {
    return this.Model.updateMany(condition, update, {
      new: true,
      lean: true,
    });
  }
}

module.exports = PostsService;
