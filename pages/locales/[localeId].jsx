import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Template from '../../components/template';
import DifIcon from '../../components/dificons';
import { getTrailDataDB, getTrailIDsDB } from '../../lib/all-locales';
import RodeIt from '../../components/rode-it';
import { processRiders } from '../../components/rode-it';
import DisplayConditions from '../../components/display-conditions';
import TrailWeather from '../../components/weather';
import Map from '../../components/trailforks-map';

export async function getStaticProps({ params }) {
  let trailData = await getTrailDataDB(params.localeId);
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
  // state lifted from <ReportConditions /> and <RodeIt />
  const [rodeSubmit, setRodeSubmit] = useState('not-submitted');
  const [condSubmit, setCondSubmit] = useState('not-submitted');

  const [riders, setRiders] = useState(null);
  const [condition, setCondition] = useState(null);
  const router = useRouter();
  const { localeId } = router.query;

  useEffect(() => {
    fetch(`/api/trail-condition?localeId=${localeId}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setCondition(response.conditions);
        setRiders(processRiders(response.ridereports));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condSubmit, rodeSubmit])

  return (
    <Template>
      <div className="container mt-4 mt-sm-5">
        <Head>
          <title>{trailData.name}</title>
          <meta name="description" content={`Get conditions and ride ${trailData.name} near Casper.`} />
        </Head>
        <div className="row mb-4">
          <div className="col-sm-6">
            <div className="trail-squiggle-container">
              <Image 
              src='/squiggle-red-locales.svg'
              alt='red squiggle'
              layout='responsive'
              width={450}
              height={30} />
            </div>

            <h1 className="locale-title">{trailData.name}</h1>            

            <p className='trail-description'>{trailData.description}</p>

            <div className="mt-3 mt-sm-4">
              <RodeIt
                rodeSubmit={rodeSubmit}
                setRodeSubmit={setRodeSubmit}
                riders={riders}
                pageID={localeId} />      
            </div>
            <div className="mt-4 mb-sm-0 mb-5">
              <p>
                <span className="trail-detail-type"><strong>Distance</strong></span>
                <span className="trail-detail">{trailData.distance}</span></p>
              <p>
                <span className="trail-detail-type"><strong>Elevation gain</strong></span>
                <span className="trail-detail">{trailData.elevation}</span></p>
              <p>
                <span className="trail-detail-type"><strong>Difficulty</strong></span>
                <span className="fs-5 trail-difficulty"><DifIcon difficulty={trailData.difficulty} /></span></p>
              <p>
                <span className="trail-detail-type"><strong>Notes</strong></span>
                {trailData.notes}</p>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="trail-image-container">
            <Image 
              src={`/${trailData.id}-cover.jpg`} 
              alt={trailData.name}
              width={960}
              height={540}
              layout='responsive' />              
            </div>
            <div className="map-container" id="map">
              <Map latlong={trailData.latlong} />
            </div>
          </div>
        </div>
      </div>
      <div className="conditions-container">
        <div className="container">
          <DisplayConditions 
          condSubmit={condSubmit}
          setCondSubmit={setCondSubmit}
          condition={condition} 
          localeId={localeId} />          
          <TrailWeather 
          latlong={trailData.latlong} />
        </div>
      </div>
      <div className="container">
        <div className="mt-4">&nbsp;</div>
        <div className="row mt-5 mb-3">
          <div className="col-md-12">
            <div className='back-to-trails'>
              <Link href="/">
                <a><i className="fa-solid fa-caret-left"></i> Back to all trails</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Template>
  );
}