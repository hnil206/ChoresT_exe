// src/utils/logout.ts
export const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    window.location.href = '/login'; // Redirect to login page after logout
  };
  