import { ThemeOptions } from "components";
import {PaletteOptions, PaletteColorOptions} from "@material-ui/core/styles/createPalette";

export interface IThemeOptions extends ThemeOptions {
    palette: IPaletteOptions;
}

export interface IPaletteOptions extends PaletteOptions {
    tertiary: IPaletteColorOptions;
    quartinery: IPaletteColorOptions;
    white?: IPaletteColorOptions;
    grey1?: IPaletteColorOptions;
    grey2?: IPaletteColorOptions;
    grey3?: IPaletteColorOptions;
    grey4?: IPaletteColorOptions;
    grey5?: IPaletteColorOptions;
    body?: IPaletteColorOptions;
    dark?: IPaletteColorOptions;
}

export type IPaletteColorOptions = {
    transparent?: string;
} | PaletteColorOptions;
