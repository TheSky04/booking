const showUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user details for ID: ${userId}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  };
  
  export default showUserDetails;
  