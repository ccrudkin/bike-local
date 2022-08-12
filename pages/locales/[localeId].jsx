import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
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
      <div className="container mt-5">
        <Head>
          <title>{trailData.name}</title>
          <meta name="description" content={`Get conditions and ride ${trailData.name} near Casper.`} />
        </Head>
        <div className="row">
          <div className="col-md-12">
            <h1>{trailData.name}</h1>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-sm-6">
            <p>{trailData.description}</p>

            <div className="row mt-4 mt-sm-5">
              <div className="col-sm-7 order-2 order-sm-1">
                <p><strong>Distance:</strong> <span className="trail-detail">{trailData.distance}</span></p>
                <p><strong>Elevation gain:</strong> <span className="trail-detail">{trailData.elevation}</span></p>
                <p><strong>Difficulty:</strong> <span className="ms-2 fs-5"><DifIcon difficulty={trailData.difficulty} /></span></p>
                <p><strong><i className="fa-solid fa-circle-info"></i> Other notes:</strong><br />{trailData.notes}</p>
              </div>
              <div className="col-sm-5 order-1 order-sm-2">
                <RodeIt
                  rodeSubmit={rodeSubmit}
                  setRodeSubmit={setRodeSubmit}
                  riders={riders}
                  pageID={localeId} />
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="map-container" id="map">
              <Map latlong={trailData.latlong} />
            </div>
          </div>
        </div>
        <TrailWeather 
        latlong={trailData.latlong} />
        <DisplayConditions 
          condSubmit={condSubmit}
          setCondSubmit={setCondSubmit}
          condition={condition} 
          localeId={localeId} />
        <div className="mt-4">&nbsp;</div>
        <div className="row mt-5 mb-3">
          <div className="col-md-12">
            <p>
              <Link href="/">
                <a><i className="fa-solid fa-circle-arrow-left"></i> Back to all trails</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Template>
  );
}