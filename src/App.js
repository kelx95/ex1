import { useState } from "react";
import { getAllBooks } from "./services/Books";
import Book from "./components/Book";
import AppWrapper from "./styles";
import Loading from "./components/common/LoadingIndicator";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

function App() {
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(false);
  const [searchedBook, setSearchedBook] = useState("");
  const [sort, setSort] = useState("");

  const handleFetchData = async () => {
    setLoading(true);
    const books = await getAllBooks();
    console.log(books);
    setBooks(books);
    const booksWithPosition = [...books].map((book, index) => {
      book.position = index;
      book.id = index;
      return book;
    });
    setBooks(booksWithPosition);
    //2secs delay to see the spinner
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const sortBooks = (books) => {
    return books.slice().sort((a, b) => {
      const aDate = new Date(a.released);
      const bDate = new Date(b.released);
      if (sort === "dateAsc") return aDate - bDate;
      if (sort === "dateDesc") return bDate - aDate;
      if (sort === "pagesAsc") return a.numberOfPages - b.numberOfPages;
      if (sort === "pagesDesc") return b.numberOfPages - a.numberOfPages;
      if (sort === "") return a.position - b.position;
      return a.position - b.position;
    });
  };

  const filterBooks = (books) => {
    return books.filter((book) =>
      book.name.toLowerCase().includes(searchedBook.toLowerCase())
    );
  };

  const handleSearchBook = (e) => setSearchedBook(e.target.value);

  const handleSort = (e) => setSort(e.target.value);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const SortableItem = SortableElement(({ value, index }) => (
    <Book
      name={value.name}
      authors={value.authors}
      numberOfPages={value.numberOfPages}
      country={value.country}
      released={formatDate(value.released)}
      bookCount={value.position}
      key={index}
    />
  ));

  const SortableList = SortableContainer(() => {
    return (
      <div className="books">
        {books &&
          sortBooks(filterBooks(books)).map((value, index) => (
            <SortableItem value={value} index={index} key={value.id} />
          ))}
      </div>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let arr = arrayMove(books, oldIndex, newIndex);
    for (let i = 0; i < arr.length; i++) {
      arr[i].position = i;
    }
    setBooks(arr);
  };

  return (
    <AppWrapper>
      <div className="container">
        <div className="header">
          <h1>Game Of Thrones Books</h1>
          <div>Fetch a list from an API and display it</div>
          <button onClick={handleFetchData}>Fetch Data</button>
          {books && !loading && (
            <div className="inputs">
              <div className="searchInput">
                <label>
                  Search:
                  <input
                    type="text"
                    value={searchedBook}
                    onChange={handleSearchBook}
                  />
                </label>
              </div>
              <div className="sort">
                <label>
                  Sort By:
                  <select onChange={handleSort}>
                    <option value="">Drag and Drop</option>
                    <option value="dateAsc">Date - Ascending</option>
                    <option value="dateDesc">Date - Descending</option>
                    <option value="pagesAsc">Pages - Ascending</option>
                    <option value="pagesDesc">Pages - Descending</option>
                  </select>
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="books">
          {loading ? (
            <Loading color={"green"} />
          ) : (
            books && <SortableList onSortEnd={onSortEnd} axis="xy" />
          )}
        </div>
      </div>
    </AppWrapper>
  );
}

export default App;
