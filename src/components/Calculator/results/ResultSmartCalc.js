import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    // fontSize: theme.typography.pxToRem(12),
    color: "white"
  },
  result: {
    // fontSize: theme.typography.pxToRem(12),
    color: theme.palette.text.secondary,
    fontWeight: "bold"
  }
});
const ResultText = ({ data, classes}) => {
  return (
    <div>
      {Object.keys(data.recom).length &&
        Object.keys(data.recom).map((key, index) => {
          const d = data.recom[key];
          return (
            <div className={classes.result} key={index} dangerouslySetInnerHTML={{ __html: d.value }}>
            </div>
          );
        })}
    </div>
  );
};

class ControlledExpansionPanels extends React.Component {
  state = {
    expanded: null
  };

  handleChange = panel => expanded => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes, data, short } = this.props;
    const { expanded } = this.state;
    if (short) {
      return <ResultText data={data} classes={classes}/>;
    } else {
      return (
        <div>
          <ResultText data={data} classes={classes}/>
          <br />
          <div className={classes.root}>
            {Object.keys(data.info).length
              ? Object.keys(data.info).map((key, index) => {
                  const { title, bgColor, html } = data.info[key];
                  return (
                    <ExpansionPanel
                      key={index}
                      expanded={expanded === key}
                      onChange={this.handleChange(key)}
                    >
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        style={{ backgroundColor: bgColor }}
                      >
                        <Typography className={classes.heading}>
                          See Details
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  );
                })
              : ""}
          </div>
        </div>
      );
    }
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ControlledExpansionPanels);
