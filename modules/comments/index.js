import useSWR from 'swr'
import { useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import { Box, Button } from 'theme-ui'

import Aside from './components/Aside'

export default  ({
  onChange = () => {},
  formName,
}) => {
  const router = useRouter()
  const { slug } = router.query
  const [state, setState] = useState({ open: false })
  const onClick = (payload) => {
    const merged = {
      ...state,
      ...payload
    }
    setState(merged)
    onChange(merged)
  }

  let submissions = []
  const { data, error } = useSWR(
    "/api/comments/listFormSubmissions",
    (...args) => fetch(...args).then(res => res.json())
  );

  // if (error) {
  //   return null
  // }

  if (data) {
    submissions = data.submissions;
  }

  return (
    <Fragment>
      <Aside
        submissions={submissions}
        onClick={() => onClick({ open: false })}
        {...state}
        formName={formName}
      />
      {!state.open ? (
        <Box sx={{ position: "fixed", bottom: "24px", right: "16px" }}>
          <Button
            bg="muted"
            color="text"
            sx={{ border: "1px solid #111" }}
            className="comment-button"
            onClick={() => onClick({ open: true })}
          >
            💬{submissions.length} comments
          </Button>
        </Box>
      ) : null}
    </Fragment>
  );
}