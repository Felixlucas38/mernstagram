import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    html {
        font-size: 62.5%;
    }

    body {
        box-sizing: border-box;
        color: #222;
        font-family: 'Open Sans', sans-serif;
        font-size: 1.4rem;
        font-weight: 400;
    }

    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
        -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
    }

    #root {
        position: relative;
        min-height: 100vh;
        background-color: #fafafa;
    }

    body,
    button,
    input,
    textarea,
    select {
        font-family: 'Open Sans', sans-serif;
        outline: none;
    }

    ::selection {
        background-color: #3897f0;
        color: #fff;
    }

    a:link,
    a:visited {
        color: #3897f0;
        text-decoration: none;
    }

    /* Custom Toastify Styles */
    .Toastify .Toastify__toast {
        border-radius: 4px;
        padding: 1rem 1.5rem;
        font-family: 'Open Sans', sans-serif;
    }
`;
