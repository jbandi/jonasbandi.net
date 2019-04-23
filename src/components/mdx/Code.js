import React from 'react'
import { css } from '@emotion/core'
// import theme from 'prism-react-renderer/themes/oceanicNext'
import theme from 'prism-react-renderer/themes/nightOwl'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

const RE = /{([\d,-]+)}/

function calculateLinesToHighlight(meta) {
  if (RE.test(meta)) {
    const lineNumbers = RE.exec(meta)[1]
      .split(',')
      .map(v => v.split('-').map(y => parseInt(y, 10)))
    return index => {
      const lineNumber = index + 1
      const inRange = lineNumbers.some(([start, end]) =>
        end ? lineNumber >= start && lineNumber <= end : lineNumber === start,
      )
      return inRange
    }
  } else {
    return () => false
  }
}


const Code = ({ codeString, language, metastring, ...props }) => {
  if (props['react-live']) {
    return (
      <LiveProvider code={codeString} noInline={true}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    )
  } else {
    const shouldHighlightLine = calculateLinesToHighlight(metastring)
    return (
      <Highlight
        {...defaultProps}
        code={codeString}
        language={language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({
                line,
                key: i,
                className: shouldHighlightLine(i) ? 'highlight-line' : '',
              })}>
                <span
                  css={css`
                    display: inline-block;
                    width: 2em;
                    user-select: none;
                    opacity: 0.3;
                  `}
                >
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    )
  }
}

export default Code
