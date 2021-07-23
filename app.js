import { postMiddleware, preMiddleware } from "./middleware";

import app from "./express";
import { connect } from "./db";
import { errorMiddleware } from "./middleware/errorMiddleware";
import routers from "./routers";

app.use(preMiddleware);
app.use(routers);
app.use(postMiddleware);
app.use(errorMiddleware);

connect(async () => {
  app.listen(process.env.PORT || 8000, () => {
    console.log("😎 App is running fine!");
  });
});
