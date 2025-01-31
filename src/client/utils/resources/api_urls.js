const baseUrl = import.meta.env.VITE_API_URL;
const userBaseUrl = import.meta.env.VITE_USER_API_URL;

const api_urls = {
  listings: {
    get_all_listings: (page, size) => `${baseUrl}listings?page=${page}&size=${size}`,
    get_single_listing: (itemId) => `${baseUrl}listings?itemId=${itemId}`,
  },
  bookings: ``,
  users: {
    login: `${userBaseUrl}users/login`,
    register: `${userBaseUrl}users`,
    verify: `${userBaseUrl}users/verify`,
    reset_token: (email) => `${userBaseUrl}users/password-reset-token?email=${email}`,
    reset_operation: (newPassword) => `${userBaseUrl}users/password/reset?newPassword=${newPassword}`,
    update_account: (userId) => `${userBaseUrl}users?userId=${userId}`,
    get_user: (userId) => `${userBaseUrl}users/${userId}`,
    check_status: (email) => `${userBaseUrl}users/account_status?email=${email}`,
    get_all_users: `${userBaseUrl}users`,
    generate_reset_token: (email) => `${userBaseUrl}users/password-reset-token?email=${email}`,
    regenerate_verification_token: (email) => `${userBaseUrl}users/re-verification-token?email=${email}`,
    delete: (userId) => `${userBaseUrl}users?userId=${userId}`,
  },
};

export default api_urls;