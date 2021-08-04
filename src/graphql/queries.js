import gql from 'graphql-tag'

// AUTH
export const LOGGED_IN_USER = gql`
  query {
    me {
      id
      pseudo
      email
    }
  }
`

// MANGAS
export const CHAPTERS = gql`
  query {
    me {
      id
      pseudo
      email
    }
  }
`