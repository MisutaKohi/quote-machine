'use client';

import { useEffect, useState } from 'react';
import { text } from 'stream/consumers';

interface Quote {
  author: string;
  text: string;
  hash_id: string
}

export default function Page() {
  const [ quotesArr, setQuotesArr ] = useState<Quote[]>([]);
  const [ editID, setEditID ] = useState<string | null>(null);
  const [ textInput, setTextInput ] = useState<string>('');

  async function fetchQuotes() {
    const res = await fetch('http://localhost:4000/fetchall');
    const arr: Quote[] = await res.json();
    setQuotesArr(arr);
  }

  useEffect(() => {
    fetchQuotes();
  }, []);

  
  async function handleEdit(text : string, quote_id : string) {
    if (editID !== null) {
      alert('Please save current record before modifying another.');
      return; // cannot modify more than 1 record concurrently
    }
    setTextInput(text);
    setEditID(quote_id);
  }

  async function updateRecord(author : string, text : string, quote_id : string) {
    const quoteInfo : Quote = {
      author: author,
      text: textInput,
      hash_id: quote_id
    }

    console.log(quoteInfo);
    
    const response = await fetch('http://localhost:4000/updatequote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specifies that the content is JSON
      },
      body: JSON.stringify(quoteInfo), // Converts the form data to JSON string
    });

    if (response.ok) {
      console.log('Record updated successfully');
      await fetchQuotes();

    } else {
      console.log('Failed to update quote in Mongo.');
    }

    setEditID(null);
  }

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
    // console.log(e.target.value);
  };


  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center pt-[90px] pb-[90px] bg-slate-100">
      <div className='rounded bg-slate-100 w-[750px] h-[550px] overflow-y-auto p-1 border border-slate-500 border-2'>
        <ol>
          {
            quotesArr.map((quote, index) => (
              <li key={quote.hash_id} className={`flex justify-between items-center p-2 text-xl ${(index % 2 == 0) ? 'bg-gray-200' : ''}`}>
                <span>
                  <strong>{quote.author}: </strong> 
                  {(quote.hash_id !== editID) 
                    ? (quote.text) : (
                    <input 
                      onChange={ handleInputChange }
                      className='border border-gray-400 rounded px-2 py-1 w-[475px]' 
                      type="text" 
                      defaultValue={quote.text} 
                    /> 
                  )}
                </span>
                {(editID !== quote.hash_id) ? (
                  <button onClick={ () => handleEdit(quote.text, quote.hash_id) }>Edit</button>
                 ) : (
                  <button onClick={ () => updateRecord(quote.author, quote.text, quote.hash_id) }>Save</button>
                )}
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  );
}
