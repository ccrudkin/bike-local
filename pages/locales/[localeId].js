import Template from '../../components/template';
import Head from 'next/head';
import { getTrailData, getTrailIDs } from '../../lib/all-locales';

// this is where we'll fetch data
export function getStaticProps({ params }) {
    const trailData = getTrailData(params.localeId);
    console.log(`Trail data from getStaticProps: ${trailData}`);
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


// NEXT UP: use the dynamic info imported above to fill in the fields below
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
                        <p>{trailData.description}</p>                    
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h2>{trailData.map}</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p className="black-diamond">Difficulty: {trailData.difficulty}</p>
                        <p>Trailhead: {trailData.latlong}</p>
                        <p>Conditions: {trailData.info.conditions}</p>
                    </div>
                </div>
            </div>              
        </Template>
    );
}