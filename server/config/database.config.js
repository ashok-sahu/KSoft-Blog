const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

exports.databaseConnection = async () => {
  try {
    await mongoose
      .connect(
        `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.q5mat.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        }
      )
      .then((res) => {
        console.log("database connected successfully!".bold.green);
      });
  } catch (error) {
    console.log("error while connect to database!", error.message);
    process.exit(1);
  }
};
