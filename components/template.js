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
                        <div className='site-header home'>
                            <h1>Bike Casper</h1>
                            <p>Local info for mountain biking near Casper, Wyoming.</p>
                        </div>
                    ) : (
                        <div className='row site-header not-home'>
                            <div className="col-sm-6">
                            <h2>
                                <Link href="/">
                                    <a>Bike Casper</a>
                                </Link>
                            </h2>
                            </div>
                            <div className="col-sm-6 header-nav">
                                <Link href="/">
                                    <a>Trails List</a>
                                </Link>
                            </div>
                        </div>
                    )}
                </header>
                <main>{children}</main>                
            </div>
            <footer>
                <p>Support local! Visit one of Casper&lsquo;s bike shops, and consider joining the Central Wyoming Trails Association.</p>
                <p className="small">&copy; 2022</p>
            </footer>
        </div>
    );
}