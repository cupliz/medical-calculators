import React from 'react'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import RemoveIcon from 'material-ui-icons/Remove'
import Typography from 'material-ui/Typography'

const Decimal = ({ classes, decimal, onDecimalChange }) => (
  <div className={classes.decimalPrecisionWrapper}>
    <Typography type='title' className={classes.decimalPrecision}>
      Decimal Precision
    </Typography>
    <div className={classes.decimalButtonsWrapper}>
      <Button
        fab
        color='primary'
        aria-label='add'
        className={classes.decimalButton}
        onClick={() => onDecimalChange('-')}
      >
        <RemoveIcon />
      </Button>
      <Typography type='title' className={classes.decimalPoint}>
        {decimal}
      </Typography>
      <Button
        fab
        color='primary'
        aria-label='add'
        className={classes.decimalButton}
        onClick={() => onDecimalChange('+')}
      >
        <AddIcon />
      </Button>
    </div>
  </div>
)

export default Decimal
