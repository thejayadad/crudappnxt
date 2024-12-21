'use client'

import Link from 'next/link';
import React from 'react'

const SearchReset = () => {
    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;

        if(form) form.reset();
    }

  return (
    <button type="reset" onClick={reset}>
        <Link href={'/'}>
            X 
        </Link>        
    </button>
  )
}

export default SearchReset