import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
  questionGroup: {
    display: 'flex',
    borderBottom: `1px solid ${theme.brand.colors.separatorGrey}`,
    borderTop: `1px solid ${theme.brand.colors.separatorGrey}`,
    backgroundColor: theme.brand.colors.greyBg
  },
  formControl: {
    margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px 0 ${theme
      .spacing.unit * 2}px`
  }
})

const InfoGroup = props => (
  <div>
    Inside InfoGroup
  </div>
)

export default InfoGroup
