import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

const element = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(element);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  const init: IBook[] = [];
  const [books, setBook] = useState(init);
  const createBook = (title: string) => {
    setBook([...books, { id: books.length + 1, title }]);
  };
  const deleteBook = (id: number) => {
    setBook(books.filter((value) => value.id !== id));
  };
  return (
    <div>
      <BookList books={books} deleteBook={deleteBook} />
      <CreateBook createBook={createBook} />
    </div>
  );
}

export interface IBook {
  id: number;
  title: string;
}
type Props = {
  createBook: (title: string) => void;
};

function CreateBook({ createBook }: Props) {
  const [title, setTitle] = useState("");
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle((e.target as HTMLInputElement).value);
  };
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTitle("");
    createBook(title);
  };
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={title} onChange={onChange}></input>
      <button> save </button>
    </form>
  );
}
export interface IBookList {
  books: IBook[];
  deleteBook: (id: number) => void;
}
function BookList({ books, deleteBook }: IBookList) {
  return (
    <div>
      {books.map((book, index) => (
        <Book key={index} book={book} deleteBook={deleteBook} />
      ))}
    </div>
  );
}

function Book({
  book,
  deleteBook,
}: {
  book: IBook;
  deleteBook: (id: number) => void;
}) {
  const onClickDelete = () => {
    deleteBook(book.id);
  };
  return (
    <div style={{ display: "flex" }}>
      <div>{book.title}</div>
      <button onClick={onClickDelete}>x</button>
    </div>
  );
}
