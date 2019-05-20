import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import _ from "lodash";
import { withStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { pickSelectOption } from '../../../../../store/modules/calculator'

const styles = theme => ({
  formControl: {
    marginBottom: theme.spacing.unit * 2,
    minWidth: '100%',
  },
});

class SelectField extends React.Component {
  state = {
    age: '',
    open: false,
    title: ''
  };

  handleChange = event => {
    const { pickSelectOption, group } = this.props
    pickSelectOption(group, event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes, calculator} = this.props;
    const {calculate} = calculator.data.questions[0]
    let options = []
    if(calculate){
      const drugName = calculate && calculate.input
      const filteredData = calculator.database && calculator.database.filter(d=>d.drug===drugName)
      const indicationGroups = filteredData && _.uniq(filteredData.map(f=>f.indicationGroup))
      if(indicationGroups){
        options = indicationGroups
      }
    }
    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <Select
            name="age"
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.age}
            onChange={this.handleChange}
          >
          {
            options.map((value,index) => (
              <MenuItem value={value} key={index}>{value}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
      </form>
    );
  }
}

SelectField.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, { pickSelectOption })(withStyles(styles)(SelectField));