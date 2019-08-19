//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = "https://dict.niweera.gq";
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Dict/hello", () => {
  beforeEach(done => setTimeout(done, 180000));
  /*
   * Test the /GET route
   */

  describe("/GET hello", () => {
    it("It should GET the definition of hello", done => {
      chai
        .request(server)
        .get("/hello")
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("word");
          res.body.word.should.be.a("string");
          res.body.word.should.equal("hello");
          res.body.should.have.property("definition");
          res.body.definition.should.be.a("string");
          res.body.definition.should.equal(
            "used as a greeting or to begin a telephone conversation."
          );
          done();
        });
    });
  });
});
