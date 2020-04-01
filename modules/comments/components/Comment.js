import React from 'react'
import { Box, Link, Text } from 'theme-ui'

export default ({ sx }) => (
  <Box sx={sx}>
    <Box>
      {/* <Box
        sx={{
          width: '2em',
          height: 'auto',
          float: 'left',
          margin: '.2em 0 0',
        }}
      >
        <img src="https://react.semantic-ui.com/images/avatar/small/matt.jpg"/>
      </Box> */}
      <Box >
        <Link>Matt</Link>
        <Box
          sx = {{
            display: 'inline-block',
            marginLeft: '.5em',
            fontSize: '.875em',
          }
        } >
            <div>Today at 5:42PM</div>
        </Box>
        <Text>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
        </Text>
      </Box>
    </Box>
  </Box>
)