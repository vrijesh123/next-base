import APIBase from "../utils/apiBase";

export const BASE_URL = "https://api.drguinwa.com";

// export const BASE_URL = 'http://192.168.0.168:8000'

const getUserId = () => {
    // Check if window and localStorage are available
    if (
        typeof window !== "undefined" &&
        typeof window.localStorage !== "undefined"
    ) {
        return window.localStorage.getItem("userId");
    }
    return null; // Return null if localStorage is not available
};

// Export the userId constant
export const userId = getUserId();

////////////////////////////////// Sign Up Apis /////////////////////////////

export const signUpApi = new APIBase({
    baseURL: `${BASE_URL}/api/signup/`,
});

export const LogoutApi = new APIBase({
    baseURL: `${BASE_URL}/api/logout/`,
    tokenKey: "access_token",
    refreshTokenKey: "refresh_token",
    refreshURL: `${BASE_URL}/api/token/refresh/`,
});

export const loginApi = new APIBase({
    baseURL: `${BASE_URL}/api/token/`,
});

export const SiteSettingApi = new APIBase({
    baseURL: `${BASE_URL}/api/site-setting/`,
});

///////////////////////////////// Forms ////////////////////////////

// contact api
export const ContactApi = new APIBase({
    baseURL: `${BASE_URL}/api/contact/`,
});


// Faqs API
export const FaqApi = new APIBase({
    baseURL: `${BASE_URL}/api/faq/`,
});

////////////// Blogs ////////////////////////

export const BlogListApi = new APIBase({
    baseURL: `${BASE_URL}/api/blog/`,
});

export const BlogCategoryApi = new APIBase({
    baseURL: `${BASE_URL}/api/blog-category/`,
});

////////////////////// Case //////////////

export const CaseStudyListApi = new APIBase({
    baseURL: `${BASE_URL}/api/case-study/`,
});

export const testimonialAPI = new APIBase({
    baseURL: `${BASE_URL}/api/testimonial/`,
});
