import Head from 'next/head'
import Image from "next/legacy/image"
import styles from '../styles/Home.module.scss'
import Register from './register'
import { ApolloProvider } from '@apollo/client';
import client from "../apollo-client"
import Query from './query';


export default function App() {
  return (
      <>
      <Head>
        <title>Magyar Wesnoth Közösségi Portál</title>
        <meta name="description" content="Magyar Wesnoth Közösségi Portál" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ApolloProvider client={client}>
        <main className={styles.main}>
          <div className={styles.logo}>
              <Image
                src='/logo-hu.png'
                alt="Logo"
                width={415}
                height={189}
                priority
              />
          </div>
        </main>
        
      {/* <Query /> */}
      {/* <Register /> */}
      </ApolloProvider>
      </>
  )
}
