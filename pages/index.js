import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Template from '../components/template';
import styles from '../styles/Home.module.css';
// import { getTrailBasicsDB } from '../lib/all-locales';
import DifIcon from '../components/dificons';

// swith to API and load data after
// export async function getServerSideProps() {
//     let allTrailsData = await getTrailBasicsDB();
//     return { 
//         props: {
//             allTrailsData
//         },
//     };
// }

export default function Home() {
    // next up: experiment with getting data with the effect hook and loading it after initial render
    // this will probably be accomplished via the API feature
    // query an API endpoint; API queries MDB; API sends data back to fill in

    const [trailsLoaded, setTrailsLoaded] = useState(false);
    const [allTrailsData, setTrailsData] = useState('');

    useEffect(() => {
        fetch('/api/all-trails-non-prom')
        .then((response) => {
            console.log(response.status)
            return response.json();
        })
        .then((trailsData) => {
            console.log(trailsData);
            setTrailsData(trailsData);
            setTrailsLoaded(true);
        });
    }, [])

    return (
        <Template home>
            <Head />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="mt-3"></div>
                        <h2>Get information on:</h2>
                        <ul className='locales-list'>
                            { trailsLoaded 
                                ? allTrailsData.map(({ id, name, difficulty }) => (
                                    <li key={id}>
                                        <Link href={`/locales/${id}`}>
                                            {name}                                            
                                        </Link>
                                        <br />
                                        <DifIcon difficulty={difficulty} />
                                    </li>
                                ))
                                : <li>
                                    <span>Loading...</span>
                                    <br />
                                    <span>Loading...</span>
                                </li>
                            }
                        </ul>
                    </div>
                </div>                
            </div>
        </Template>
    )
}
