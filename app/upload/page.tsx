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
    <div className="min-h-screen min-w-screen flex justify-center items-center pt-[90px] pb-[90px] bg-stone-100">
      <form onSubmit={ handleSubmit} className='flex flex-col justify-center items-center rounded bg-slate-200 w-[550px] min-h-[350px] border-2 border-gray-300'>
        <div className="pb-[15px] w-[500px] flex flex-row">
          <div className="w-[20%] flex justify-end pr-2">
            <label htmlFor="text" className="text-2xl ">Quote: </label>
          </div>
          <div className="w-[75%]">
            <input
              type="text"
              id="text"
              name="text"
              className="w-[100%] h-[100%] p-2"
              value={formData.text}
              onChange={ handleChange }
              required
            />
          </div>
        </div>

        <div className="pb-[40px] w-[500px] flex flex-row">
          <div className="w-[20%] flex justify-end pr-2">
            <label htmlFor="author" className="text-2xl">Author: </label>
          </div>
          <div className="w-[75%]">
            <input
              type="text"
              id="author"
              name="author"
              className="w-[100%] h-[100%] p-2"
              value={ formData.author }
              onChange={ handleChange }
              required
            />
          </div>
        </div>

        <button 
          type="submit"
          className="hover:bg-gray-700 bg-black text-white text-xl py-2 px-4 rounded border">
            Submit
          </button>
      </form>
    </div>
  )
}
