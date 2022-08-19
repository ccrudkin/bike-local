import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Template from '../components/template';
import styles from '../styles/Home.module.css';
import { getTrailBasicsDB } from '../lib/all-locales';
import DifIcon from '../components/dificons';
import { withRouter } from 'next/router';

// switch to API and load data after
export async function getStaticProps() {
    let allTrailsData = await getTrailBasicsDB();
    return { 
        props: {
            allTrailsData
        },
    };
}

export default function Home({ allTrailsData }) {
  // Should still static-generate most of the page for speed and SEO; look into docs
  // AND why is the API call running twice? Possibly because I'm in DEV mode.

  // const [allTrailsData, setTrailsData] = useState(null);

  // useEffect(() => {
  //   fetch('/api/all-trails')
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((response) => {
  //       setTrailsData(response);
  //     });
  // }, [])

  return (
    <Template home>
      <Head />
      <div className="home-container">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="mt-5"></div>
              <div className="row">
                {allTrailsData
                  ? allTrailsData.map(({ id, name, difficulty, distance, elevation }) => (
                    <div className='col-sm-6 col-lg-4' key={id}>
                      <div className="trail-square">
                        <div className="trail-photo">
                          <Image 
                            src={`/${id}-cover.jpg`} 
                            alt={name}
                            width={960}
                            height={540}
                            layout='responsive' />
                        </div>
                        <div className="trail-name">
                          <Link href={`/locales/${id}`}>
                            {name}
                          </Link>                          
                          <div className="trail-difficulty">
                            <DifIcon difficulty={difficulty} />
                          </div>
                        </div>
                        <div className="all-trails-details">
                          {distance} / {elevation} <i className="fa-solid fa-arrow-up"></i>
                        </div>
                      </div>
                    </div>
                  ))
                  : [...Array(5)].map((elem, index) => (
                    <div className='col-sm-6 col-lg-4' key={id}>
                      <span className='loading-placeholder dk-load loading-md'></span>
                      <br />
                      <span className='loading-placeholder dk-load loading-sm'></span>
                    </div>
                  ))
                }
                {
                  allTrailsData
                  ? <div className="col-sm-6 col-lg-4">
                      <div className="trail-square local-square">
                        <h3>Support<br />Local!</h3>
                        <hr />
                        <p>Visit one of Casper‘s bike shops, and consider joining the Central Wyoming Trails Alliance.</p>
                      </div>
                    </div>
                  : <div className='col-sm-6 col-lg-4'>
                      <span className='loading-placeholder dk-load loading-md'></span>
                      <br />
                      <span className='loading-placeholder dk-load loading-sm'></span>
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </Template>
  )
}