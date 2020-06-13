import { gql } from 'apollo-boost'

export const CHECK_USERNAME = gql`
  query checkUsername($username: String!) {
  users(where: {username: {_eq: $username}}) {
    username
  }
}

`

export const GET_USER_EMAIL = gql`
  query getEmail($input: String!) {
  users(where: {
    _or: [{username: {_eq: $input}}, {phone_number: {_eq: $input}}]})
    {
    email
  }
}

`

export const GET_EDIT_USER = gql`
query getEditUser($id: uuid!) {
  users_by_pk(id: $id) {
    bio
    email
    name
    phone_number
    profile_image
    website
    username
    id
  }
}

`

export const FIND_USER = gql`
  query findUser($query: String) {
  users(where: {
    _or: [{ username: { _ilike: $query}}, { name: { _ilike: $query}}]
  }) {
    id 
    username
    name
    profile_image
  }
}

`

export const GET_USER_PROFILE = gql`
query getUserProfile($username: String!) {
  users(where: {username: {_eq: $username}}) {
    bio
    id
    name
    username
    website
    profile_image
    posts_aggregate {
      aggregate {
        count
      }
    }
    followers_aggregate {
      aggregate {
        count
      }
    }
    following_aggregate {
      aggregate {
        count
      }
    }
    saved_posts {
      post {
        image
        id
        likes_aggregate {
          aggregate {
            count
          }
        }
        comments_aggregate {
          aggregate {
            count
          }
        }
      }
    }
    posts {
      image
      id
      likes_aggregate {
        aggregate {
          count
        }
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
}

`