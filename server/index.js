const server = require("./server");
const PORT = process.env.PORT || 3000;

// this file is solely responsible for starting our server
// the server creation happens in server.js, which allows us to test
// it without actually starting to listen on a port
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
