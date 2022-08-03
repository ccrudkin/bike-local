// prototype for custom-fetching TrailForks map; currently using widget instead

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const params = 'rid=11974&width=600&height=400&activitytype=1'
        let headers = new Headers();
        
        fetch('https://www.trailforks.com/widgets/region_map/?' + params, { 
            method: 'GET',
            headers: headers
        })
        .then((response) => {
            console.log(response);
            res.status(200);
        });
    } else {
        res.status(403);
    }
}