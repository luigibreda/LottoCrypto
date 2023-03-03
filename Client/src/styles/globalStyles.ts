import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: #000;
        color: #fff;
    }

    // scroll bar

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #000;
    }

    ::-webkit-scrollbar-thumb {
        background: #101010;
        border-radius: 10px;
    }
`;
