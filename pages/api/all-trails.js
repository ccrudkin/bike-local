const uri = process.env.mdbUrl;
const dbName = process.env.mdbName;
const dbColl = process.env.mdbColl;

export default async function handler(req, res) {
    if (req.method === 'GET') {
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
                        difficulty: 1,
                        distance: 1,
                        elevation: 1
                    }
                };
                const cursor = locales.find(query, options);
                const allTrailsData = await cursor.toArray();
                if (allTrailsData.length === 0) {
                    console.log('No document found.');
                    res.status(500).json({ message: 'No document found.' });
                }                
                res.status(200).json(allTrailsData);
            } catch (err) {
                console.log(`Unable to retrieve data: ${err}`);
            } finally {
                await client.close();
            }
        }
        run().catch(console.dir);
    } else {
        res.status(403);
    }
}