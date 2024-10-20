import fetch from 'node-fetch';

import { userId } from './users_id';

export async function userRecentplay (username: string, mode: number) {

    try {

        let strmode;
        strmode = mode === 0 ? 'osu' : mode === 1 ? 'taiko' : mode === 2 ? 'fruits' : mode === 3 ? 'mania' : mode;


        const uid = await userId(username);
        if (uid.status == 404) {

            return {
                status: 404,
                message: 'No user found.'
            }

        } else {

            let result: any = [];
            for (let i = 5; i < 500000; i += 50) {

                const req = await fetch(`https://osu.ppy.sh/users/${uid.id}/scores/recent?mode=${strmode}&limit=51&offset=${i}`)
                const res = await req.json();
                // if res is empty, break the loop
                if (res.length === 0) break;

                for (let j = 0; j < res.length; j++) {

                    const arr = res[j];
                    result.push(arr);

                }

                await delay(2000);

            }
            
            if (result.length == 0) {

                return {
                    status: 404,
                    message: 'No recent plays.'
                }

            } else {

                return {
                    status: 200,
                    data: result
                }
                
            }

        }

    } catch (err) {
        return err;
    }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}