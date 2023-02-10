import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { client } from '@GraphQL/index'
import { AuthUserProvider } from '@context/index'

createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <AuthUserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AuthUserProvider>
  </ApolloProvider>
)
