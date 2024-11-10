const getAllBooks = async () => {
    const response = await fetch("http://localhost:3000/books");
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    return response.json();
};

export default getAllBooks;
  