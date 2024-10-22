import fetch from 'node-fetch';
import { load } from 'cheerio';

export async function rankByperformance (mode: number = 0, country: string = 'all', variant: number = 0) {

    try {

        let strmode;
        strmode = mode === 0 ? 'osu' : mode === 1 ? 'taiko' : mode === 2 ? 'fruits' : mode === 3 ? 'mania' : 'osu';

        let strVar;
        strVar = variant === 0 ? 'all' : variant === 1 ? '4k' : variant === 2 ? '7k' : 'all';

        const req = await fetch(`https://osu.ppy.sh/rankings/${strmode}/performance?country=${country}&variant=${strVar}`);
        const res = await req.text();

        const $ = load(res);

        const length = $('body > div.osu-layout__section.osu-layout__section--full > div.osu-page.osu-page--generic > div.ranking-page > table > tbody > tr').length;
        
        if(length == 0) {

            return {
                status: 404,
                message: 'No data found.',
            }
        } else {

            const result = [];
            for(let i = 1; i <= length; i++) {

                let rank = $('body > div.osu-layout__section.osu-layout__section--full > div.osu-page.osu-page--generic > div.ranking-page > table > tbody > tr:nth-child(' + i + ') > td.ranking-page-table__column.ranking-page-table__column--rank').text().trim().replace(/#/g, '');
                let user = $('#scores > div > table > tbody > tr:nth-child('+i+') > td:nth-child(2) > div > a.ranking-page-table__user-link-text.js-usercard').text().trim();
                let country = $('#scores > div > table > tbody > tr:nth-child('+i+') > td:nth-child(2) > div > a:nth-child(1) > span').attr('title');
                let accuracy = $('#scores > div > table > tbody > tr:nth-child('+i+') > td:nth-child(3)').text().trim();
                let playcount = $('#scores > div > table > tbody > tr:nth-child('+i+') > td:nth-child(4)').text().trim().replace(/,/g, '');
                let performance = $('#scores > div > table > tbody > tr:nth-child('+i+') > td.ranking-page-table__column.ranking-page-table__column--focused').text().trim().replace(/,/g, '');
                let ss = $('#scores > div > table > tbody > tr:nth-child('+i+') > td:nth-child(6)').text().trim();
                let s = $('#scores > div > table > tbody > tr:nth-child('+i+') > td:nth-child(7)').text().trim();
                let a = $('#scores > div > table > tbody > tr:nth-child('+i+') > td:nth-child(8)').text().trim();
            
                result.push({
                    rank: parseInt(rank),
                    user: user,
                    country: country,
                    accuracy: accuracy,
                    playcount: parseInt(playcount),
                    performance: parseInt(performance),
                    ss: parseInt(ss),
                    s: parseInt(s),
                    a: parseInt(a)
                });

            }

            return {
                status: 200,
                data: result,
                url: req.url
            }
        }
        
    } catch (err) {
        return err;
    }

}

export async function codeCountry () {

    try {

        const req = await fetch(`https://osu.ppy.sh/rankings/osu/performance`);
        const res = await req.text();

        const $ = load(res);

        // get all country code from <script> tag and id = json-country-filter
        const json = $('script#json-country-filter').text();

        return {
            status: 200,
            data: JSON.parse(json).items
        }
        
    } catch (e) {
        return e;
    }

};