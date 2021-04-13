import { useState } from "react";
import { getAllBooks } from "./services/Books";
import Book from "./components/Book";
import AppWrapper from "./styles";
import Loading from "./components/common/LoadingIndicator";

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
            books &&
            sortBooks(filterBooks(books)).map((book, index) => (
              <Book
                name={book.name}
                authors={book.authors}
                numberOfPages={book.numberOfPages}
                country={book.country}
                released={formatDate(book.released)}
                bookCount={index}
                key={index}
              />
            ))
          )}
        </div>
      </div>
    </AppWrapper>
  );
}

export default App;
