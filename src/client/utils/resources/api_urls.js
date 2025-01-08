const baseUrl = import.meta.env.VITE_API_URL;

const api_urls = {
  listings: {
    get_all_listingss: (page, size) =>
      `${baseUrl}listings?page=${page}&size=${size}`,
    get_single_listing: (itemId) => `${baseUrl}listings?itemId=${size}`,
  },
  bookings: ``, //Carts url
  users: {
    login: `${baseUrl}users/login`,
    register: `${baseUrl}users`,
    check_account: (email) => `${baseUrl}users/account_status?email=${email}`,
  },
};

export default api_urls;
