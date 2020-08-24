# HTTP Mocking Challenge

This app relies on another API for some of its data. Unfortunately this makes testing it more difficult. If the other API is down, or we lose our Wi-Fi connection, or anything else goes wrong with the network, our tests will fail even though our code may be fine.

We also shouldn't be testing someone else's code: we want to _mock_ the responses to our network requests with realistic but ideal values, so we can focus on testing our own code.

## Server structure

In order to easily send fake requests to our server with Supertest we _create_ the server in a different file than where we start it. `server/server.js` is where we define our server with all its routes, then export it. We import this in `server/index.js` and call `server.listen(3000)` there.

This means our tests can just import the server from `server.js` without starting it listening on a port.

## nock

[`nock`](https://www.npmjs.com/package/nock) is a useful library for intercepting HTTP requests and sending fake responses. This means our server code runs as normal and (as far as its concerned) gets totally legit network responses.

### How it works

First create a mocking object for a base URL:

```js
const mocks = nock("https://some-api.com");
```

Then we can configure it to intercept individual requests and provide fake responses:

```js
mocks.get("/dogs/123").reply(200, { name: "Pongo" });
```

Now if our server makes a request to `https://some-api.com/dogs/123` it'll receive a fake `200` response with a body of `{ name: "Pongo" }`. However it won't actually make a request to `some-api.com`, which means our test will pass even if that API is offline.

**Note**: the mock request must match _exactly_, or `nock` will ignore it. Also each interceptor is used up after a request, so if you're expecting multiple requests to a domain you need to set up multiple interceptors.

## Challenge

This app tells you which of any two Pokémon is heavier. E.g. if you start the server with `npm run dev`, then visit http://localhost:3000/sumo/onix/pikachu, you should see this response:

```
onix outweighs pikachu by 204kg
```

The server fetches weight information from pokeapi.co. We don't want to rely on this API for our tests, so we should _mock_ it.

1. Open `tests/server.test.js`
1. Write a test for the `/sumo/:name1/:name2` route
   - Use `nock` to mock requests to the PokeAPI
   - Mock the Pokémon response objects
   - Check that the server still responds with the expected string

You can see an example PokeAPI response here: https://pokeapi.co/api/v2/pokemon/onix.
