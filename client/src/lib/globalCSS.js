/**
 * Used to set global simple defaults for CSS.
 * Applied after 3rd party (bootstrap) but before styled components.
 */
import { injectGlobal } from 'styled-components'

export default injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
  }
`
