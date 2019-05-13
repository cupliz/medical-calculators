import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import blue from "@material-ui/core/colors/blue";

export const ResultCardText = ({ data }) => {
  return (
    <div>
      {data.length
        ? data.map((value, index) => {
            return (
              <div key={index} dangerouslySetInnerHTML={{ __html: value }} />
            );
          })
        : ""}
    </div>
  );
};

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: blue[500],
    minHeight: 30,
    "&$expanded": {
      minHeight: 30
    }
  },
  content: {
    marginTop: "-20px",
    marginBottom: "-20px",
    color: "white",
    fontSize: 18,
    "&$expanded": {
      marginTop: "-20px",
      marginBottom: "-20px"
    }
  },
  expandIcon: {
    color: "white"
  },
  expanded: {}
})(props => <MuiExpansionPanelSummary {...props} />);
ExpansionPanelSummary.muiName = "ExpansionPanelSummary";

class ControlledExpansionPanels extends React.Component {
  state = {
    expanded: null
  };

  handleChange = panel => async () => {
    const { expanded: open } = this.state;
    await this.setState({
      expanded: panel === open ? false : panel
    });
  };

  render() {
    const { data } = this.props;
    const { expanded } = this.state;

    const { title, html } = data.length ? data[0] : '';
    return (
      <ExpansionPanel
        expanded={expanded === title}
        onChange={this.handleChange(title)}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          See Details
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography dangerouslySetInnerHTML={{ __html: html }} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export const ResultCardDropDown = ControlledExpansionPanels;
