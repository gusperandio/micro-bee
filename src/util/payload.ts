import { v4 as uuidv4 } from "uuid"


export const payload = (username: string) =>{
    return {
      uuid: uuidv4(),
      name: username,
      exp: Math.floor(Date.now() / 1000) + 1000 * 24 * 60 * 60,
    };
   
}