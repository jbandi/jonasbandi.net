import React from 'react'
import {css} from '@emotion/core'

const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
const regex = new RegExp(expression)

const Link = ({children, href}) => {
  if (regex.test(children)) {
    return (
      <a href={href} css={css({fontSize: 'smaller'})}>
        {children}
      </a>
    )
  }

  return <a href={href}>{children}</a>
}

export default Link
