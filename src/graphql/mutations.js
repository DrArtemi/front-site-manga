import gql from 'graphql-tag'


// AUTH
export const LOGIN_USER = gql`
mutation login ($email: String! $password: String! ){
  login(email: $email password: $password ){
    token,
    status,
    message
  }
}
`
export const REGISTER_USER = gql`
mutation registerUser($pseudo: String! $email: String! $password: String! ) {
    registerUser( pseudo: $pseudo, email: $email, password: $password) {
      token,
      status,
      message
    }
}
`
export const LIKE_MANGA = gql`
mutation like($manga_id: Int!) {
    like( manga_id: $manga_id) {
      success,
      message
    }
}
`
export const UNLIKE_MANGA = gql`
mutation unlike($manga_id: Int!) {
    unlike( manga_id: $manga_id) {
      success,
      message
    }
}
`