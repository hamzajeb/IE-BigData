import API from "./BaseURL";


const config = {
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    }
}

const configJson = {
    headers: {
        'content-type': 'application/json'
    }
}



export async function getStaics() {
    const res = API.get('/statistics/count/')
    return res
}