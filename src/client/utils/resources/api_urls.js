const baseUrl = import.meta.env.VITE_API_URL;

const api_urls = {
    listings: {
        get_all_listingss: (page, size) => `${baseUrl}listings?page=${page}&size=${size}`,
        get_single_listing: (itemId) => `${baseUrl}listings?itemId=${size}`
    },
    carts: `` //Carts url
}

export default api_urls;