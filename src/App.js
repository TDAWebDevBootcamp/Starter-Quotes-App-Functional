import React, { useState, useEffect } from "react";

function App() {
  const [quotes, changeQuotes] = useState({
    content: "",
    author: "",
    tags: [],
  });

  useEffect(() => {
    changeQuotes({
      content: "a quote we made up",
      author: "anon",
      tags: ["quote", "stuff", "blah"],
    });
  }, []);

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
    </>
  );
}

export default App;
