'use client';

import { useState } from 'react';

export default function Page() {
  const [ formData, setFormData ] = useState({
    text: '',
    author: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents default page refresh
    console.log('Form Submitted:', formData);
    
    const response = await fetch('http://localhost:4000/savequote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specifies that the content is JSON
      },
      body: JSON.stringify(formData), // Converts the form data to JSON string
    });

    if (response.ok) {
      console.log('okay');
      setFormData({
        text: '',
        author: ''
      });

    } else {
      console.log('quote already exists');
    }
  };
  
  return (
    <form onSubmit={ handleSubmit}>
      <div>
        <label htmlFor="text">Quote:</label>
        <input
          type="text"
          id="text"
          name="text"
          value={formData.text}
          onChange={ handleChange }
          required
        />
      </div>

      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={ formData.author }
          onChange={ handleChange }
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}
