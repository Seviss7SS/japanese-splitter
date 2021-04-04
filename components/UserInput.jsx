/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import useSplitter from '../hooks/useSplitter'

const UserInput = () => {
  const [value, setValue] = useState('')
  const { splitted, getSplitData } = useSplitter()

  useEffect(() => {
    console.log(value)
  }, [value])

  return (
    <>
      <label htmlFor="japanese-input" className="block text-sm font-medium text-gray-700">Enter Japanese Text</label>
      <div className="mt-1">
        <textarea 
          type="text" 
          value={value}
          name="japanese-input" 
          className="shadow-sm focus:ring-indigo-500 block w-full sm:text-sm rounded-md"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <br/>
      <button 
        type="button" 
        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => getSplitData(value)}
      >
        Split
        <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      </button>
      <br/>
      <label htmlFor="japanese-output" className="block text-sm font-medium text-gray-700">Output</label>
      <textarea 
          type="text" 
          value={splitted}
          name="japanese-output" 
          className="shadow-sm focus:ring-indigo-500 block w-full sm:text-sm rounded-md"
          readOnly
      />
    </>
  )
}

export default UserInput