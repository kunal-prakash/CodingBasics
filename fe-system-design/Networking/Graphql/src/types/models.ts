export interface Book {
  id: string;
  title: string;
  publishedYear?: number;
  authorId: string;
}

export interface Author {
  id: string;
  name: string;
  bookIds: string[];
}

export interface DataStore {
  authors: Author[];
  books: Book[];
}

export interface AddBookArgs {
  title: string;
  publishedYear?: number;
  authorId: string;
}
