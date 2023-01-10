import React, { useState, useEffect } from "react";
import { ApiClient } from "./apiClient";

function App() {
  const [fetching, changeFetching] = useState();
  const [authors, changeAuthors] = useState([]);
  const [lastIndex, changeLastIndex] = useState(0);
  const [quotes, changeQuotes] = useState({
    content: "",
    author: "",
    tags: [],
  });
  const client = new ApiClient();

  const updateQuote = (resData) => {
    changeQuotes({
      content: resData.content,
      author: resData.author,
      tags: resData.tags,
      id: resData.id,
    });
  };

  const fetchData = async () => {
    changeFetching(true);
    const quote = await client.fetchQuote();
    updateQuote(quote);
    changeFetching(false);
  };

  const fetchAuthors = async () => {
    const authors = await client.fetchAuthors(lastIndex);
    changeAuthors(authors.results);
  };

  const getQuoteByAuthor = async (authorId) => {
    const quotesList = await client.fetchQuoteByAuthor(authorId);
    updateQuote({
      ...quotesList.results[Math.floor(Math.random() * quotesList.count)],
      id: authorId,
    });
  };

  const makeAuthorTable = () => {
    return authors.map((author, index) => {
      return (
        <tr
          key={index}
          onClick={() => {
            getQuoteByAuthor(author._id);
          }}
        >
          <td
            style={{ backgroundColor: quotes.id === author._id ? "green" : "" }}
          >
            {author.name}
          </td>
          <td>{author.quoteCount}</td>
        </tr>
      );
    });
  };

  const handlePagination = (bool) => {
    if (bool) {
      changeLastIndex((prev) => prev + 10);
    } else {
      changeLastIndex((prev) => (lastIndex < 10 ? 0 : prev - 10));
    }
  };

  useEffect(() => {
    changeQuotes({
      content: "loading...",
      author: "",
      tags: [],
    });
    fetchData();
    fetchAuthors();
  }, []);

  useEffect(() => {
    fetchAuthors();
  }, [lastIndex]);

  return (
    <>
      <h1>Quote of the day</h1>
      <p>
        <b>Content:</b> {quotes.content}{" "}
      </p>
      <p>
        <b>Author:</b> {quotes.author}{" "}
      </p>
      <p>
        <b>Tags:</b> {quotes.tags.join(", ")}
      </p>
      <button
        disabled={fetching}
        onClick={() => {
          fetchData();
        }}
      >
        Random Quote
      </button>
      <button
        onClick={() => {
          handlePagination(false);
        }}
      >
        Prev
      </button>
      <button
        onClick={() => {
          handlePagination(true);
        }}
      >
        Next
      </button>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>No of Quotes</td>
          </tr>
        </thead>
        <tbody>{makeAuthorTable()}</tbody>
      </table>
    </>
  );
}

export default App;
