import { userId, userData } from './functions/index'; 

export class Osu {

    /**
     * @param username The username of the user you want to get the ID of.
     * @returns The ID of the user.
     * @description Get the ID of a user by their username.
     */
    async userId(username: string) {
        return await userId(username);
    }

    /**
     * @param username The username of the user you want to get the account info of.
     * @returns The Info of users account.
     * @description Get the info of user by their username.
     */

    async userData(username: string) {
        return await userData(username);
    }

}