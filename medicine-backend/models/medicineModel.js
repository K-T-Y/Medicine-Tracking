const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicineSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required:true,
  },
  Category: {
    type: String,
    required: true,
  },
  Quantity: {
    type:Number,
    required: true,
  },
  MFD: {
    type: Date,
    required:true,
  },
  ExpDate: {
    type: Date,
    required: true,
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});


const Medicine = mongoose.model("Medicine", MedicineSchema);
module.exports = Medicine;
