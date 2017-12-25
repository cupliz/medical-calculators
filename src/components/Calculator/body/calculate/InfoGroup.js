import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  infoGroup: {
    display: 'flex',
    borderBottom: `1px solid ${theme.brand.colors.separatorGrey}`,
    borderTop: `1px solid ${theme.brand.colors.separatorGrey}`,
    backgroundColor: theme.brand.colors.greyBg
  },
  content: {
    margin: `${theme.spacing.unit * 2}px`,
    marginBottom: `${theme.spacing.unit * 3}px`,
    flexGrow: 1
  },
  drugName: {},
  drugIndication: {
    color: theme.brand.colors.primary
  },
  drugDosageInformation: {}
})

class InfoGroup extends Component {
  renderContentViews = (drugDosageInformation, classes) => {
    return drugDosageInformation.map((item, index) => (
      <div key={index}>
        <Typography
          type='body2'
          gutterBottom
          className={classes.drugDosageInformation}
        >
          {item.title}
        </Typography>
        {item.content.map((content, index) => <p key={index}>{content}</p>)}
      </div>
    ))
  }

  render () {
    const { classes, theme, drugDosageInformation } = this.props

    return (
      <div className={classes.infoGroup}>
        <div className={classes.content}>
          <Typography type='title' gutterBottom className={classes.drugName}>
            {this.props.drugName}
          </Typography>
          <Typography
            type='body2'
            gutterBottom
            className={classes.drugIndication}
          >
            {this.props.drugIndication}
          </Typography>
          <Slider
            dots={true}
            infinite={true}
            rtl={theme.direction === 'rtl'}
            arrows={false}
          >
            {this.renderContentViews(drugDosageInformation, classes)}
          </Slider>
        </div>
      </div>
    )
  }
}

InfoGroup.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(InfoGroup)
