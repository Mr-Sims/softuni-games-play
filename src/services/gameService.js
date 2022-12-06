import * as request from "./utils/requester";

const baseUrl = 'http://localhost:3030';

export const getRecent = () => {
    return request.get(`${baseUrl}/data/games?sortBy=_createdOn%20desc&distinct=category`)
                // .then(res => res.json())
}

export const getAll = () => {
    return request.get(`${baseUrl}/data/games?sortBy=_createdOn%20desc`)
                // .then(res => res.json())
}