import * as request from "./utils/requester";

const baseUrl = 'http://localhost:3030/users';

export const login = (data) => 
   request.post(`${baseUrl}/login`, data);


export const logout = async (accessToken) => {

   try {
      const response = await fetch(`${baseUrl}/logout`, {
         method: 'GET',
         headers: {
            'X-Authorization': accessToken
         }
      });
   }  
   catch(err) {
      console.log(err)
   } 
};
   

export const register = (data) => 
   request.post(`${baseUrl}/register`, data)
