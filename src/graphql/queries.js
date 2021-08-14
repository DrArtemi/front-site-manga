import gql from 'graphql-tag'

// AUTH
export const LOGGED_IN_USER = gql`
  query {
    me {
      id
      pseudo
      email
      mangas {
        id
      }
    }
  }
`
