import React from 'react'
import {graphql} from 'gatsby'
import Img from 'gatsby-image'
import {css} from '@emotion/core'
import Container from '../components/Container'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Link from '../components/Link'
import {bpMaxSM} from '../lib/breakpoints'
import theme from '../../config/theme'
// import defaultDevLinksImage from '../images/devlinks.png'

// const {generatePathForDevlink} = require('../pathFactory');

const Blog = ({
  data: {site, allMdx},
  // pageContext: {pagination, categories},
  pageContext: {pagination},
}) => {
  const {page, nextPagePath, previousPagePath} = pagination

  const posts = page
    .map(id =>
      allMdx.edges.find(
        edge =>
          edge.node.id === id &&
          edge.node.parent.sourceInstanceName !== 'pages',
      ),
    )
    .filter(post => post !== undefined)

  return (
    <Layout site={site} headerColor={theme.colors.white}>
      <SEO />
      <Container noVerticalPadding>
        {posts.map(({node: post}) => {
          // const pagePath = generatePathForDevlink(post);
          const pagePath = post.fields.slug

          return (
            <div
              key={post.id}
              css={css`
                :not(:first-of-type) {
                  margin-top: 20px;
                  ${bpMaxSM} {
                    margin-top: 20px;
                  }
                }
                :first-of-type {
                  margin-top: 20px;
                  ${bpMaxSM} {
                    margin-top: 20px;
                  }
                }
                .gatsby-image-wrapper {
                }
                background: white;
                padding: 40px;
                ${bpMaxSM} {
                  padding: 20px;
                }
                display: flex;
                flex-direction: column;
              `}
            >
              {post.frontmatter.banner && (
                <div
                  css={css`
                    padding-bottom: 10px;
                    ${bpMaxSM} {
                      padding: 20px;
                    }
                  `}
                >
                  <Link
                    aria-label={`View ${post.frontmatter.title} article`}
                    to={pagePath}
                  >
                    <Img
                      sizes={post.frontmatter.banner.childImageSharp.fluid}
                    />
                  </Link>
                </div>
              )}
              {/*{!post.frontmatter.banner && (*/}
              {/*  <img src={defaultDevLinksImage}/>*/}
              {/*)}*/}
              <h2
                css={css`
                  margin-top: 30px;
                  margin-bottom: 10px;
                `}
              >
                <Link
                  aria-label={`View ${post.frontmatter.title} article`}
                  to={pagePath}
                >
                  {post.frontmatter.title}
                </Link>
              </h2>
              <small>{post.frontmatter.date}</small>
              <p
                css={css`
                  margin-top: 10px;
                `}
              >
                {/*{post.excerpt}*/}
                Topics: {post.fields.description}
              </p>{' '}
              <Link
                to={pagePath}
                aria-label={`view "${post.frontmatter.title}" article`}
              >
                Read Article →
              </Link>
            </div>
          )
        })}
        <br />
        <br />
        <div>
          {nextPagePath && (
            <Link to={nextPagePath} aria-label="View next page">
              Next Page →
            </Link>
          )}
          {previousPagePath && (
            <Link to={previousPagePath} aria-label="View previous page">
              ← Previous Page
            </Link>
          )}
        </div>
        <hr
          css={css`
            margin: 50px 0;
          `}
        />
      </Container>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    allMdx(sort: {fields: [frontmatter___date], order: DESC}) {
      edges {
        node {
          fileAbsolutePath
          excerpt(pruneLength: 300)
          id
          fields {
            title
            slug
            date
            description
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            banner {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            slug
          }
        }
      }
    }
  }
`
