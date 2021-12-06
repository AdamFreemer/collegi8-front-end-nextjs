import React, { useState } from 'react';
import { userService } from '../services/user.service';

export default function User() {



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="text-left px-12 pt-6 pb-8 bg-white shadow-lg">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6 flex flex-col">
          <form onSubmit={ e => handleSubmit(e, email, password) }>
                <div className="mb-4">
                  <label className="block text-grey-darker text-sm font-bold mb-2">
                    Greetings!
                  </label>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}