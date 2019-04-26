import React from 'react'
import Container from 'components/container'
import SEO from 'components/seo'
// import Layout from 'components/layout'
// import BigHero from 'components/big-hero'
// import theme from '../../config/theme'
import Header from '../components/Header';

function MarkdownPage({children, pageContext: {frontmatter}}) {
  return (
    <>
      <SEO frontmatter={frontmatter}/>
      <Header/>
      <Container>{children}</Container>
    </>
  )
}

export default MarkdownPage
