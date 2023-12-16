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


export async function getArticles() {
    const res = API.get('/statistics/articles/')
    return res
}

export async function getArticlesQ1() {
    const res = API.get('/statistics/articles/Q1')
    return res
}

export async function getArticlesQ2() {
    const res = API.get('/statistics/articles/Q2')
    return res
}

export async function getArticlesQ3() {
    const res = API.get('/statistics/articles/Q3')
    return res
}

export async function getArticlesQ4() {
    const res = API.get('/statistics/articles/Q4')
    return res
}

export async function geKeywords() {
    const res = API.get('/statistics/keywords')
    return res
}


export async function getJournals() {
    const res = API.get('/statistics/bestJournals')
    return res
}

export async function getYears() {
    const res = API.get('/statistics/years')
    return res
}

export async function getAuthors() {
    const res = API.get('/statistics/bestAuthor')
    return res
}