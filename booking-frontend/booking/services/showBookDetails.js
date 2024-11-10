const showBookDetails = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3000/books/${bookId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch book details for ID: ${bookId}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching book details:', error);
      throw error;
    }
  };
  
  export default showBookDetails;
  