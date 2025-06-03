// const url = ''
// const options = {

// };

// fetch(url,options)
//     .then()
//     .then()
//     .catch();

export const api_Config = {
    base_url: 'https://palworldapi.azurewebsites.net/v1',
    // API_KEY: process.env.EXPO_PUBLIC_API_KEY
    headers: {
        accept: 'application/json',
        // Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`
    }

}

export const fetchPals = async ({query}: {query:string}) => {
    const endpoint = query
        ? `${api_Config.base_url}/pals?query=${encodeURIComponent(query)}`
        : `${api_Config.base_url}/pals/?page=1&limit=200`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: api_Config.headers,

    });

    if(!response.ok){
        throw new Error("Failed to fetch pals");
        
    }

    const data = await response.json();
    return data.results;

}