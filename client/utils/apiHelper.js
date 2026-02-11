//Helper function to make internal api calls more consistent and less verbose

export const api = (
    path, 
    method = "GET", 
    body = null, 
    credentials = null) => {
    
    const url = "https://react-rest-api-library-production.up.railway.app:5000/api/" + path;
    const options = {
        method,
        headers: {},
    };

    if (body) {
        options.body = JSON.stringify(body);
        options.headers["Content-Type"] = "application/json; charset=utf-8";
    }

    if (credentials) {
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
        options.headers.Authorization = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);

}

export default api;