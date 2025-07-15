'use client'
import { api } from '~/trpc/react'
import { useState } from 'react'
import LoginButton from '~/features/login/login-button'

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const addUser = api.user.add.useMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addUser.mutateAsync({ name, email, role: 'ADMIN' })
    setName('')
    setEmail('')
  }

  return (
    <>
      <LoginButton />
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />
        <button type="submit">'Add User'</button>
        {addUser.error && (
          <div style={{ color: 'red' }}>{addUser.error.message}</div>
        )}
        {addUser.isSuccess && <div style={{ color: 'green' }}>User added!</div>}
      </form>
    </>
  )
}
