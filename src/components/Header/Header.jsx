import React from 'react'
import PropTypes from 'prop-types'

import './Header.css'

const Header = ({siteTitle}) => (
  <h1 className="Header">
    {siteTitle}
  </h1>
)

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired
}

export default Header
