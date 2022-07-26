import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import styles from '../styles/template.module.css';
import Link from 'next/link';

export default function Template({ children, home }) {
    return (
        <div>
            <Head>
                {home && <title>Bike Casper - Home</title>}
                {home && <meta name="description" content="Discover mountain biking trails and conditions around Casper, Wyoming." />}
            </Head>
            <Script
                src="https://kit.fontawesome.com/00f2a344b9.js" 
                crossorigin="anonymous"
            />
            <header>
                {home ? (
                    <div className="site-header home">
                        <h1>Bike Casper</h1>
                        <p>Find info about local riding areas.</p>
                    </div>
                ) : (
                    <div className='site-header not-home'>
                        <h2>Bike Casper</h2>
                    </div>
                )}
            </header>
            <main>{children}</main>
            <footer>
                <p>Footer info goes here.</p>
            </footer>
        </div>
    );
}