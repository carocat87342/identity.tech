import { createTheme } from "components";

import { IThemeOptions } from "./types";
import CeraProRegular from '../assets/fonts/CeraProRegular/font.woff';

const ceraProRegular = {
    fontFamily: 'Cera Pro',
    fontStyle: 'normal',
    fontWeight: 100,
    src: `url(${CeraProRegular})`
};

export default createTheme({
    palette: {
        primary: {
            main: '#308FFF',
            transparent: 'rgba(48, 143, 255, 0.1)'
        },
        secondary: {
            main: '#00E778',
            transparent: 'rgba(0, 231, 120, 0.1)'
        },
        tertiary: {
            main: '#FFD900',
            transparent: 'rgba(255, 217, 0, 0.1)'
        },
        quartinery: {
            main: '#8372FF',
            transparent: 'rgba(131, 114, 255, 0.1)'
        },
        sucess: {
            main: '#00A389',
            transparent: 'rgba(46, 214, 163, 0.1)'
        },
        danger: {
            main: '#FF5B5B',
            transparent: 'rgba(255, 91, 91, 0.1)'
        },
        warning: {
            main: '#FFBB54',
            transparent: 'rgba(255, 187, 84, 0.1)'
        },
        info: {
            main: '#58CDFF',
            transparent: 'rgba(88, 205, 255, 0.1)'
        },
        white: '#FFFFFF',
        grey1: '#FCFCFC',
        grey2: '#F2F5F7',
        grey3: '#D0D6DE',
        grey4: '#B9BBBD',
        grey5: '#A3A3A3',
        body: '#464255',
        dark: '#464255',
    },
    typography: {
        fontFamily: 'Cera Pro'
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [ceraProRegular]
            }
        }
    }
} as IThemeOptions)