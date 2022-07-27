import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Template from '../../components/template';
import DifIcon from '../../components/dificons';
import { getTrailDataDB, getTrailIDs } from '../../lib/all-locales';
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
    const paths = getTrailIDs();
    return {
        paths,
        fallback: false
    }
}

export default function LocaleInfo({ trailData }) {
    // console.log(`Trail data from LocaleInfo: \n${JSON.stringify(trailData)}`);
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
                        <p>Most riders say the trail condition is: <span className="trail-detail">{processConditions(trailData.conditions)}</span></p>
                        <ReportConditions />
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