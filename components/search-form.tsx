import React from 'react'
import Form from "next/form";
import SearchReset from './search-reset';


const SearchForm =({ query }: { query?: string }) => {
  return (
    <Form action="/" scroll={false}>
          <input
                name="query"
                defaultValue={query}
                placeholder="Search Clients"
            />
            <div className="flex gap-2">
                {query &&
                <SearchReset /> 
                }
                <button type='submit'>Search</button>
            </div>
    </Form>
  )
}

export default SearchForm