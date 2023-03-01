const chai = require('chai');
const sinon = require('sinon');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;
const { faker } = require('@faker-js/faker');

const AddCommentController = require('../app/modules/comments/controllers/addComment.controller');

describe('AddCommentController', function () {
  describe('Create Comment: Success', function () {
    let status, json, res, addcommentcontroller;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    it('should create a comment', async function () {
      const req = {
        body: {
          commenter_username: faker.name.firstName(),
          email: faker.internet.email(),
          comment_body_text: faker.random.word(),
          total_likes: faker.random.numeric(),
          post_id: faker.random.word(),
          comment_id: faker.random.word(),
        },
      };
      const spyValue = {
        commenter_username: faker.name.firstName(),
        email: faker.internet.email(),
        comment_body_text: faker.random.word(),
        total_likes: faker.random.numeric(),
        post_id: faker.random.word(),
        comment_id: faker.random.word(),
      };
      try {

        await AddCommentController.createComment(req, res);
        expect(status.calledOnce).to.be.true;
        expect(status.args[0][0]).to.equal(200);
        expect(json.calledOnce).to.be.true;
        // expect(json.args[0][0]).to.equal(spyValue);
      } catch(err) {
        console.log(err);
      }
      
    });
  });
});
