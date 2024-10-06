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

  const bgColors = ['#432F32', '#84AFA9', '#303D4E', '#7FA760', '#312324', '#E7A03C', '#55AC68', '#BDBB9C'];
  let randomIdx = Math.floor(Math.random() * bgColors.length);
  const [ bgColor, setBgColor ] = useState<string>(bgColors[randomIdx]);

  async function fetchQuote() {
    const res = await fetch('http://localhost:4000/fetchquote');
    const data = await res.json();
    
    randomIdx = Math.floor(Math.random() * bgColors.length)
    setBgColor(bgColors[randomIdx]);

    setQuote(data);
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <main 
      style={{ backgroundColor: `${bgColor}`}}
      className='min-h-screen min-w-screen flex justify-center items-center pt-[90px] pb-[90px]'
    >
      <div className="rounded bg-slate-100 w-[550px] min-h-[350px]">
        <div>
          <p>{ quote.text }</p>
        </div>

        <div>
          <p>- { quote.author }</p>
        </div>
          
        <div>
          <button 
            onClick={ fetchQuote }
            className="hover:bg-blue-700 text-white py-2 px-4 rounded"
            style={{ backgroundColor: `${bgColor}`}}>
              New quote
            </button>
        </div>
      </div>
    </main>
  );
}
