'use client'
import { useState, ChangeEvent, FormEvent } from 'react';

const TextBoxInput = () => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // You can perform any action with the input value here
    console.log('Submitted value:', inputValue);
    // For example, you could send the value to an API or store it in the state of a parent component
    // reset the input field after submission
    setInputValue('');
  };

  return (
    <form className="flex-row" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter number of EXTRA prepaid tickets here"
        className="w-52 h-8 p-2 border rounded mr-2"
      />
    <button className="text-center text-white font-semibold z-10 i h-8 w-52 bg-gradient-to-br from-yellow-400 to-yellow-600 items-center 
        rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-105
        hover:scale-y-105 transition duration-300 ease-out" type="submit">Update Extra Tickets</button>
      
    </form>
  );
};

export default TextBoxInput;
