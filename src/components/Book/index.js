import React from "react";
import PropTypes from "prop-types";
import BookWrapper from "./styles";
import {
  FaSmile,
  FaClock,
  FaHome,
  FaCreativeCommonsShare,
} from "react-icons/fa";

const Book = ({
  name,
  authors,
  numberOfPages,
  country,
  released,
  bookCount,
}) => {
  return (
    <BookWrapper>
      <div className="title">
        <div>{`Book ${bookCount + 1}`}</div>
        <h3>{name}</h3>
      </div>
      <div className="details">
        <div>
          <FaSmile /> {authors[0]}
        </div>
        <div>
          <FaCreativeCommonsShare />
          {numberOfPages}
        </div>
        <div>
          <FaHome />
          {country}
        </div>
        <div>
          <FaClock />
          {released}
        </div>
      </div>
    </BookWrapper>
  );
};

Book.propTypes = {
  name: PropTypes.string,
  authors: PropTypes.array,
  numberOfPages: PropTypes.number,
  country: PropTypes.string,
  released: PropTypes.string,
  bookCount: PropTypes.number,
};

export default Book;
