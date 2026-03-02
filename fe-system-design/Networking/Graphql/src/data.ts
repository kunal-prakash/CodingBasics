import type { Author, Book, DataStore } from "./types/models.js";

export const data: DataStore = {
  authors: [
    {
      id: "1",
      name: "Kunal",
      bookIds: ["101", "103"],
    },
    {
      id: "2",
      name: "Mario",
      bookIds: ["102"],
    },
  ],
  books: [
    {
      id: "101",
      title: "Harry Potter",
      publishedYear: 2000,
      authorId: "1",
    },
    {
      id: "102",
      title: "Why Always Me",
      publishedYear: 2010,
      authorId: "2",
    },
    {
      id: "103",
      title: "Meaning of Life",
      publishedYear: 2009,
      authorId: "1",
    },
  ],
};

export function findAuthorById(id: string): Author | undefined {
  return data.authors.find((a) => a.id === id);
}

export function findBooksByAuthor(bookIds: string[]): Book[] {
  return data.books.filter((b) => bookIds.includes(b.id));
}
