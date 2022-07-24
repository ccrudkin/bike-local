import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bike Casper</title>
        <meta name="description" content="Get trail information, conditions, weather, and more for mountain-bike trails in the Casper, Wyoming area." />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous" />
      </Head>

      <main className={styles.main}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>
                Welcome to Bike Casper!
              </h1>
              <p className="lead">Find info about local riding areas here.</p>
              <div className="mt-5"></div>
              <h2>Get information on:</h2>
              <ul>
                <li>dynamically generated list item 1</li>
                <li>dynamically generated list item 2</li>
                <li>dynamically generated list item 3</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
