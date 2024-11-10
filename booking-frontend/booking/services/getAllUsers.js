const getAllBooks = async () => {
    const response = await fetch("http://localhost:3000/users");
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    return response.json();
};

export default getAllBooks;
  