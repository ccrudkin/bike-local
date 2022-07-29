const uri = process.env.mdbUrl;
const dbName = process.env.mdbName;
const dbColl = process.env.mdbColl;

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // console.log(`Req query: ${JSON.stringify(req.query.localeId)}`);
        const idNum = req.query.localeId;

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
                const options = {
                    projection: {
                        _id: 0,
                        id: 1,
                        conditions: 1,
                        ridereports: 1
                    }
                };
                const locale = await locales.findOne(query, options);
                // console.log(`Data received from MDB:\n${JSON.stringify(locale)}`);
                // vvv This does not catch an empty object
                if (Object.keys(locale).length === 0) {
                    console.log('No document found.');
                    res.status(500).json({ message: 'No document found.' });
                }           
                res.status(200).json(JSON.parse(JSON.stringify(locale)));
            } catch (err) {
                console.log(`Unable to retrieve data: ${err}`);
            } finally {
                await client.close();
            }
        }
        run().catch(console.dir);        
    } else if (req.method === 'POST') {
        const idNum = req.query.localeId;
        const condition = req.query.condReport;
        console.log(`Condition reported: ${condition}`);

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
                const conditionString = `conditions.${condition}`;
                const update = {
                    '$push': { 
                        [conditionString]: Date()
                     }
                }
                let result = await locales.updateOne(query, update);
                // console.log(`Data received from MDB:\n${JSON.stringify(locale)}`);
                // vvv This does not catch an empty object
                if (result.modifiedCount === 0) {
                    console.log('Update not performed.');
                    res.status(500).json({ message: 'Update not performed.' });
                }           
                res.status(200).json(result);
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