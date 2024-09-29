'use client';

import { useEffect, useState } from 'react';

interface Quote {
  author: string;
  text: string;
  hash_id: string
}

export default function Page() {
  const [ quotesArr, setQuotesArr] = useState<Quote[]>([]);

  async function fetchQuotes() {
    const res = await fetch('http://localhost:4000/fetchall');
    const arr: Quote[] = await res.json();
    setQuotesArr(arr);
  }

  useEffect(() => {
    fetchQuotes();
  }, []);


  return (
    <div>
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
