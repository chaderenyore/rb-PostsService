const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const { faker } = require('@faker-js/faker');

const CommentModel = require('../app/modules/comments/models/comments.models');
const AddCommentController = require('../app/modules/comments/controllers/addComment.controller');

describe('Comment Repository', function () {
  describe('Create Comment: Success', function () {
    it('it should create a Comment', async function () {
      const spyValue = {
        commenter_username: faker.name.firstName(),
        email: faker.internet.email(),
        comment_body_text: faker.random.word(),
        total_likes: faker.random.numeric(),
        post_id: faker.random.word(),
        comment_id: faker.random.word(),
        status: 200,
      };
      const stub = sinon.stub(CommentModel, 'create').returns(spyValue);
      const commentRepo = new CommentModel();
      const comment = await AddCommentController.createComment(spyValue);
      expect(stub.calledOnce).to.be.true;
      expect(stub.comment.commenter_username).to.be.equal(spyValue.username);
      expect(stub.comment.email).to.be.equal(spyValue.email);
      expect(stub.comment.comment_body_text).to.be.equal(
        spyValue.comment_body_text
      );
      expect(stub.comment.total_likes).to.be.equal(spyValue.total_likes);
      expect(stub.comment.post_id).to.be.equal(spyValue.post_id);
      expect(stub.comment.comment_id).to.be.equal(spyValue.comment_id);
    });
  });
});
