// library for fetching data and exporting data here
import { trails } from '../data/locales';
const uri = process.env.mdbUrl;
const dbName = process.env.mdbName;
const dbColl = process.env.mdbColl;

export function getTrailData(idNum) {
    let trailData = '';
    for (let i = 0; i < trails.length; i++) {
        if (trails[i].id === idNum) {
            trailData = trails[i];
        }
    }
    return trailData;
}

export function getTrailIDs() {
    return trails.map((trail) => {
        return {
            params: {
                localeId: trail.id,
            },
        };
    });
}

export function getTrailDataDB(idNum) {
    let prom = new Promise((resolve, reject) => {
        const { MongoClient, ServerApiVersion } = require('mongodb');
        const client = new MongoClient(
            uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverApi: ServerApiVersion.v1
            });
    
        async function run() {
            try {
                const database = client.db(dbName);
                const locales = database.collection(dbColl);
                const query = { id: idNum };
                const locale = await locales.findOne(query);
                if (!locale) {
                    console.log('No document found.');
                    reject('Retrieval error. No documents found.');
                }
                // console.log(`Data received from MDB: \n${locale}`);
                // Why does this JSON parse -> stringify hack work to make the data useable?
                resolve(JSON.parse(JSON.stringify(locale)));
            } catch (err) {
                console.log(`Unable to retrieve data: ${err}`);
            } finally {
                await client.close();
            }
        }
        run().catch(console.dir);
    });

    return prom;
}