import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { csvToJSON } from '../../../../../utils/gapi'
import { typeInputSearch } from '../../../../../store/modules/calculator'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion, query);
  const parts = parse(suggestion, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
        )}
      </div>
    </MenuItem>
  );
}

function getSuggestions(suggestions, value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;
  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion;
}

class IntegrationAutosuggest extends React.Component {
  state = {
    input: "",
    suggestionsList: [],
    suggestions: []
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    const suggestions = getSuggestions(this.state.suggestionsList, value)
    this.setState({ suggestions });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = name => (event, { newValue }) => {
    const { typeInputSearch, group } = this.props
    typeInputSearch(group, newValue)
    this.setState({
      [name]: newValue
    });
  };

  componentDidMount = async () => {
    const suggestionsList = await csvToJSON(this.props.values)
    await this.setState({suggestionsList})
  }
  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: this.props.placeholder,
            value: this.state.input,
            onChange: this.handleChange("input")
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
        <div className={classes.divider} />
      </div>
    );
  }
}

IntegrationAutosuggest.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({})

export default connect(mapStateToProps, { typeInputSearch })(
  withStyles(styles)(IntegrationAutosuggest)
);
