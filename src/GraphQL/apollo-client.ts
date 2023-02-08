import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
//////////////////////////////////////////////////////////////////
const getStorage = () => {console.log('apolo client 🥇 👍 💯 👎')
  return (() => typeof window !== 'undefined' ? localStorage.getItem('token') : null )()
}

/////////////////////////////////////////////////////////////////
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI as string,
  headers: {
    authorization: `Bearer: ${getStorage() || ''}`,
  },
  // credentials: 'same-origin',
})
//////////////////////////////////////////////////
const authLink = setContext((_, { headers }) => {
  return {
    authorization: `Bearer ${getStorage() || ''}`,
  }
})
////////////////////////////////////////////////////////
const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: import.meta.env.GRAPHQL_URI_SUB as string,
          connectionParams: { authToken: getStorage() || null },
        })
      )
    : null
////////////////////////////////////////////////////////////////////
const splitLink =
  typeof window !== 'undefined' && wsLink !== null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query)
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          )
        },
        wsLink,
        httpLink
      )
    : httpLink
/////////////////////////////////////////////////////////////////////////////////////////////////
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(splitLink),
})
