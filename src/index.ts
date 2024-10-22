import { userId, userData, userRecentplay, userFirstplace, userBestplay } from './functions/index'; 

export class Osu {

    /* ================== Account ================== */

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

    /**
     * @param username The username of the user you want to get the recent play of.
     * @param mode The mode of the user you want to get the recent play of.
     * @returns The recent play of the user.
     * @description Mode: 0 = osu!, 1 = Taiko, 2 = Fruits, 3 = Mania
     */
    async userRecentPlay(username: string, mode: number) {
        return await userRecentplay(username, mode);
    }

    /**
     * @param username The username of the user you want to get the first place of.
     * @param mode The mode of the user you want to get the first place of.
     * @returns The first place achieved of the user.
     * @description Mode: 0 = osu!, 1 = Taiko, 2 = Fruits, 3 = Mania
     */
    async userFirstPlace(username: string, mode: number) {
        return await userFirstplace(username, mode);
    }

    /**
     * @param username The username of the user you want to get the best play of.
     * @param mode The mode of the user you want to get the best play of.
     * @returns The best play of the user.
     * @description Mode: 0 = osu!, 1 = Taiko, 2 = Fruits, 3 = Mania
     */
    async userBestPlay(username: string, mode: number) {
        return await userBestplay(username, mode);
    }

}