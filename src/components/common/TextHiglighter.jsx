import React from "react";

const TextHighlighter = ({
  text = "",
  queries = [],
  highlightBG = "yellow",
  highlightTextColor = "black",
}) => {
  // Create a regular expression to match any of the query strings, case-insensitive
  const regex = new RegExp(`(${queries.join("|")})`, "gi");

  // Function to break text into parts around the queries
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        queries.some((query) => part.toLowerCase() === query.toLowerCase()) ? (
          <span
            key={index}
            style={{ background: highlightBG, color: highlightTextColor }}
          >
            {part}
          </span>
        ) : (
          part // Non-matching part of the text
        )
      )}
    </span>
  );
};

export default TextHighlighter;
