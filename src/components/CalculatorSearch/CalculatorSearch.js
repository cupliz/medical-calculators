import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import { MenuItem } from 'material-ui/Menu'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'

const renderInput = inputProps => {
  const { classes, autoFocus, value, ref, ...other } = inputProps

  return (
    <TextField
      autoFocus={autoFocus}
      className={classes.textField}
      value={value}
      inputRef={ref}
      InputProps={{
        classes: {
          input: classes.input
        },
        ...other
      }}
    />
  )
}

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion.title, query)
  const parts = parse(suggestion.title, matches)

  return (
    <Link to={`/${suggestion.id}`}>
      <MenuItem selected={isHighlighted} component='div'>
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={index} style={{ fontWeight: 300 }}>
                {part.text}
              </span>
            ) : (
              <strong key={index} style={{ fontWeight: 500 }}>
                {part.text}
              </strong>
            )
          })}
        </div>
      </MenuItem>
    </Link>
  )
}

const renderSuggestionsContainer = options => {
  const { containerProps, children } = options

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  )
}

const getSuggestionValue = suggestion => {
  return suggestion.title
}

const getSuggestions = (value, data) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0
    ? []
    : data.filter(suggestion => {
      const keep =
          count < 5 &&
          suggestion.title.toLowerCase().slice(0, inputLength) === inputValue

      if (keep) {
        count += 1
      }

      return keep
    })
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: '2'
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  textField: {
    width: '100%'
  },
  input: {
    padding: '12px 16px'
  }
})

class CalculatorSearch extends Component {
  state = {
    value: '',
    suggestions: []
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.data)
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    })
  }

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionSelected = () => {
    const id = this.props.data.filter(item => (item.title === this.state.value ? item.id : null))[0].id
  }

  render () {
    const { classes } = this.props

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={this.onSuggestionSelected}
        inputProps={{
          autoFocus: true,
          classes,
          placeholder: 'Search By Name',
          value: this.state.value,
          onChange: this.handleChange
        }}
      />
    )
  }
}

CalculatorSearch.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CalculatorSearch)
