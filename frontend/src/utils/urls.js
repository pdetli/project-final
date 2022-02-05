const BASE_URL = "http://localhost:3003"

// slug approach
// slug will be the argument that we call API_URL
export const API_LOGIN_URL = (slug) => `${BASE_URL}/${slug}`
//fetch (API_URL ('signup')) --> slug directs the api with /signup endpoint
