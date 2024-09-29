import crypto from 'crypto';

interface Quote {
  author : String,
  text : String
}

const createHashKey = ({ author, text } : Quote) => {
  const combined = author + "" + text;
  return crypto.createHash('sha256').update(combined).digest('hex');
};

export default createHashKey;