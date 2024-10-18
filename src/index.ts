import { userId } from './functions/index'; 

export class Osu {

    /**
     * @param username The username of the user you want to get the ID of.
     * @returns The ID of the user.
     * @description Get the ID of a user by their username.
     */
    async userId(username: string) {
        return await userId(username);
    }

}