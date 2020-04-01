import React, { useState, Fragment } from 'react'
import { Button, Box, Label, Input, Textarea, Heading, Text } from 'theme-ui'

const TRY_CEREALS_API = 'http://localhost:3001/api/v1'

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

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

  const handleAttachment = e => {
    console.log(e.target.name, e.target.files[0])
    setState({
      [e.target.name]: e.target.files[0]
    })
  };

  const handleSubmit = e => {
    e.preventDefault()
    const emptyField = Object.entries(state).find(([_, value]) => !value || !value.length)
    console.log(encode({
      "form-name": formName,
      ...state
    }))
    // if (emptyField) {
    //   return
    // }
    fetch("/", {
      method: "POST",
      headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: encode({
          "form-name": formName,
          ...state
        })
    })
      // .then((res) => res.json())
      .then((data) => {
        console.log({ here: 'true'})
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
            <Label  mb={2} htmlFor="author">To Netlify:</Label>
            <Input
              name="author"
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
                comment: value
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