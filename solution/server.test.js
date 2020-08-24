const test = require("tape");
const request = require("supertest");
const nock = require("nock");
const server = require("../server/server");

test("Compares pokemon weights", (t) => {
  // intercept all requests to the PokéAPI
  const mocks = nock("https://pokeapi.co");

  // mock response to requests for pikachu
  mocks
    .get("/api/v2/pokemon/pikachu")
    .reply(200, { name: "ron", weight: 6000000000 });

  // mock response to requests for onix
  mocks
    .get("/api/v2/pokemon/onix")
    .reply(200, { name: "hilda", weight: 21000000 });

  request(server)
    .get("/sumo/pikachu/onix")
    .expect(200)
    .then((res) => {
      t.equal(res.text, "ron outweighs hilda by 597900000kg");
      t.end();
    });
});
