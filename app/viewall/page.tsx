'use client';

import { useEffect, useState } from 'react';

interface Quote {
  author: string;
  text: string;
  hash_id: string
}

export default function Page() {
  const [ quotesArr, setQuotesArr ] = useState<Quote[]>([]);

  async function fetchQuotes() {
    const res = await fetch('http://localhost:4000/fetchall');
    const arr: Quote[] = await res.json();
    setQuotesArr(arr);
  }

  useEffect(() => {
    fetchQuotes();
  }, []);


  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center pt-[90px] pb-[90px] bg-slate-100">
      <div className='rounded bg-slate-100 w-[750px] h-[550px] overflow-y-auto' style={{border: '2px gold solid'}}>
        <ol style={{border: '2px black solid'}}>
          {
            quotesArr.map((quote) => (
              <li key={quote.hash_id}>
                <strong>{quote.author}:</strong> {quote.text}
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  );
}
