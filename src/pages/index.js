import React from 'react'
// import { graphql } from 'gatsby'
// import { css } from '@emotion/core'
// import styled from '@emotion/styled'
// import Layout from '../components/Layout'
// import Link from '../components/Link'
// import Container from 'components/Container'
// import { rhythm } from '../lib/typography'
// import theme from '../../config/theme'
import Helmet from 'react-helmet';
import config from '../../config/website';
import '../static/index/personal.css';
import twitterLogo from '../static/index/twitter2.png';
import mediumLogo from '../static/index/medium.svg';
import linkedinLogo from '../static/index/linkedin.svg';
import xingLogo from '../static/index/xing.png';
import cvLogo from '../static/index/cv.png';
import facebookLogo from '../static/index/facebook.png';
import flickrLogo from '../static/index/flickr.png';
import youtubeLogo from '../static/index/youtube.png';
import signatureImg from '../static/index/signature7.png';


export default function Index() {
  return (
    <div>
      <Helmet
        title={config.siteTitle}
        meta={[
          {name: 'viewport', content: "width=device-width, initial-scale=1.0"},
          // { name: 'description', content: description },
          // { name: 'keywords', content: keywords },
        ]}
      >
        <html lang="en"/>
        {/*<link href=homeCSS rel="stylesheet" type="text/css" />*/}
        <link href='https://fonts.googleapis.com/css?family=Yanone+Kaffeesatz:700,400,300' rel='stylesheet' type='text/css'/>
        <link href={'images/favicon.png'} rel="SHORTCUT ICON"/>
        <noscript>This site runs best with JavaScript enabled.</noscript>
      </Helmet>


      <h1 className="title">Jonas Bandi</h1>
      <h2 className="title">Enthusiastic Software Professional</h2>
      <h2 className="title">Freelance Developer</h2>
      <h2 className="title">Trainer & Speaker</h2>

      <div id="motto">
        <p>I am passionate about technology and methodologies - always trying to learn, improve and share
          knowledge. </p>
      </div>
      <div id="biografie">
        <p>Freelance developer with more than 15 years experience in enterprise application development.</p>
        <p>Teacher at the university of applied sciences in Bern.</p>
        <p><a href="https://www.ivorycode.com/#schulung">Teaching courses and workshops.</a></p>
      </div>

      <div id="links">
        <a href="https://medium.jonasbandi.net"><img src={mediumLogo} alt="RSS-Feed"/></a>
        <a href="https://twitter.com/jbandi"><img src={twitterLogo} alt="Twitter" title="Twitter"/></a>
        <a href="https://www.linkedin.com/in/jonasbandi/"><img src={linkedinLogo} alt="LinkedIn"/></a>
        <a href="https://www.xing.com/profile/Jonas_Bandi"><img src={xingLogo} alt="Xing"/></a>
        <a href="https://jbandi.github.io/cv/cv_en.htm"><img src={cvLogo} alt="CV"/></a>
        <a href="https://www.facebook.com/jonas.bandi"><img src={facebookLogo} alt="Facebook"/></a>
        <a href="https://www.flickr.com/jbandi"><img src={flickrLogo} alt="Flickr"/></a>
        <a href="https://www.youtube.com/user/jonasbandi"><img src={youtubeLogo} alt="YouTube"/></a>
      </div>

      <div id="logo">
        <img src={signatureImg} alt="Jonas Bandi"/>
      </div>
    </div>
  )
}

