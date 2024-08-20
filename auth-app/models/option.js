// import { Schema, model } from 'mongoose';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const optionSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    question:{
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    link_to_vote: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Option = mongoose.model('Option', optionSchema);
module.exports = Option;

// export default Option;
