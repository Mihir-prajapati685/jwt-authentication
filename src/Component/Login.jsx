import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';

export default function Login() {
  const [emaildata, setemail] = useState('');
  const [passdata, setpass] = useState('');
  const [backdata, setbackdata] = useState('');
  const token = Cookies.get('token');

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login',
        { emaildata, passdata },
        {withCredentials:true}
      );
      if (!response) {
        console.log('response not done');
      }
      else {
        console.log(response.data);
        
      }

    } catch (err) {
      console.log('frontend message',err.message);
    }
  }
  if (token) {
    console.log(token, 'here token is');
  }
  return (
      <div>
<div className="container px-4 mx-auto">
  <div className="max-w-lg mx-auto">
    <div className="text-center mb-6">
      <h2 className="text-3xl md:text-4xl font-extrabold">Sign in</h2>
    </div>
    <form action="" onSubmit={handlesubmit}>
      <div className="mb-6">
        <label className="block mb-2 font-extrabold" htmlFor="">Email</label>
              <input className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900  shadow border-2 border-indigo-900 rounded" type="email" placeholder="email"
               onChange={(e)=>setemail(e.target.value)}/>
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-extrabold" htmlFor="">Password</label>
              <input className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900  shadow border-2 border-indigo-900 rounded" type="password" placeholder="**********"
              onChange={(e)=>setpass(e.target.value)}/>
      </div>
      <div className="flex flex-wrap -mx-4 mb-6 items-center justify-between">
        <div className="w-full lg:w-auto px-4 mb-4 lg:mb-0">
          <label htmlFor="">
              <input type="checkbox"/>
              <span className="ml-1 font-extrabold">Remember me</span>
            </label>
        </div>
        <div className="w-full lg:w-auto px-4"><a className="inline-block font-extrabold hover:underline" href="#">Forgot your
            password?</a></div>
      </div>
      <button type='submit' className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200">Sign in</button>
      <p className="text-center font-extrabold">Don&rsquo;t have an account? <a className="text-red-500 hover:underline"
          href="#">Sign up</a></p>
    </form>
  </div>
</div>
    </div>
  )
}
