import * as request from "./utils/requester";

const baseUrl = 'http://localhost:3030/users';

export const login = (data) => 
   request.post(`${baseUrl}/login`, data);

export const logout = () => 
    request.get(`${baseUrl}/logout`)