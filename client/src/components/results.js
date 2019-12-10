import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200
    }
  }
}))

export default function Results () {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState([])
  const classes = useStyles()
  const handleChange = event => {
    setQuery(event.target.value)

    console.log(event.target.value)
  }
  const onSubmit = async (event) => {
    getData().then(res => {
      setResult(res)
    })
  }

  const render = () => {
    if (result.hello !== undefined) {
      return result.hello.map((x, index) => (
        <TableRow key={index}>

          <TableCell align='right'>{<a href={`www.${x.url}`}>{x.url}</a>}</TableCell>
          <TableCell align='right'>{x.totalScore.toFixed(2)}</TableCell>
          <TableCell align='right'>{x.wFscore.toFixed(2)}</TableCell>
          <TableCell align='right'>{x.dLscore.toFixed(2)}</TableCell>
        </TableRow>
              ))
    }
  }
  const getData = async() => {
    const response = await window.fetch(`/`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    })
    const res = await response.json()
    return res
  }
  return (
    <div>

      <form className={classes.root} noValidate autoComplete='off'>
        <TextField id='standard-basic' label='Search' onChange={handleChange} />
      </form>
      <input type='submit' value='Submit' onClick={onSubmit} />

      <Paper className={classes.root}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>

              <TableCell align='right'>Link</TableCell>
              <TableCell align='right'>Score</TableCell>
              <TableCell align='right'>Content</TableCell>
              <TableCell align='right'>location</TableCell>
              <TableCell align='right'>PageRank</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {render()}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}
