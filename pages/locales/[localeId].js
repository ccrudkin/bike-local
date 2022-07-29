import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Template from '../../components/template';
import DifIcon from '../../components/dificons';
import { getTrailDataDB, getTrailIDsDB } from '../../lib/all-locales';
import ReportConditions from '../../components/trail-conditions';
import { processConditions } from '../../components/trail-conditions';

export async function getStaticProps({ params }) {
    let trailData = await getTrailDataDB(params.localeId);
    // console.log(`Awaited trailData: ${JSON.stringify(trailData)}`);
    // trailData = JSON.parse(JSON.stringify(trailData));
    return { 
        props: {
            trailData
        },
    };
}

export async function getStaticPaths() {
    const paths = await getTrailIDsDB();
    return {
        paths,
        fallback: false
    }
}

export default function LocaleInfo({ trailData }) {
    // state lifted from <ReportConditions />
    const [condSubmit, setCondSubmit] = useState('not-submitted');

    const [condition, setCondition] = useState(null);
    const router = useRouter();
    const { localeId } = router.query;
    // console.log(`Locale ID captured: ${localeId}`);

    useEffect(() => {
        fetch(`/api/trail-condition?localeId=${localeId}` )
        .then((response) => {
            // console.log(response.status)
            return response.json();
        })
        .then((response) => {
            // console.log(response);
            setCondition(response);
        });
    }, [condSubmit])

    return (
        <Template>
            <div className="container">
                <Head>
                    <title>{trailData.name}</title>
                    <meta name="description" content={`Get conditions and ride ${trailData.name} near Casper.`} />
                </Head>
                <div className="row">
                    <div className="col-md-12">
                        <h1>{trailData.name}</h1>             
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-7">
                        <p>{trailData.description}</p>                           
                        <p>Difficulty: <span className="trail-detail"><DifIcon difficulty={trailData.difficulty} /></span></p>
                        <p>Trailhead: <span className="trail-detail">{trailData.latlong}</span></p>
                        {condition
                            ? <p>Most riders say the trail is: 
                                <span className="trail-detail">{processConditions(condition.conditions)}</span>
                            </p>
                            : <p><span className="loading-placeholder loading-text"></span></p>
                        }
                        <ReportConditions pageID={localeId} condSubmit={condSubmit} setCondSubmit={setCondSubmit} />
                    </div>                    
                    <div className="col-sm-5">
                        <div className="map-container">
                            <Image 
                                src={`/${trailData.map}`}
                                layout="responsive"
                                width={1000}
                                height={1000}
                                alt={`Map of ${trailData.name} trail.`}
                            />
                        </div>
                    </div>
                </div>
                <div className="row mt-3 mb-3">
                    <div className="col-md-12">
                        <p>
                            <Link href='/'>
                                <a><i className="fa-solid fa-circle-arrow-left"></i> Back to all trails</a>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>              
        </Template>
    );
}