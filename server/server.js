const express = require("express");
const fetch = require("node-fetch");

const server = express();

server.use(express.json());

server.get("/sumo/:name1/:name2", (req, res) => {
  const { name1, name2 } = req.params;
  const promise1 = fetch(
    `https://pokeapi.co/api/v2/pokemon/${name1}`
  ).then((res) => res.json());
  const promise2 = fetch(
    `https://pokeapi.co/api/v2/pokemon/${name2}`
  ).then((res) => res.json());

  Promise.all([promise1, promise2]).then(([result1, result2]) => {
    const heavier = result1.weight > result2.weight ? result1 : result2;
    const lighter = result1.weight < result2.weight ? result1 : result2;
    const difference = heavier.weight - lighter.weight;
    const differenceInKg = difference / 10; // pokémon weight is in hectograms—why?!
    res.send(
      `${heavier.name} outweighs ${lighter.name} by ${differenceInKg}kg`
    );
  });
});

// in order to test our server we must export it
// we don't start the server here: that happens in index.js
// that way we can test this file without starting a listener on a port
module.exports = server;
