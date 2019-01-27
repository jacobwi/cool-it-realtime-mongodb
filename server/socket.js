let io;

module.exports = {
  init: server => {
    io = require("socket.io")(server);
    return io;
  },
  getSession: () => {
    if (!io) {
      throw new Error("Socket doesn't exists");
    }
    return io;
  }
};
