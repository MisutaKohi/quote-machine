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

  const bgColors = [
    { name: 'dark brownish-purple', hexcode: '#432F32' }, 
    { name: 'muted, cool teal', hexcode: '#84AFA9' },
    { name: 'dark, desaturated blue-gray', hexcode: '#303D4E' },
    { name: 'muted olive green', hexcode: '#7FA760' },
    { name: 'dark reddish-brown', hexcode: '#312324' },
    { name: 'warm, golden-orange', hexcode: '#E7A03C' },
    { name: 'muted medium green', hexcode: '#55AC68' },
    { name: 'muted beige-green', hexcode: '#BDBB9C' },  
  ];
  
  let randomIdx = Math.floor(Math.random() * bgColors.length);
  const [ bgColor, setBgColor ] = useState<string>(bgColors[0].hexcode);

  async function fetchQuote() {
    const res = await fetch('http://localhost:4000/fetchquote');
    const data = await res.json();
    
    randomIdx = Math.floor(Math.random() * bgColors.length)
    setBgColor(bgColors[randomIdx].hexcode);

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
