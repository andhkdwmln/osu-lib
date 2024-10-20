import fetch from 'node-fetch';

import { userId } from './users_id';

export async function userBestplay (username: string, mode: number) {

    try {

        let strmode;
        strmode = mode === 0 ? 'osu' : mode === 1 ? 'taiko' : mode === 2 ? 'fruits' : mode === 3 ? 'mania' : mode;

        const uid = await userId(username);
        if (uid.status == 404) {

            return {
                status: 400,
                message: 'No user found.'
            }

        } else {

            const req = await fetch(`https://osu.ppy.sh/users/${uid.id}/scores/best?mode=${strmode}&limit=100`);
            const res = await req.json();

            let replayId: any = [];
            for (let i = 0; i < res.length; i++) {

                const repId = await res[i];

                replayId.push(repId);

            }

            if (replayId.length == 0) {

                return {
                    status: 404,
                    message: 'No best play data.'
                }

            } else {

                return {
                    status: 200,
                    data: replayId
                }
                
            }

        }

    } catch (err) {
        return err;
    }
}