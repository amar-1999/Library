
import axios from "axios";
export const getBooks = async () => {
  try {
    return await axios.get(`https://openlibrary.org/people/mekBot/books/already-read.json`).then(res => {
      return res?.data;
    });
  } catch (err) {
    return console.log(err);
  }
};

export const searchBooksByTitle = async (title) => {
  try {
    return await axios.get(`https://openlibrary.org/search.json?q=${title}`).then(res => {
      return res?.data;
    });
  } catch (err) {
    return console.log(err);
  }
};


