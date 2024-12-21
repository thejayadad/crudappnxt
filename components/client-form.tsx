'use client'
import { createClient } from '@/lib/create-client'
import React from 'react'
import { useActionState } from 'react'
import SubmitButton from './submit-btn';


interface FieldErrors {
    name?: string[];
    department?: string[];
    years?: string[];
}

const ClientForm = () => {
    const [state, formAction] = useActionState(createClient, null)

  return (
    <form action={formAction}>
        <input id='name' name='name' placeholder='Name...' />
        <input id='department' name='department' placeholder='Department...' />
        <input id='years' name='years' placeholder='Years...' />
        <SubmitButton />
    </form>
  )
}

export default ClientForm