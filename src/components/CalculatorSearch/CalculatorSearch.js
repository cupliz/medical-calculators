import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem';
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

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
  const matches = match(suggestion.title, query, {insideWords: true, findAllOccurrences: true})
  const parts = parse(suggestion.title, matches)

  return (
    <Link to={`/${suggestion.id}`} style={{textDecoration: 'none'}}>
      <MenuItem selected={isHighlighted} component='div'>
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={index} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={index} style={{ fontWeight: 300 }}>
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
          suggestion.title.toLowerCase().includes(inputValue)

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
    padding: '12px 20px'
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

  onSuggestionSelected = e => {
    if (e.target.value) {
      const filteredArr = this.props.data.filter(
        item => (item.title === e.target.value ? item.id : null)
      )
      this.props.changePage(filteredArr[0].id)
    }
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

const mapDispatchToProps = {
  changePage: id => push(`/${id}`)
}

export default connect(null, mapDispatchToProps)(
  withStyles(styles)(CalculatorSearch)
)
