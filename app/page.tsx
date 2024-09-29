'use client';

import { useState } from 'react';

export default function Home() {
  const [ text, setText ] = useState('Nothing');

  async function testServer() : Promise<void> {
    const res = await fetch('http://localhost:4000/');
    const data = await res.text();

    console.log(data);

    setText(data);
  }

  return (
    <div>
      <p>{ text }</p>
      <button onClick={ testServer }>Click here</button>
    </div>
  );
}
