
interface AdminCredentials {
  username: string;
  password: string;
}

// Default admin credentials
const DEFAULT_ADMIN: AdminCredentials = {
  username: 'admin',
  password: 'admin123'
};

// Check if admin credentials exist in localStorage, if not, set defaults
const initAdminCredentials = (): void => {
  if (!localStorage.getItem('adminCredentials')) {
    localStorage.setItem('adminCredentials', JSON.stringify(DEFAULT_ADMIN));
  }
};

// Get admin credentials
export const getAdminCredentials = (): AdminCredentials => {
  initAdminCredentials();
  const credentials = localStorage.getItem('adminCredentials');
  return credentials ? JSON.parse(credentials) : DEFAULT_ADMIN;
};

// Update admin credentials
export const updateAdminCredentials = (credentials: AdminCredentials): void => {
  localStorage.setItem('adminCredentials', JSON.stringify(credentials));
};

// Check if the provided credentials are valid
export const checkAdminCredentials = (username: string, password: string): boolean => {
  const adminCredentials = getAdminCredentials();
  return username === adminCredentials.username && password === adminCredentials.password;
};

// Check if the user is logged in
export const isLoggedIn = (): boolean => {
  return localStorage.getItem('adminLoggedIn') === 'true';
};

// Log in the user
export const login = (username: string, password: string): boolean => {
  if (checkAdminCredentials(username, password)) {
    localStorage.setItem('adminLoggedIn', 'true');
    localStorage.setItem('adminLoginTime', new Date().toISOString());
    return true;
  }
  return false;
};

// Log out the user
export const logout = (): void => {
  localStorage.removeItem('adminLoggedIn');
  localStorage.removeItem('adminLoginTime');
};

// Initialize the admin credentials
initAdminCredentials();
