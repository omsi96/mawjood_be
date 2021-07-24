const io = require("socket.io")(3000);

io.on("connection", (socket) => {
  console.log("New instructor is taking attendance");

  socket.on("disconnect", (socket) => {
    console.log("DISCONNECTING");
  });
  socket.on("newStudent", (data) => {
    console.log("New student hopped", data);
  });
});

export default io;
