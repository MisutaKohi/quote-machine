'use client';

import { useEffect, useState } from 'react';

interface Quote {
  author: string;
  text: string;
  hash_id: string
}

export default function Page() {
  const [ quotesArr, setQuotesArr] = useState<Quote[]>([]);

  async function getQuotes() {
    const quotes = await fetch('http://localhost:4000/fetchall');
    const data: Quote[] = await quotes.json();

    setQuotesArr(data);

    console.log(data);
  }

  return (
    <div>
      <button onClick={ getQuotes }>Click Me</button>
      <ol>
        {
          quotesArr.map((quote) => (
            <li key={quote.hash_id}>
              <strong>{quote.author}:</strong> {quote.text}
            </li>
          ))
        }
      </ol>
    </div>
  );
}
