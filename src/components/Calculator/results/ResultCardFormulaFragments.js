import React from 'react'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'

export const ResultCardFormulaValueFragment = props => {
  const { classes, caption, values, short } = props
  if (short) {
    return (
      <Typography className={`${classes.contentText} ${classes.shortFragment}`}>
        {`${caption}: ${values.join(', ')}`}
      </Typography>
    )
  } else {
    return (
      <React.Fragment>
        <Typography type='caption' className={classes.contentText}>
          {caption}
        </Typography>
        {values.map((value, index) => (
          <div key={index} className={classes.resultWrapper}>
            <Typography type='title' className={classes.resultText}>
              {value}
            </Typography>
          </div>
        ))}
      </React.Fragment>
    )
  }
}

export const ResultCardFormulaValueSelectFragment = props => {
  const { classes, caption, value, selectValue, selectOnChange, children, short } = props
  if (short) {
    return (
      <Typography className={`${classes.contentText} ${classes.shortFragment}`}>
        {`${caption}: ${value} ${selectValue}`}
      </Typography>
    )
  } else {
    return (
      <React.Fragment>
        <Typography type='caption' className={classes.contentText}>
          {caption}
        </Typography>
        <div className={classes.resultWrapper}>
          <Typography type='title' className={classes.resultText}>
            {value}
          </Typography>
          <TextField
            select
            value={selectValue}
            onChange={selectOnChange}
            SelectProps={{classes: {root: classes.select}}}
            margin='normal'
          >
            {children}
          </TextField>
        </div>
      </React.Fragment>
    )
  }
}
