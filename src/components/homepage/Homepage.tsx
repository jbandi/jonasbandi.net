import React from 'react'
import Helmet from 'react-helmet'
import config from '../../../config/website'
import styles from './Homepage.module.scss'
import twitterLogo from './assets/twitter2.png'
import mediumLogo from './assets/medium.svg'
import linkedinLogo from './assets/linkedin.svg'
import xingLogo from './assets/xing.png'
import cvLogo from './assets/cv.png'
import facebookLogo from './assets/facebook.png'
import flickrLogo from './assets/flickr.png'
import youtubeLogo from './assets/youtube.png'
import signatureImg from './assets/signature7.png'

export function Homepage() {
  return (
    <div id="test">
      <Helmet
        title={config.siteTitle}
        meta={[
          {name: 'viewport', content: 'width=device-width, initial-scale=1.0'},
          // { name: 'description', content: description },
          // { name: 'keywords', content: keywords },
        ]}
      >
        <html lang="en" />
        {/*<link href=homeCSS rel="stylesheet" type="text/css" />*/}
        <link
          href="https://fonts.googleapis.com/css?family=Yanone+Kaffeesatz:700,400,300"
          rel="stylesheet"
          type="text/css"
        />
        <link href={'images/favicon.png'} rel="SHORTCUT ICON" />
        <noscript>This site runs best with JavaScript enabled.</noscript>
        <body className={styles.body} />
      </Helmet>
      <h1 className={styles.title}>Jonas Bandi</h1>
      <h2 className={styles.subtitle}>Enthusiastic Software Professional</h2>
      <h2 className={styles.subtitle}>Freelance Developer</h2>
      <h2 className={styles.subtitle}>Trainer & Speaker</h2>
      <div className={`${styles.tagline} ${styles.motto}`}>
        <p>
          I am passionate about technology and methodologies - always trying to
          learn, improve and share knowledge.{' '}
        </p>
      </div>
      `
      <div className={`${styles.tagline} ${styles.biografie}`}>
        <p>
          Freelance developer with more than 15 years experience in enterprise
          application development.
        </p>
        <p>Teacher at the university of applied sciences in Bern.</p>
        <p>
          <a href="https://www.ivorycode.com/#schulung">
            Teaching courses and workshops.
          </a>
        </p>
      </div>
      <div className={styles.links}>
        <a href="https://medium.jonasbandi.net">
          <img src={mediumLogo} alt="RSS-Feed" />
        </a>
        <a href="https://twitter.com/jbandi">
          <img src={twitterLogo} alt="Twitter" title="Twitter" />
        </a>
        <a href="https://www.linkedin.com/in/jonasbandi/">
          <img src={linkedinLogo} alt="LinkedIn" />
        </a>
        <a href="https://www.xing.com/profile/Jonas_Bandi">
          <img src={xingLogo} alt="Xing" />
        </a>
        <a href="https://jbandi.github.io/cv/cv_en.htm">
          <img src={cvLogo} alt="CV" />
        </a>
        <a href="https://www.facebook.com/jonas.bandi">
          <img src={facebookLogo} alt="Facebook" />
        </a>
        <a href="https://www.flickr.com/jbandi">
          <img src={flickrLogo} alt="Flickr" />
        </a>
        <a href="https://www.youtube.com/user/jonasbandi">
          <img src={youtubeLogo} alt="YouTube" />
        </a>
      </div>
      <div className={styles.signature}>
        <img src={signatureImg} alt="Jonas Bandi" />
      </div>
    </div>
  )
}
