import React from 'react'
import {
  Card,
  CardActions,
  CardHeader,
  CardText
} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const Result = props => {
  if (props.points === 0) {
    return <h3>Please select attributes</h3>
  } else {
    return (
      <Card>
        <CardHeader
          title='Result'
          subtitle={`Points: ${props.points}`}
        />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis
          pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate
          interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <FlatButton label='Action1' />
          <FlatButton label='Action2' />
        </CardActions>
      </Card>
    )
  }
}

export default Result
