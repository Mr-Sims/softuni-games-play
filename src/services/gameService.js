import * as request from "./utils/requester";

const baseUrl = 'http://localhost:3030/data/games';

export const getRecent = () => 
    request.get(`${baseUrl}?sortBy=_createdOn%20desc&distinct=category`);
                // .then(res => res.json())


export const getAll = () => 
    request.get(baseUrl);


export const getOne = (gameId) => 
    request.get(`${baseUrl}/${gameId}`);

export const create = (gameData) => 
    request.post(baseUrl, gameData);


export const edit = (gameId, gameData) => 
    request.put(`${baseUrl}/${gameId}`, gameData)

export const remove = (gameId) => 
    request.del(`${baseUrl}/${gameId}`);
