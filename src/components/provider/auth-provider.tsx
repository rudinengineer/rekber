"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
import Login from '../../pages/Login'
import Spinner from '../loading/Spinner'

type Props = {
    children: React.ReactNode
}

export default function AuthProvider({children}: Props) {
  const { status, data: session } = useSession()

  console.log(session)

  return (
    status === 'loading' ? (
        <div className='flex gap-4 items-center'>
            <Spinner />
            <h1>Loading...</h1>
        </div>
    ) : (
        status === 'authenticated' ? (
            <div>{children}</div>
        ) : (
            <Login />
        )
    )
  )
}