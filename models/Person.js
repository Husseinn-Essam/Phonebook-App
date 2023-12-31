const mongoose = require("mongoose");
require("dotenv").config();
const connectionURL = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);
mongoose.connect(connectionURL);

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true },
  number: {
    type: String,
    validate: {
      validator: function (value) {
        return /^\d{2,3}-\d{7,8}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("Person", personSchema);
