import React from 'react'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import Typography from '@material-ui/core/Typography'

const Decimal = ({ classes, decimal, onDecimalChange }) => (
  <div className={classes.decimalPrecisionWrapper}>
    <Typography type='title' className={classes.decimalPrecision}>
      Decimal Precision
    </Typography>
    <div className={classes.decimalButtonsWrapper}>
      <Button
        variant='fab'
        mini
        color='primary'
        aria-label='add'
        style={{width: 36, height: 36, boxShadow: 'none'}}
        onClick={() => onDecimalChange('-')}
      >
        <RemoveIcon />
      </Button>
      <Typography type='title' className={classes.decimalPoint}>
        {decimal}
      </Typography>
      <Button
        variant='fab'
        mini
        color='primary'
        aria-label='add'
        style={{width: 36, height: 36, boxShadow: 'none'}}
        onClick={() => onDecimalChange('+')}
      >
        <AddIcon />
      </Button>
    </div>
  </div>
)

export default Decimal
