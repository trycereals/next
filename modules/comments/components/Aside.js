import React, { useState, useRef } from 'react'
import { Button, Flex, Box, Text, Heading } from 'theme-ui'

import CommentBox from './CommentBox'
import NetlifyCommentBox from './NetlifyCommentBox'
import Comment from './Comment'

export default ({
  submissions = [],
  onClick,
  open,
  formName
}) => {
  const [state, setState] = useState({ displayForm: false })
  const container = useRef(null);

  function handleClick() {
    if (container.current) {
      container.current.scrollTo(0, 0);
    }
  }

  return (
    <Box variant="layout.comments" sx={{ display: open ? "initial" : "none" }}>
      <Flex p={2} sx={{ borderBottom: t => `1px solid ${t.colors.text}`, alignItems: 'center'}}>
        <Heading>Comments</Heading>
        <Button
          variant="comment"
          sx={{ ml: 'auto'}}
          onClick={() => {
            setState({ ...state, displayForm: !state.displayForm })
            handleClick()
          }}
        >
          { state.displayForm ? '- cancel' : '+ add' }
        </Button>
      </Flex>
      <Box
        p={2}
        pb={5}
        sx={{ overflowY: 'auto', height: 'calc(100vh - 57px)'}}
        ref={container}
      >
        { state.displayForm && <CommentBox formName={formName} /> }
        { state.displayForm && <NetlifyCommentBox formName={formName} /> }
        {
          submissions.map((sub) => <Comment sx={{ py: 2}} />)
        }
      </Box>
      <Button
        bg="muted"
        color="text"
        sx={{
          border: "1px solid #111",
          height: "40px",
          position: "absolute",
          bottom: "16px",
          left: "16px"
        }}
        onClick={() => onClick({ open: false })}
      >
        Close
      </Button>
    </Box>
  );
}