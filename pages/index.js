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
    // Should still static-generate most of the page for speed and SEO; look into docs
    // AND why is the API call running twice? Possibly because I'm in DEV mode.

    const [allTrailsData, setTrailsData] = useState(null);

    useEffect(() => {
        fetch('/api/all-trails')
        .then((response) => {
            // console.log(response.status)
            return response.json();
        })
        .then((response) => {
            console.log(response);
            setTrailsData(response);
        });
    }, [])

    return (
        <Template home>
            <Head />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="mt-3"></div>
                        <h2>Casper-area Trails</h2>
                        <ul className='locales-list'>
                            { allTrailsData 
                                ? allTrailsData.map(({ id, name, difficulty, distance, elevation }) => (
                                    <li key={id}>
                                        <Link href={`/locales/${id}`}>
                                            {name}                                            
                                        </Link>
                                        <br />
                                        <span className="all-trails-details">
                                            {distance} / {elevation} <i className="fa-solid fa-arrow-up"></i>
                                        </span> <DifIcon difficulty={difficulty} />
                                    </li>
                                ))
                                : [...Array(3)].map((elem, index) => (
                                    <li key={index}>
                                        <span className='loading-placeholder loading-md'></span>
                                        <br />
                                        <span className='loading-placeholder loading-sm'></span>
                                    </li>
                                )) 
                            }
                        </ul>
                    </div>
                </div>                
            </div>
        </Template>
    )
}
