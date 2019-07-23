import React from 'react'
import {graphql} from 'gatsby'
import Img from 'gatsby-image'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import SEO from 'components/seo'
import {css} from '@emotion/core'
import Container from 'components/container'
import Layout from 'components/layout'
import Share from 'components/share'
import BlogPostFooter from 'components/blog-post-footer'
// import TestingCta from 'components/testing-cta'
// import {
//   WorkshopEventsProvider,
//   useWorkshopEvents,
// } from 'components/workshops/context'
import Markdown from 'react-markdown'
import {fonts} from '../lib/typography'
import config from '../../config/website'
import {bpMaxSM} from '../lib/breakpoints'
import get from 'lodash/get'
import logo from '../images/logo.png'
// import intersection from 'lodash/intersection'
// import flatMap from 'lodash/flatMap'
// import first from 'lodash/first'
// import UpcomingWorkshops from 'components/workshops/upcoming-workshops'
// import titleCase from 'ap-style-title-case'

// export default function PostPage(props) {
//   return (
//     <WorkshopEventsProvider>
//       <Post {...props} />
//     </WorkshopEventsProvider>
//   )
// }

export default function PostPage(props) {
  return <Post {...props} />
}

function Post({data: {site, mdx, dfBanner}, pageContext: {blogPath}}) {
  const {
    // isWriting,
    editLink,
    title,
    slug,
    date,
    description,
    banner,
    bannerCredit,
    noFooter,
    // keywords,
  } = mdx.fields

  // const {eventsByKeywords, isLoading: isLoadingEvents} = useWorkshopEvents({
  //   keywords,
  // });

  // const commonKeyword = first(
  //   intersection(flatMap(eventsByKeywords, event => event.keywords), keywords),
  // );

  const blogPostUrl = `${config.siteUrl}${slug}`

  const headerImage = (
    <img
      src={logo}
      alt="Jonas Bandi"
      css={css`
        position: absolute;
        //border-radius: 100%;
        margin-bottom: 0;
        max-width: 60px;
        //filter: invert(100%);
      `}
    />
  )

  // let blogPostBannerImagePath;
  let blogPostBannerImage
  if (banner) {
    // blogPostBannerImagePath = banner.childImageSharp.fluid.src;
    blogPostBannerImage = (
      <div
        css={css`
          text-align: center;

          p {
            margin-bottom: 0;
          }
          ${bpMaxSM} {
            padding: 0;
          }
        `}
      >
        <Img
          fluid={banner.childImageSharp.fluid}
          alt={site.siteMetadata.keywords.join(', ')}
        />
        {bannerCredit ? <Markdown>{bannerCredit}</Markdown> : null}
      </div>
    )
  } else {
    // blogPostBannerImagePath =   `/${defaultBanner}`;
    blogPostBannerImage = (
      <div
        css={css`
          text-align: center;
          p {
            margin-bottom: 0;
          }
          ${bpMaxSM} {
            padding: 0;
          }
        `}
      >
        <Img
          fluid={dfBanner.childImageSharp.fluid}
          style={{maxHeight: 300}}
          imgStyle={{objectFit: 'contain'}}
          alt={site.siteMetadata.keywords.join(', ')}
        />
      </div>
    )
  }
  // else if (blogId === 'DevLinks') {
  //   blogPostBannerImagePath = defaultDevLinksImage;
  // }

  // let defaultBanner;
  // if (!banner && blogId === 'DevLinks') {
  //   defaultBanner = defaultDevLinksImage;
  // }

  return (
    <Layout
      site={site}
      frontmatter={mdx.fields}
      headerLink={blogPath}
      noFooter={noFooter}
      headerImage={headerImage}
    >
      <SEO
        frontmatter={mdx.fields}
        metaImage={get(mdx, 'fields.banner.childImageSharp.fluid.src')}
        isBlogPost
      />
      <article
        css={css`
          width: 100%;
          display: flex;
          twitter-widget {
            margin-left: auto;
            margin-right: auto;
          }
        `}
      >
        <Container
          css={css`
            padding-top: 20px;
          `}
        >
          <h1
            css={css`
              text-align: center;
              margin-bottom: 20px;
              margin-top: 0;
              font-family: ${fonts.light};
            `}
          >
            {title}
          </h1>
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-bottom: 20px;
              h3,
              span {
                text-align: center;
                font-size: 15px;
                opacity: 0.6;
                font-family: ${fonts.regular}, sans-serif;
                font-weight: normal;
                margin: 0 5px;
              }
            `}
          >
            {date && <h3>{date}</h3>}
          </div>
          {/*{banner && (*/}
          {/*  <div*/}
          {/*    css={css`*/}
          {/*      text-align: center;*/}

          {/*      p {*/}
          {/*        margin-bottom: 0;*/}
          {/*      }*/}
          {/*      ${bpMaxSM} {*/}
          {/*        padding: 0;*/}
          {/*      }*/}
          {/*    `}*/}
          {/*  >*/}
          {/*    <Img*/}
          {/*      fluid={banner.childImageSharp.fluid}*/}
          {/*      alt={site.siteMetadata.keywords.join(', ')}*/}
          {/*    />*/}
          {/*    {bannerCredit ? <Markdown>{bannerCredit}</Markdown> : null}*/}
          {/*  </div>*/}
          {/*)}*/}
          {blogPostBannerImage}
          <br />
          <div
            css={css`
              text-align: center;
              font-size: larger;
            `}
          >
            {description ? <Markdown>{description}</Markdown> : null}
          </div>
          <MDXRenderer>{mdx.code.body}</MDXRenderer>
          <Container>
            <div
              css={css`
                text-align: center;
                font-size: smaller;
              `}
            >
              This post is originally published at{' '}
              <a href={blogPostUrl}>jonasbandi.net</a>.
            </div>
          </Container>
        </Container>
        {/* <SubscribeForm /> */}
      </article>

      <Container noVerticalPadding>
        <p css={{textAlign: 'right'}}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            // using mobile.twitter.com because if people haven't upgraded
            // to the new experience, the regular URL wont work for them
            href={`https://mobile.twitter.com/search?q=${encodeURIComponent(
              blogPostUrl,
            )}`}
          >
            Discuss on Twitter
          </a>
          <span css={{marginLeft: 10, marginRight: 10}}>{` • `}</span>
          <a target="_blank" rel="noopener noreferrer" href={editLink}>
            Edit post on GitHub
          </a>
        </p>
      </Container>

      <Container noVerticalPadding css={{marginBottom: 40}}>
        <Share
          url={blogPostUrl}
          title={title}
          twitterHandle={config.twitterHandle}
        />
      </Container>

      {/*{isLoadingEvents ? (*/}
      {/*  <div css={{textAlign: 'center'}}>*/}
      {/*    loading relevant upcoming workshops...*/}
      {/*  </div>*/}
      {/*) : isEmpty(eventsByKeywords) ? null : (*/}
      {/*  <div*/}
      {/*    css={css`*/}
      {/*      margin-top: 55px;*/}
      {/*      display: flex;*/}
      {/*      justify-content: center;*/}
      {/*    `}*/}
      {/*  >*/}
      {/*    <UpcomingWorkshops*/}
      {/*      headline={*/}
      {/*        commonKeyword*/}
      {/*          ? titleCase(`Upcoming ${commonKeyword} Workshops`)*/}
      {/*          : 'Upcoming Workshops'*/}
      {/*      }*/}
      {/*      events={eventsByKeywords}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{keywords.map(keyword => keyword.toLowerCase()).includes('testing') && (*/}
      {/*  <TestingCta />*/}
      {/*)}*/}
      <Container>
        <BlogPostFooter />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!, $defaultBannerImagePath: String) {
    site {
      siteMetadata {
        keywords
      }
    }
    mdx(fields: {id: {eq: $id}}) {
      fields {
        editLink
        title
        noFooter
        description
        plainTextDescription
        date(formatString: "MMMM DD, YYYY")
        author
        banner {
          ...bannerImage720
        }
        slug
      }
      code {
        body
      }
    }
    dfBanner: file(relativePath: {eq: $defaultBannerImagePath}) {
      childImageSharp {
        fluid(maxHeight: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
