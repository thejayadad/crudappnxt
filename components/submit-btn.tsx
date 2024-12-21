'use client'
import React from 'react'
import {useFormStatus} from "react-dom"

interface SubmitButtonProps {
    defaultText?: string;
    pendingText?: string;
}

const SubmitButton: React.FC<SubmitButtonProps>= ({defaultText = 'Submit', pendingText = "Updating..."}) => {
    const {pending} = useFormStatus()
  return (
    <button
    type='submit'
    disabled={pending}
    className={`px-4 py-2 rounded ${
        pending 
        ? 'bg-gray-300 text-white cursor-not-allowed'
        : 'bg-gray-600 text-white'
    }`}
    >
        {pending ? pendingText : defaultText}
    </button>
  )
}

export default SubmitButton