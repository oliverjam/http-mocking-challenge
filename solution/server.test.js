const test = require("tape");
const request = require("supertest");
const nock = require("nock");
const server = require("../server/server");

test("Compares pokemon weights", (t) => {
  nock("https://pokeapi.co")
    .get("/api/v2/pokemon/pikachu")
    .reply(200, { name: "pikachu", weight: 60 })
    .get("/api/v2/pokemon/onix")
    .reply(200, { name: "onix", weight: 2100 });

  request(server)
    .get("/sumo/pikachu/onix")
    .expect(200)
    .then((res) => {
      t.equal(res.text, "onix outweighs pikachu by 204kg");
      t.end();
    });
});
