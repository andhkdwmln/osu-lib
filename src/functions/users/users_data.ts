import fetch from "node-fetch";
import { load } from 'cheerio';

import { userId } from "./users_id";

export async function userData (username: string) {

    try {

        const uid = await userId(username);
        if (uid.status == 404) {

            return {
                status: 404,
                message: 'No data found.'
            }

        } else {

            const req = await fetch('https://osu.ppy.sh/users/' + uid.id);

            const res = await req.text();
            const $ = load(res);

            const det = $('body > div.osu-layout__section.osu-layout__section--full > div').attr('data-initial-data');

            return {
                status: 200,
                data: JSON.parse(`${det}`)
            }

        }
        
    } catch (err) {
        return err;
    }

}