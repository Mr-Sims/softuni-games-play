import * as request from "./utils/requester";

const baseUrl = 'http://localhost:3030/data/games';

export const getRecent = () => {
    return request.get(`${baseUrl}?sortBy=_createdOn%20desc&distinct=category`)
                // .then(res => res.json())
}

export const getAll = () => {
    // return request.get(`${baseUrl}?sortBy=_createdOn%20desc`)
    return request.get(baseUrl)

                // .then(res => res.json())
}

export const create = (gameData) => {
    return request.post(baseUrl, gameData)
}