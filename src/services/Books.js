import axios from "axios";

export const getAllBooks = async () => {
  const response = await axios.get(
    "https://anapioficeandfire.com/api/books?pageSize=30"
  );
  return response.data;
};
