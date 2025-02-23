
/**
 * Cookie utility functions for managing browser cookies
 */

// Set a cookie with a specified name, value, and expiration days
export const setCookie = (name: string, value: string, days: number = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

// Get a cookie value by name
export const getCookie = (name: string): string | null => {
  const cookieName = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  
  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length);
    }
  }
  return null;
};

// Delete a cookie by name
export const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

// Example usage:
// setCookie('myCookie', 'exampleValue', 7); // Set cookie for 7 days
// const value = getCookie('myCookie'); // Get cookie value
// deleteCookie('myCookie'); // Delete cookie
