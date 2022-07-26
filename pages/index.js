import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Template from '../components/template';
import styles from '../styles/Home.module.css';
import { trails } from '../data/locales';
import DifIcon from '../components/dificons';

export function getStaticProps() {
    const allTrailsData = trails;
    return { 
        props: {
            allTrailsData,
        },
    };
}

export default function Home({ allTrailsData }) {
    return (
        <Template home>
            <Head />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="mt-3"></div>
                        <h2>Get information on:</h2>
                        <ul className='locales-list'>
                            {
                                allTrailsData.map(({ id, name, difficulty }) => (
                                    <li key={id}>
                                        <Link href={`/locales/${id}`}>
                                            {name}                                            
                                        </Link>
                                        <br />
                                        <DifIcon difficulty={difficulty} />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>                
            </div>
        </Template>
    )
}
