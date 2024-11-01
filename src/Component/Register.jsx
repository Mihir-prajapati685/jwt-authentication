import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
export default function Register() {
  const navigate = useNavigate();
  const email = useRef("");
  const password = useRef("");
  const conformpass = useRef("");
  const [responsedata, setresponse] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();

    const postdata = {
      email: email.current.value,
      password: password.current.value,
      conformpass: conformpass.current.value,
    };
    if (postdata.password === postdata.conformpass) {
      await axios
        .post("http://localhost:8000/register", postdata)
        .then((response) => {
          if (response) {
            console.log("respose get complete", response);
            setresponse(response.data);
          }
        })
        .catch((err) => {
          console.log("data not posting", err.message);
        });
    } else {
      alert("password and conformpassword not match");
    }

    if (responsedata) {
      alert('register successfully');
      navigate("/login");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
          <div className="text-center mb-12">
            <a href="javascript:void(0)">
              <img
                src="https://readymadeui.com/readymadeui.svg"
                alt="logo"
                className="w-40 inline-block"
              />
            </a>
          </div>

          <form onSubmit={handlesubmit}>
            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email Id
                </label>
                <input
                  name="email"
                  type="text"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                  required
                  ref={email}
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  required
                  ref={password}
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Confirm Password
                </label>
                <input
                  name="cpassword"
                  type="password"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter confirm password"
                  required
                  ref={conformpass}
                />
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <label
                  htmlFor="remember-me"
                  className="text-gray-800 ml-3 block text-sm"
                >
                  I accept the{" "}
                  <a
                    href="javascript:void(0);"
                    className="text-blue-600 font-semibold hover:underline ml-1"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <div className="!mt-12">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Create an account
              </button>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center">
              Already have an account?{" "}
              <a
                href="javascript:void(0);"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
