export const API_URL = "http://localhost:8000/";
export const AUTH_HEADER = (token) => {
    return {
        'headers': { 'Authorization': "Token " + token }
    };
};