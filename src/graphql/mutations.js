import gql from 'graphql-tag'

export const LOGIN_USER = gql`
mutation login ($email: String! $password: String! ){
  login(email: $email password: $password ){
    token
  }
}
`
export const REGISTER_USER = gql`
mutation createUser($pseudo: String! $email: String! $password: String! ) {
    createUser( pseudo: $pseudo, email: $email, password: $password) {
      token
    }
}
`