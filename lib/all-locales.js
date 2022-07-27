// library for fetching data and exporting data here
import { trails } from '../data/locales';
const uri = process.env.mdbUrl;
const dbName = process.env.mdbName;
const dbColl = process.env.mdbColl;

export function getTrailIDsDB() {
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
                const query = {};
                const options = {
                    projection: {
                        _id: 0,
                        id: 1
                    }
                };
                const cursor = locales.find(query, options);
                const allTrails = await cursor.toArray();
                // console.log(`Trail IDs from MDB: \n${JSON.stringify(allTrails)}`);
                if (allTrails.length === 0) {
                    console.log('No document found.');
                    reject('Retrieval error. No documents found.');
                }                
                let trailIDs = allTrails.map((trail) => {
                    return {
                        params: {
                            localeId: trail.id,
                        },
                    };
                })
                // console.log(`Mapped Trail IDs:\n${JSON.stringify(trailIDs)}`);
                resolve(trailIDs);
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

export function getTrailBasicsDB() {
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
                const query = {};
                const options = {
                    projection: {
                        _id: 0,
                        id: 1,
                        name: 1,
                        difficulty: 1
                    }
                };
                const cursor = locales.find(query, options);
                const allTrailsData = await cursor.toArray();
                if (allTrailsData.length === 0) {
                    console.log('No document found.');
                    reject('Retrieval error. No documents found.');
                }                
                resolve(allTrailsData);
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