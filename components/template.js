import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import styles from '../styles/template.module.css';
import Link from 'next/link';

export default function Template({ children, home }) {
  return (
    <div className={styles.outer}>
      <Head>
        {home && <title>Bike Casper - Home</title>}
        {home && <meta name="description" content="Discover mountain biking trails and conditions around Casper, Wyoming." />}
      </Head>
      <Script
        src="https://kit.fontawesome.com/00f2a344b9.js"
        crossorigin="anonymous"
      />
      <div className='flex-section-container'>
        <header>
          {home ? (
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className='site-header home'>
                    <div className="site-title">
                      <Image 
                      src='/bike-casper-logo.svg'
                      alt='Bike Casper'
                      width={349}
                      height={152} />
                    </div>
                    <div className="site-description">
                      <p>Up-to-date local info for mountain biking near Casper, Wyoming.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="site-header not-home">
                    <div className="site-title">
                      <Link href="/">
                        <a>
                          <Image 
                          src='/bike-casper-logo.svg'
                          alt='Bike Casper'
                          width={349}
                          height={152} />
                        </a>
                      </Link>                  
                    </div>
                    <div className="site-description">
                      <p>Up-to-date local info for mountain biking near Casper, Wyoming.</p>
                    </div>
                  </div>
                </div>
              </div>              
            </div>
          )}
        </header>
        <main>{children}</main>
      </div>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p>
                <span className="text-nowrap">BIKE LOCAL / CASPER.</span>&ensp;
                <span className="text-nowrap">&copy; 2022 Collin Rudkin.</span>&ensp;
                <span className="text-nowrap">Design by Sarah Rudkin.</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}