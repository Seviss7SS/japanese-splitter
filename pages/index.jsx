import Head from 'next/head'
import React from 'react'
import UserInput from '../components/UserInput'

const Home = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto">
        <UserInput/>
      </main>
    </>
  )
}

export default Home