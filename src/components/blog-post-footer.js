import React from 'react'
import jonas from '../images/jonas.jpg'

function BlogFooter() {
  return (
    <div style={{display: 'flex'}}>
      <div
        style={{
          paddingRight: 20,
        }}
      >
        <img
          src={jonas}
          alt="Jonas Bandi"
          style={{
            maxWidth: 80,
            borderRadius: '50%',
          }}
        />
      </div>
      <p>
        <strong>Jonas Bandi</strong>
        {` is an enthusiastic software professional.`}
        He is passionate about technology and methodologies - always trying to
        learn, improve and share knowledge.
      </p>
    </div>
  )
}

export default BlogFooter
