import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Template from '../../components/template';
import DifIcon from '../../components/dificons';
import { getTrailData, getTrailIDs } from '../../lib/all-locales';
import ReportConditions from '../../components/trail-conditions';
import { getCurrentConditions } from '../../components/trail-conditions';

// this is where we'll fetch data
export function getStaticProps({ params }) {
    const trailData = getTrailData(params.localeId);
    return { 
        props: {
            trailData,
        },
    };
}

export function getStaticPaths() {
    const paths = getTrailIDs();
    return {
        paths,
        fallback: false
    }
}

export default function LocaleInfo({ trailData }) {
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
                        <p>Most reports say the trail condition is: <span className="trail-detail">{getCurrentConditions(trailData.id).replace(/-/, ' ')}</span></p>
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