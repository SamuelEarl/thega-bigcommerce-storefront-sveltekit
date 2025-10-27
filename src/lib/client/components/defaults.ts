export interface ISizes {
  fs?: number, // font size
  gp?: number, // gap (flexbox)
  fw?: string, // font weight
  pv?: number, // padding vertical
  ph?: number, // padding horizontal
};

export const sizes: ISizes = {
  fs: 4,
  gp: 4,
  fw: "normal",
  pv: 2,
  ph: 3,
};

export interface IColors {
  bg?: string, // background color
  fg?: string, // foreground color
  br?: string, // border color
  ol?: string, // outline color
};

export function getBtnColors(colors: IColors | null = null, variant: string, inverted: boolean) {
  // Return custom colors.
  if (colors) {
    return `background-color: ${colors.bg}; color: ${colors.fg}; border-color: ${colors.br}; outline-color: ${colors.ol};`;
  }
  // Return pre-defined colors, which have already been defined in the theme.css file.
  else {
    if (inverted) {
      return ` background-color: var(--${variant}-fg); color: var(--${variant}-bg); border-color: var(--${variant}-fg); outline-color: var(--${variant}-fg);`;
    }
    else {
      return ` background-color: var(--${variant}-bg); color: var(--${variant}-fg); border-color: var(--${variant}-bg); outline-color: var(--${variant}-bg);`;
    }
  }
}

// See the Docs Home page for an explanation of how to use these functions to handle default and custom styles.

export function getElementColors(colors: IColors | null = null) {
  const backgroundColor = colors?.bg ? colors.bg : "var(--element-bg)";
  const foregroundColor = colors?.fg ? colors.fg : "var(--element-fg)";
  const borderColor = colors?.br ? colors.br : "var(--element-br)";
  const outlineColor = colors?.ol ? colors.ol : "var(--element-ol)";

  const all = `background-color: ${backgroundColor}; color: ${foregroundColor}; border-color: ${borderColor}; outline-color: ${outlineColor};`;

  return {
    all,
    bg: backgroundColor,
    fg: foregroundColor,
    br: borderColor,
    ol: outlineColor,
  };
}

export function getElementSizes(sizes: ISizes | null = null, btn: boolean = false) {
  const fontSize = sizes?.fs > -1 ? `var(--size-${sizes.fs})` : "var(--size-base)";
  // If a value is passed for `fw`, then set that value as the font weight. Else If btn = true, then set font weight to "bold". Else set font weight to "normal".
  const fontWeight = sizes?.fw ? `${sizes.fw}` : (btn ? "bold" : "normal");
  const gap = sizes?.fs > -1 ? `var(--size-${sizes.fs})` : "var(--size-base)";
  const paddingV = sizes?.pv > -1 ? `var(--size-${sizes.pv})` : "var(--padding-v-default)";
  const paddingH = sizes?.ph > -1 ? `var(--size-${sizes.ph})` : "var(--padding-h-default)";

  let all = `font-size: ${fontSize}; font-weight: ${fontWeight}; padding: ${paddingV} ${paddingH};`;
  if (btn) {
    all += ` gap: ${gap};`;
  }

  let elementSizes = {
    all,
    fs: fontSize,
    fw: fontWeight,
    pv: paddingV,
    ph: paddingH,
  };

  // if (btn) {
  //   elementSizes["gp"] = gap;
  // }

  return elementSizes;
}

export function getElementWidth(width: "auto" | "full") {
  return width === "full" ? "width: 100%" : "";
}
