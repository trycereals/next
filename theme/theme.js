export default {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: "Menlo, monospace"
  },
  colors: {
    text: "hsl(10, 20%, 20%)",
    background: "hsl(10, 10%, 98%)",
    primary: "hsl(10, 80%, 50%)",
    secondary: "hsl(10, 60%, 50%)",
    highlight: "hsl(10, 40%, 90%)",
    purple: "hsl(250, 60%, 30%)",
    muted: "hsl(10, 20%, 94%)",
    gray: "hsl(10, 20%, 50%)",
    netlify: "#00AD9F",
    code: '#F1F1F1'
  },
  sizes: {
    container: 780,
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    semi: 600,
    heading: 700,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.180
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body"
    },
    h1: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 5,
      mt: 3,
      mb: 3,
    },
    h2: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 4,
      mt: 3,
      mb: 3,
    },
    h3: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 3,
      mt: 3,
      mb: 3,
    },
    h4: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 2,
      mt: 3,
      mb: 3,
    },
    h5: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 1
    },
    h6: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      fontSize: 0
    },
    p: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      fontSize: 3,
      margin: '1em auto'
    },
    a: {
      color: "primary",
      ':hover': {
        color: 'secondary',
        textDecoration: 'underline',
      },
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      bg: 'code',
      p: 2,
      code: {
        color: "inherit"
      }
    },
    code: {
      fontFamily: "body",
      fontSize: "inherit",
      bg: 'code',
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid"
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid"
    },
    img: {
      maxWidth: "100%"
    },
    ul: {
      margin: '0',
      marginTop: 4,
      listStyle: 'none',
      p: 0,
    },
    li: {
      bg: 'muted',
      p: 2
    }
  },
  links: {
    nav: {
      active: {
        bg: 'highlight'
      }
    },
    muted: {
      fontSize: 'body',
      fontWeight: 'body',
      color: 'text'
    }
  },
  forms: {
    label: {
      fontWeight: 'semi',
    },
    checkbox: {
      color: 'text',
      'input:focus ~ &': {
        color: 'text'
      },
      'input:checked ~ &': {
        color: 'text'
      }
    }
  },
  buttons: {
    comment: {
      bg: 'muted',
      color: 'text',
      border: '1px solid #111',
      py: '4px'
    }
  },
  layout: {
    one: {
      flexDirection: 'column',
      textAlign: "center",
      width: "50px",
      position: "relative",
      bg: "background",
      height: '100%'
    },
    main: {
      py: 3,
      pb: 5
    },
    sideBar: {
      width: '180px',
      bg: 'muted'
    },
    page: {
      bg: 'background',
      mt: '2em',
      minHeight: 'calc(100vh - 2em)'
    },
    container: {
      px: 4,
      maxWidth: 780,
      margin: 'auto'
    },
    comments: {
      position: 'fixed',
      width: ['100%', '340px'],
      height: '100%',
      top: '0',
      right: '0',
      bg: 'background',

      borderLeft: t => `1px solid ${t.colors.text}`,
      overflow: 'none'
    }
  }
};
