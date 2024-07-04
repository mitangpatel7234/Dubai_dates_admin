import React,{useState,useEffect} from 'react'
import { Link,useHistory  } from 'react-router-dom'
import axios from 'axios'
import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button } from '@windmill/react-ui'
import {server} from "../server"
import {toast} from "react-toast"

const Login= ({ setAuthToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/admin/login`, { email, password });
     
        const token = response.data.token;
        setAuthToken(token);
        localStorage.setItem('authToken', token);
        if (response.status === 200) {
        history.push('/app');
      } else {
        toast.error('Login failed. Please try again.');
      }
    } catch (err) {
      toast.error('Invalid email or password');
    }
  };
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <form onSubmit={handleSubmit}>
              <Label>
                <span>Email</span>
                <Input className="mt-1" type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} placeholder="john@doe.com" />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input className="mt-1" type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} placeholder="***************" />
              </Label>
              
              <Button className="mt-4" block type="submit">
                Log in
              </Button>
              </form>
              <hr className="my-8" />

             
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
