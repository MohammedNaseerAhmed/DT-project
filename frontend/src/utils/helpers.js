// Utility function to format dates
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };
  
  // Utility function to truncate long text (e.g., book descriptions)
  export const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  // Utility function to validate email format
  export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  
  // Utility function to validate password strength
  export const validatePassword = (password) => {
    // Must be at least 8 characters, contain a number and a special character
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(password);
  };
  
  // Utility function to check if a user is authenticated
  export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };
  