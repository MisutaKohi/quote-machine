'use client';

import { useState, useEffect } from 'react';

interface Quote {
  author: string;
  text: string;
  hash_id: string
}

export default function Home() {
  const blankQuote: Quote = {
    author: '',
    text: '',
    hash_id: ''
  };

  const [ quote, setQuote ] = useState<Quote>(blankQuote);

  async function fetchQuote() {
    const res = await fetch('http://localhost:4000/fetchquote');
    const data = await res.json();
    setQuote(data);
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div>
      <ul>
        <li>{ quote.text }</li>
        <li>{ quote.author }</li>
      </ul>
      <button onClick={ fetchQuote }>New quote</button>
    </div>
  );
}
