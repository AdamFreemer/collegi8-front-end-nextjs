import React, { useState } from 'react';
import { userService } from '../services/user.service';

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authorized, setAuthorized] = useState(false);
  const [admin, setAdmin] = useState(false);

  const handleSubmit = (e, email, password) => {  
    e.preventDefault()  
    var returnedItems = userService.login(email, password);
    console.log('-- localStorage.getItem: ', localStorage)
    
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="text-left px-12 pt-6 pb-8 bg-white shadow-lg">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 flex flex-col">
          <form onSubmit={ e => handleSubmit(e, email, password) }>
                <div className="mb-4">
                  <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" 
                    id="email" type="text" placeholder="email" 
                    onChange={ e => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input 
                    className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" 
                    id="password" placeholder="Password" type="password" 
                    onChange={ e => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Submit
                </button>
                
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}