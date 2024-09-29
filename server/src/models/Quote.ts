import mongoose from 'mongoose';

const QuoteSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  hash_id: {
    type: String,
    required: true
  },
});

const Quote = mongoose.model('Quote', QuoteSchema);

export default Quote;