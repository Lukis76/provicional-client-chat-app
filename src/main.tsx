import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
// import { ApolloProvider } from '@apollo/client'
// import { client } from '@GraphQL'
// import { AuthUserProvider } from '@context'

createRoot(document.getElementById('root') as HTMLElement).render(
  // <ApolloProvider client={client}>
    // <AuthUserProvider>
      <App />
    // </AuthUserProvider>
  // </ApolloProvider>
)
