import React, { useState, Fragment } from 'react'
import { Button, Box, Label, Input, Textarea, Heading, Text } from 'theme-ui'

const TRY_CEREALS_API = 'http://localhost:3001/api/v1'

export default ({
  initialState,
  formName,
  hidden
}) => {

  if (!formName || formName.length === 0) {
    return null
  }
  
  const [state, setState] = useState(initialState || {})
  const [submissionState, setSubmissionState] = useState(null)

  const handleSubmit = e => {
    const emptyField = Object.entries(state).find(([_, value]) => !value || !value.length)
    console.log(emptyField)
    if (emptyField) {
      return
    }
    const url = `${TRY_CEREALS_API}/an-id/forms/createSubmission`
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer my-awesome-token"
      },
      body: JSON.stringify({
        formName,
        ...state
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 'FAILED') {
          setState({})
        }
        setSubmissionState(data.status)
      })
      .catch(error => alert(error));

    e.preventDefault();
  }

  return (
    <Box
      as="form"
      method="post"
      name={formName}
      data-netlify="true"
      onSubmit={handleSubmit}
      pb={3}
      sx={{
        display: hidden ? 'none' : 'block',
        borderBottom: t => `1px solid ${t.colors.text}`
      }}
    >
      {
        submissionState && submissionState !== 'FAILED' ? (
          <Fragment>
            <Heading mt={2}>Thanks!</Heading>
            <Text mb={2}>
              {
                submissionState === 'PENDING'
                  ? 'Your comment wassubmitted for approval.'
                  : 'Your comment is on its way!'
              }
            </Text>
          </Fragment>
        ) : (
          <Fragment>
            <Label  mb={2} htmlFor="username">Name or twitter url</Label>
            <Input
              name="name"
              mb={3}
              onChange={({ target: { value }}) => setState({
                ...state,
                author: value
              })}
            />
            <Label mb={2} htmlFor="comment">Comment</Label>
            <Textarea
              name="comment"
              rows="3"
              mb={3}
              onChange={({ target: { value }}) => setState({
                ...state,
                message: value
              })}
            />
            <Button variant="comment" type="submit">Submit comment</Button>
            {
              submissionState && submissionState === 'FAILED' ? (
                <Text sx={{ color: 'primary'}}>An unexpected error occured. Sorry!</Text>
              ) : null
            }
          </Fragment>
        )
      }
    </Box>
  )
}