import fetch = require("node-fetch");

export async function userId (username: string) {

    try {

        const req = await fetch('https://osu.ppy.sh/u/' + username);
        const res = req.status;
        if (res === 200) {

            const url = req.url;
            const id = url.split('/').pop();
            
            return {
                status: 200,
                id: parseInt(`${id}`)
            }

        } else {

            return {
                status: 404,
                message: 'No user found.'
            }

        }

    } catch (err) {
        return err;
    }

}