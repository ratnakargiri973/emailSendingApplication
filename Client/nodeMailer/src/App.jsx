import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post('https://emailsendingapplication-tn31.onrender.com/api/user', formData);

      if (response.status === 200) {
        setShow(true);
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='bg-cyan-500 w-full h-screen flex flex-col justify-start items-center gap-8 pt-12'>
      <h1 className='font-bold text-6xl pb-8'>Email Sending Application</h1>

      {show ? (
        <div className='flex justify-center items-center flex-col text-2xl font-bold text-emerald-600'>
        <h1>Thank you for getting in touch with us.</h1>
        <h2>We have received your message and will respond to your inquiry as soon as possible.</h2>
        <h2>Check your email for a confirmation message. We appreciate your time and look forward to assisting you further.</h2>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center bg-yellow-200 w-2/4 p-12 rounded'>
          <div className='flex justify-center items-center gap-4'>
            <label htmlFor="">Name: </label>
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
              className='w-96 rounded border-none p-2 outline-none'
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>
          <br />

          <div className='flex justify-center items-center gap-4'>
          <label htmlFor="">Email: </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
               className='w-96 rounded border-none p-2 outline-none'
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <br />

          <div className='flex justify-center items-center gap-4'>
          <label htmlFor="">Message: </label>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
               className='w-96 rounded border-none p-2 outline-none'
            ></textarea>
            {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
          </div>
          <br />

          <button type="submit" className='p-4 bg-green-300 rounded hover:bg-green-600 hover:text-white font-bold'>Send Email</button>
        </form>
      )}
    </div>
  );
}

export default App;
