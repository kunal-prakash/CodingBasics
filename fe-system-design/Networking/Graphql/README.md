## Schema

```graphql
type Book {
  id: ID!
  title: String!
  publishedYear: Int
  author: Author
}

type Author {
  id: ID!
  name: String!
  books: [Book!]!
}

type Query {
  books: [Book!]!
  authors: [Author!]!
  book(id: ID!): Book
  author(id: ID!): Author
}

type Mutation {
  addBook(title: String!, publishedYear: Int, authorId: ID!): Book!
}
```

## Data

```
    - list of books
    - list of authors
    - list of books with author-details
    - list of author with book details
    - get book by id
    - get author by id
    - add book
```
