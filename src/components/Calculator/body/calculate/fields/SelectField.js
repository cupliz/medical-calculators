import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import _ from "lodash";
import { withStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getSheetData } from '../../../../../utils/gapi'
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
    options: [],
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
  componentDidMount = async () => {
    const output = await getSheetData(this.props.values)
    output.splice(0,1)
    let data = output.map((d)=>d[0])
    const sortedData = _.uniq(data)
    const options = sortedData.map((d)=>({value: d}))
    await this.setState({options})
  }

  render() {
    const { classes } = this.props;

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
          {this.state.options.map(({value},index) => (
            <MenuItem value={value} key={index}>{value}</MenuItem>
          ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}

SelectField.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({})

export default connect(mapStateToProps, { pickSelectOption })(withStyles(styles)(SelectField));