const path = require('path')

const _ = require('lodash')
const paginate = require('gatsby-awesome-pagination')

const { createFilePath } = require('gatsby-source-filesystem')

const PAGINATION_OFFSET = 7

const createPosts = (createPage, createRedirect, edges) => {
  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node
    const next = i === edges.length - 1 ? null : edges[i + 1].node
    const pagePath = node.fields.slug

    if (node.fields.redirects) {
      node.fields.redirects.forEach(fromPath => {
        createRedirect({
          fromPath,
          toPath: pagePath,
          redirectInBrowser: true,
          isPermanent: true,
        })
      })
    }

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        id: node.id,
        prev,
        next,
      },
    })
  })
}

exports.createPages = ({ actions, graphql }) =>
  graphql(`
    fragment PostDetails on Mdx {
      fileAbsolutePath
      id
      parent {
        ... on File {
          name
          sourceInstanceName
        }
      }
      excerpt(pruneLength: 250)
      fields {
        title
        slug
        description
        date
        redirects
      }
      code {
        scope
      }
    }
    query {
      blog: allMdx(
        filter: {
          frontmatter: {published: {ne: false}}
          fileAbsolutePath: {regex: "//content/blog//"}
        }
        sort: {order: DESC, fields: [frontmatter___date]}
      ) {
        edges {
          node {
            ...PostDetails
          }
        }
      }
      devlinks: allMdx(
        filter: {
          frontmatter: {published: {ne: false}}
          fileAbsolutePath: {regex: "//content/devlinks//"}
        }
        sort: {order: DESC, fields: [frontmatter___date]}
      ) {
        edges {
          node {
            ...PostDetails
          }
        }
      }
    }
  `).then(({ data, errors }) => {
    if (errors) {
      return Promise.reject(errors)
    }

    if (_.isEmpty(data.devlinks)) {
      return Promise.reject('There are no posts!')
    }

    const { blog, devlinks } = data
    const { createRedirect, createPage } = actions

    createPosts(createPage, createRedirect, blog.edges)
    createPaginatedPages(actions.createPage, blog.edges, '/blog', {
      categories: [],
    })

    createPosts(createPage, createRedirect, devlinks.edges)
    createPaginatedPagesDevlinks(actions.createPage, devlinks.edges, '/devlinks', {
      categories: [],
    })
  })

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
      },
    },
  })
}

const createPaginatedPages = (createPage, edges, pathPrefix, context) => {
  const pages = edges.reduce((acc, value, index) => {
    const pageIndex = Math.floor(index / PAGINATION_OFFSET)

    if (!acc[pageIndex]) {
      acc[pageIndex] = []
    }

    acc[pageIndex].push(value.node.id)

    return acc
  }, [])

  pages.forEach((page, index) => {
    const previousPagePath = `${pathPrefix}/${index + 1}`
    const nextPagePath = index === 1 ? pathPrefix : `${pathPrefix}/${index - 1}`

    createPage({
      path: index > 0 ? `${pathPrefix}/${index}` : `${pathPrefix}`,
      component: path.resolve(`src/templates/blog.js`),
      context: {
        pagination: {
          page,
          nextPagePath: index === 0 ? null : nextPagePath,
          previousPagePath:
            index === pages.length - 1 ? null : previousPagePath,
          pageCount: pages.length,
          pathPrefix,
        },
        ...context,
      },
    })
  })
}


const createPaginatedPagesDevlinks = (createPage, edges, pathPrefix, context) => {
  const pages = edges.reduce((acc, value, index) => {
    const pageIndex = Math.floor(index / PAGINATION_OFFSET)

    if (!acc[pageIndex]) {
      acc[pageIndex] = []
    }

    acc[pageIndex].push(value.node.id)

    return acc
  }, [])

  pages.forEach((page, index) => {
    const previousPagePath = `${pathPrefix}/${index + 1}`
    const nextPagePath = index === 1 ? pathPrefix : `${pathPrefix}/${index - 1}`

    createPage({
      path: index > 0 ? `${pathPrefix}/${index}` : `${pathPrefix}`,
      component: path.resolve(`src/templates/devlinks.js`),
      context: {
        pagination: {
          page,
          nextPagePath: index === 0 ? null : nextPagePath,
          previousPagePath:
            index === pages.length - 1 ? null : previousPagePath,
          pageCount: pages.length,
          pathPrefix,
        },
        ...context,
      },
    })
  })
}


exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    const titleSlugged = _.join(_.drop(parent.name.split('-'), 3), '-')

    let slug = 'ERROR';
    let slugPrefix = 'test';
    if (node.fileAbsolutePath.includes('content/blog/')) {
      slugPrefix = `blog`;
      slug = slugPrefix  + '/' + node.frontmatter.date.split('T')[0] + '-' + node.frontmatter.slug || titleSlugged;
    }
    else if (node.fileAbsolutePath.includes('content/devlinks/')) {
      const filePath = createFilePath({ node, getNode, trailingSlash: false });
      slugPrefix = `devlinks`;
      slug = slugPrefix + filePath;
    }

    // const slug =
    //   parent.sourceInstanceName === 'legacy'
    //     ? `${slugPrefix}/${node.frontmatter.date
    //         .split('T')[0]
    //         .replace(/-/g, '/')}/${titleSlugged}`
    //     : slugPrefix  + '/' + node.frontmatter.date.split('T')[0] + '-' + node.frontmatter.slug || titleSlugged

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    })

    createNodeField({
      name: 'published',
      node,
      value: node.frontmatter.published,
    })

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title,
    })

    createNodeField({
      name: 'description',
      node,
      value: node.frontmatter.description,
    })

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    })

    createNodeField({
      name: 'date',
      node,
      value: node.frontmatter.date ? node.frontmatter.date.split(' ')[0] : '',
    })

    createNodeField({
      name: 'banner',
      node,
      value: node.frontmatter.banner,
    })

    createNodeField({
      name: 'categories',
      node,
      value: node.frontmatter.categories || [],
    })

    createNodeField({
      name: 'keywords',
      node,
      value: node.frontmatter.keywords || [],
    })

    createNodeField({
      name: 'redirects',
      node,
      value: node.frontmatter.redirects,
    })
  }
}
