const socketController = (socket) => {
  console.log("New instructor is taking attendance");

  socket.on("disconnect", (socket) => {
    console.log("DISCONNECTING");
  });
  socket.on("newStudent", (data) => {
    console.log("New student hopped", data);
    socket.broadcast.emit("newStudent", data);
    console.log("BROADCAST SENT!!!!");
  });
};

export default socketController;
