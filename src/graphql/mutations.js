import gql from 'graphql-tag'

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