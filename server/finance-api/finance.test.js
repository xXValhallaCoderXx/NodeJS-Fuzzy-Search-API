const expect = require("expect");
const request = require("supertest");
const {app} = require("../index");


it("Should return a 404 on ID not found", done => {
  request(app)
    .get(`api/people-like-you?age="20"`)
    .expect(200)
    .end(done);
});