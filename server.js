const dotenv = require("dotenv");
const app = require("./app.js");
const sequelize = require("./src/config/db.js");

dotenv.config();

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced");
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("DB connection Error:", err));
