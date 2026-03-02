import type { Book, Author, AddBookArgs } from "./types/models.js";
import { data, findAuthorById, findBooksByAuthor } from "./data.js";

/**
 * Resolver map — one resolver per field that requires custom resolution logic.
 *
 * The Apollo Server resolvers follow this signature per field:
 *   (parent, args, contextValue, info) => ReturnType
 *
 * Types:
 *   - `parent`  The value resolved by the parent field resolver.
 *   - `args`    Arguments provided to the field in the GraphQL query.
 *   - `context` A shared request-level object (e.g. auth, dataloaders).
 *   - `info`    AST/schema information about the current query execution.
 *
 * We only type the parameters we actually use in each resolver.
 */
export const resolvers = {
  Book: {
    author(parent: Book): Author | undefined {
      return findAuthorById(parent.authorId);
    },
  },

  Author: {
    books(parent: Author): Book[] {
      return findBooksByAuthor(parent.bookIds);
    },
  },

  Query: {
    books(): Book[] {
      return data.books;
    },

    authors(): Author[] {
      return data.authors;
    },

    book(_parent: unknown, args: { id: string }): Book | undefined {
      return data.books.find((b) => b.id === args.id);
    },

    author(_parent: unknown, args: { id: string }): Author | undefined {
      return findAuthorById(args.id);
    },
  },

  Mutation: {
    addBook(_parent: unknown, args: AddBookArgs): Book {
      // Verify the referenced author exists before creating the book
      const author = findAuthorById(args.authorId);
      if (!author) {
        throw new Error(`Author with id "${args.authorId}" not found.`);
      }

      const newBook: Book = {
        id: String(data.books.length + 101),
        title: args.title,
        publishedYear: args.publishedYear,
        authorId: args.authorId,
      };

      data.books.push(newBook);
      // Also register the book in the author's bookIds list
      author.bookIds.push(newBook.id);

      return newBook;
    },
  },
};
