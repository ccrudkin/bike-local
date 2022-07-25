import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/template.module.css';
import Link from 'next/link';

export default function Template({ children, home }) {
    return (
        <div>
            <Head>
                <title>Dynamic title goes here</title>
                <meta 
                    name="description"
                    content="Dynamic information goes here."
                />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous" />
                <script src="https://kit.fontawesome.com/00f2a344b9.js" crossorigin="anonymous"></script>                
            </Head>
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