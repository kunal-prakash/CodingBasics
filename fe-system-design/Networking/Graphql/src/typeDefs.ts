/**
 * GraphQL Schema Definition (SDL).
 *
 * Conventions used:
 * - `!` marks a field as non-nullable (required).
 * - Field names use camelCase to match JavaScript conventions.
 */
export const typeDefs = /* GraphQL */ `
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol
  """
  Multi-line
  comment
  """
  type Author {
    id: ID!
    name: String!
    books: [Book!]!
  }
  type Book {
    id: ID!
    title: String!
    publishedYear: Int
    author: Author
  }

  """
  The "Query" type is special: it lists all of the available queries that
  clients can execute, along with the return type for each. In this
  case, the "books" query returns an array of zero or more Books (defined above).
  """
  type Query {
    books: [Book!]!
    authors: [Author!]!
    book(id: ID!): Book
    author(id: ID!): Author
  }

  # write operations.
  type Mutation {
    addBook(title: String!, publishedYear: Int, authorId: ID!): Book!
  }
`;
