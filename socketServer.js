const io = require("socket.io")(3000);

io.on("connection", (socket) => {
  socket.emit("client-message", "client Appeared!");

  socket.on("newStudent", (studentName) => {
    console.log("New student hopped", studentName);
  });
});

export default io;
