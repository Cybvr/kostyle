/* @ds-bundle: {"format":4,"namespace":"VisualCNSDesignSystem_306574","components":[{"name":"BrandLockup","sourcePath":"components/brand/BrandLockup.jsx"},{"name":"Avatar","sourcePath":"components/data-display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/data-display/Badge.jsx"},{"name":"Card","sourcePath":"components/data-display/Card.jsx"},{"name":"CardHeader","sourcePath":"components/data-display/Card.jsx"},{"name":"CardTitle","sourcePath":"components/data-display/Card.jsx"},{"name":"CardDescription","sourcePath":"components/data-display/Card.jsx"},{"name":"CardContent","sourcePath":"components/data-display/Card.jsx"},{"name":"CardFooter","sourcePath":"components/data-display/Card.jsx"},{"name":"Separator","sourcePath":"components/data-display/Separator.jsx"},{"name":"Skeleton","sourcePath":"components/data-display/Skeleton.jsx"},{"name":"Table","sourcePath":"components/data-display/Table.jsx"},{"name":"TableHeader","sourcePath":"components/data-display/Table.jsx"},{"name":"TableBody","sourcePath":"components/data-display/Table.jsx"},{"name":"TableRow","sourcePath":"components/data-display/Table.jsx"},{"name":"TableHead","sourcePath":"components/data-display/Table.jsx"},{"name":"TableCell","sourcePath":"components/data-display/Table.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Label","sourcePath":"components/forms/Label.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Accordion","sourcePath":"components/navigation/Accordion.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"DropdownMenu","sourcePath":"components/navigation/DropdownMenu.jsx"}],"sourceHashes":{"components/brand/BrandLockup.jsx":"b659aebf3de7","components/data-display/Avatar.jsx":"c1e976eb25ba","components/data-display/Badge.jsx":"1bb91a50fa6a","components/data-display/Card.jsx":"757ceee1e77e","components/data-display/Separator.jsx":"168c6e496040","components/data-display/Skeleton.jsx":"c3d64841dec7","components/data-display/Table.jsx":"b0f4aa90f8b9","components/feedback/Dialog.jsx":"af9bb07da5af","components/feedback/Tooltip.jsx":"586370d26691","components/forms/Button.jsx":"d3eb99aa48d7","components/forms/Input.jsx":"807ea01b8de3","components/forms/Label.jsx":"3e1ca9490dad","components/forms/Select.jsx":"671f8e2fd08d","components/forms/Switch.jsx":"08a927259cff","components/forms/Textarea.jsx":"43a956840628","components/navigation/Accordion.jsx":"18849ec23362","components/navigation/Breadcrumb.jsx":"542209ea7b97","components/navigation/DropdownMenu.jsx":"75aa10186bf4","ui_kits/dashboard/Icons.jsx":"18869512f3ce","ui_kits/dashboard/Login.jsx":"4006d5296bdc","ui_kits/dashboard/Sidebar.jsx":"45f8ddad70b0","ui_kits/dashboard/Topbar.jsx":"a49c21aa1d87","ui_kits/dashboard/Views.jsx":"47d3ca57f185","ui_kits/website/Footer.jsx":"0f67638418a3","ui_kits/website/Header.jsx":"a2881b9fec94","ui_kits/website/HomeSections.jsx":"1910da1c055a","ui_kits/website/Pricing.jsx":"8e06e9a2dfd8"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.VisualCNSDesignSystem_306574 = window.VisualCNSDesignSystem_306574 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/BrandLockup.jsx
try { (() => {
/**
 * VisualCNS BrandLockup — the star glyph + "VisualCNS" wordmark set in Geist
 * Pixel. This is the ONLY correct way to render the brand name. `invert` for
 * dark backgrounds; `logoSize` drives both glyph and wordmark size.
 */
function BrandLockup({
  invert = false,
  logoSize = 28,
  gap = 4,
  wordmarkScale = 0.92,
  showWordmark = true,
  logoSrc = "/assets/logo.svg",
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: `${gap}px`,
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "VisualCNS",
    width: logoSize,
    height: logoSize,
    style: {
      flexShrink: 0,
      display: "block",
      filter: invert ? "brightness(0) invert(1)" : "none"
    }
  }), showWordmark && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-wordmark)",
      fontWeight: 400,
      letterSpacing: "-0.01em",
      fontSize: `${Math.round(logoSize * wordmarkScale)}px`,
      lineHeight: 0.82,
      color: invert ? "var(--primary-foreground)" : "var(--foreground)"
    }
  }, "VisualCNS"));
}
Object.assign(__ds_scope, { BrandLockup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/BrandLockup.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Avatar.jsx
try { (() => {
/** VisualCNS Avatar — square-ish (4px radius) image or initials fallback. */
function Avatar({
  src,
  alt = "",
  fallback,
  size = 40,
  className = "",
  style = {}
}) {
  const [error, setError] = React.useState(false);
  const showImg = src && !error;
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      flexShrink: 0,
      overflow: "hidden",
      borderRadius: "var(--radius-sm)",
      background: "var(--muted)",
      color: "var(--muted-foreground)",
      fontFamily: "var(--font-sans)",
      fontSize: Math.round(size * 0.36),
      fontWeight: "var(--weight-medium)",
      ...style
    }
  }, showImg ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    onError: () => setError(true),
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : /*#__PURE__*/React.createElement("span", null, fallback));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * VisualCNS Badge — small pill/tag. Default = blue accent fill. 6px radius.
 */
function Badge({
  variant = "default",
  className = "",
  style = {},
  children,
  ...props
}) {
  const variants = {
    default: {
      background: "var(--accent)",
      color: "var(--accent-foreground)",
      border: "1px solid transparent"
    },
    secondary: {
      background: "var(--secondary)",
      color: "var(--secondary-foreground)",
      border: "1px solid transparent"
    },
    destructive: {
      background: "var(--destructive)",
      color: "#fff",
      border: "1px solid transparent"
    },
    outline: {
      background: "transparent",
      color: "var(--foreground)",
      border: "1px solid var(--border)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    className: className,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "4px",
      padding: "2px 8px",
      fontFamily: "var(--font-sans)",
      fontSize: "12px",
      fontWeight: "var(--weight-medium)",
      lineHeight: 1.3,
      whiteSpace: "nowrap",
      borderRadius: "var(--radius-md)",
      ...variants[variant],
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * VisualCNS Card — cream surface, hairline border, 4px radius, restrained
 * shadow. Composable: Card + CardHeader/CardTitle/CardDescription/CardContent/
 * CardFooter. Pass `marketing` for the rounded-2xl offer-card treatment.
 */
function Card({
  marketing = false,
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      padding: "24px 0",
      background: marketing ? "var(--card)" : "var(--card)",
      color: "var(--card-foreground)",
      border: "1px solid var(--border)",
      borderRadius: marketing ? "var(--radius-card-marketing)" : "var(--radius-card)",
      boxShadow: "var(--shadow-sm)",
      ...style
    }
  }, props), children);
}
function CardHeader({
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      padding: "0 24px",
      ...style
    }
  }, props), children);
}
function CardTitle({
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      fontFamily: "var(--font-serif)",
      fontSize: "20px",
      fontWeight: "var(--weight-heading)",
      lineHeight: 1.1,
      ...style
    }
  }, props), children);
}
function CardDescription({
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "14px",
      color: "var(--muted-foreground)",
      lineHeight: "var(--leading-normal)",
      ...style
    }
  }, props), children);
}
function CardContent({
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      padding: "0 24px",
      ...style
    }
  }, props), children);
}
function CardFooter({
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      display: "flex",
      alignItems: "center",
      padding: "0 24px",
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Separator.jsx
try { (() => {
/** VisualCNS Separator — 1px hairline divider, horizontal or vertical. */
function Separator({
  orientation = "horizontal",
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "separator",
    "aria-orientation": orientation,
    className: className,
    style: {
      flexShrink: 0,
      background: "var(--border)",
      ...(orientation === "horizontal" ? {
        height: "1px",
        width: "100%"
      } : {
        width: "1px",
        height: "100%",
        alignSelf: "stretch"
      }),
      ...style
    }
  });
}
Object.assign(__ds_scope, { Separator });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Separator.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Skeleton.jsx
try { (() => {
/** VisualCNS Skeleton — muted shimmer placeholder. */
function Skeleton({
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, `@keyframes vcns-skeleton{0%,100%{opacity:1}50%{opacity:.4}}`), /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      background: "var(--muted)",
      borderRadius: "var(--radius-sm)",
      animation: "vcns-skeleton 1.6s var(--ease-standard) infinite",
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Skeleton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Skeleton.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Table.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** VisualCNS Table — hairline row dividers, muted-mono headers, hover wash. */
function Table({
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", _extends({
    className: className,
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--font-sans)",
      fontSize: "14px",
      ...style
    }
  }, props), children));
}
function TableHeader({
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("thead", props, children);
}
function TableBody({
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("tbody", props, children);
}
function TableRow({
  className = "",
  style = {},
  children,
  ...props
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("tr", _extends({
    className: className,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderBottom: "1px solid var(--border)",
      background: hover ? "color-mix(in srgb, var(--muted) 50%, transparent)" : "transparent",
      transition: "background-color var(--duration-fast) var(--ease-standard)",
      ...style
    }
  }, props), children);
}
function TableHead({
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("th", _extends({
    className: className,
    style: {
      height: "40px",
      padding: "0 8px",
      textAlign: "left",
      verticalAlign: "middle",
      fontWeight: "var(--weight-medium)",
      color: "var(--muted-foreground)",
      whiteSpace: "nowrap",
      ...style
    }
  }, props), children);
}
function TableCell({
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("td", _extends({
    className: className,
    style: {
      padding: "8px",
      verticalAlign: "middle",
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Table, TableHeader, TableBody, TableRow, TableHead, TableCell });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Table.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
/**
 * VisualCNS Dialog — centered modal on a dim scrim. Controlled via `open` /
 * `onOpenChange`. Square-ish surface (radius-lg), hairline border. Also serves
 * the alert-dialog + sheet patterns.
 */
function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  width = 460
}) {
  React.useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onOpenChange?.(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onMouseDown: e => {
      if (e.target === e.currentTarget) onOpenChange?.(false);
    },
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      background: "rgba(10, 15, 26, 0.5)",
      backdropFilter: "blur(2px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    style: {
      width: "100%",
      maxWidth: width,
      background: "var(--background)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-lg)",
      padding: "24px"
    }
  }, (title || description) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "16px"
    }
  }, title && /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-serif)",
      fontSize: "22px",
      fontWeight: "var(--weight-heading)",
      lineHeight: 1.15
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      fontFamily: "var(--font-sans)",
      fontSize: "14px",
      color: "var(--muted-foreground)",
      lineHeight: "var(--leading-normal)"
    }
  }, description)), children, footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "8px",
      marginTop: "24px"
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
/** VisualCNS Tooltip — ink bubble, small caption text, hover/focus reveal. */
function Tooltip({
  content,
  side = "top",
  children,
  className = "",
  style = {}
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    bottom: {
      top: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    left: {
      right: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    },
    right: {
      left: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    }
  }[side];
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      zIndex: 60,
      ...pos,
      whiteSpace: "nowrap",
      padding: "6px 10px",
      fontFamily: "var(--font-sans)",
      fontSize: "12px",
      lineHeight: 1.3,
      color: "var(--background)",
      background: "var(--foreground)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-md)",
      pointerEvents: "none"
    }
  }, content));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * VisualCNS Button — square-cornered, restrained. The DEFAULT variant is ink
 * (near-black), not blue; blue is reserved for links/accents. Marketing CTAs
 * use the `pill` shape.
 */
function Button({
  variant = "default",
  size = "default",
  shape = "default",
  className = "",
  style = {},
  children,
  ...props
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    whiteSpace: "nowrap",
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--weight-medium)",
    lineHeight: 1,
    cursor: props.disabled ? "not-allowed" : "pointer",
    opacity: props.disabled ? 0.5 : 1,
    border: "1px solid transparent",
    borderRadius: shape === "pill" ? "var(--radius-pill)" : "var(--radius-button)",
    transition: "var(--transition-colors), opacity var(--duration-normal) var(--ease-standard)",
    outline: "none"
  };
  const sizes = {
    default: {
      height: "36px",
      padding: "0 16px",
      fontSize: "14px"
    },
    sm: {
      height: "32px",
      padding: "0 12px",
      fontSize: "13px"
    },
    lg: {
      height: "40px",
      padding: "0 24px",
      fontSize: "14px"
    },
    icon: {
      height: "36px",
      width: "36px",
      padding: 0
    },
    "icon-sm": {
      height: "32px",
      width: "32px",
      padding: 0
    }
  };
  // pill CTAs read wider + slightly uppercased in-brand
  const pillPad = shape === "pill" ? {
    padding: "0 20px",
    letterSpacing: "0.02em"
  } : {};
  const variants = {
    default: {
      background: "var(--foreground)",
      color: "var(--background)"
    },
    destructive: {
      background: "var(--destructive)",
      color: "#fff"
    },
    outline: {
      background: "var(--background)",
      color: "var(--foreground)",
      border: "1px solid var(--border)",
      boxShadow: "var(--shadow-xs)"
    },
    secondary: {
      background: "var(--secondary)",
      color: "var(--secondary-foreground)"
    },
    ghost: {
      background: "transparent",
      color: "var(--foreground)"
    },
    link: {
      background: "transparent",
      color: "var(--accent)",
      textUnderlineOffset: "4px",
      height: "auto",
      padding: 0
    }
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyle = !props.disabled && hover ? {
    default: {
      background: "color-mix(in srgb, var(--foreground) 90%, transparent)"
    },
    destructive: {
      background: "color-mix(in srgb, var(--destructive) 90%, transparent)"
    },
    outline: {
      background: "var(--accent-wash)"
    },
    secondary: {
      background: "var(--accent-wash)"
    },
    ghost: {
      background: "var(--accent-wash)"
    },
    link: {
      textDecoration: "underline"
    }
  }[variant] : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    className: className,
    style: {
      ...base,
      ...sizes[size],
      ...pillPad,
      ...variants[variant],
      ...hoverStyle,
      ...style
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, props), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** VisualCNS text input — 36px tall, hairline border, 6px radius, blue focus ring. */
function Input({
  className = "",
  style = {},
  invalid = false,
  ...props
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("input", _extends({
    className: className,
    onFocus: e => {
      setFocus(true);
      props.onFocus?.(e);
    },
    onBlur: e => {
      setFocus(false);
      props.onBlur?.(e);
    },
    style: {
      height: "36px",
      width: "100%",
      minWidth: 0,
      padding: "0 12px",
      fontFamily: "var(--font-sans)",
      fontSize: "14px",
      color: "var(--foreground)",
      background: "transparent",
      border: `1px solid ${invalid ? "var(--destructive)" : "var(--border)"}`,
      borderColor: focus && !invalid ? "var(--ring)" : invalid ? "var(--destructive)" : "var(--border)",
      borderRadius: "var(--radius-input)",
      boxShadow: focus ? "var(--shadow-ring)" : "var(--shadow-xs)",
      outline: "none",
      transition: "var(--transition-colors), box-shadow var(--duration-normal) var(--ease-standard)",
      opacity: props.disabled ? 0.5 : 1,
      ...style
    }
  }, props));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Label.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** VisualCNS field label — small, medium weight. */
function Label({
  className = "",
  style = {},
  children,
  ...props
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    className: className,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      fontFamily: "var(--font-sans)",
      fontSize: "14px",
      fontWeight: "var(--weight-medium)",
      lineHeight: 1,
      color: "var(--foreground)",
      marginBottom: "6px",
      ...style
    }
  }, props), children);
}
Object.assign(__ds_scope, { Label });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Label.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
/**
 * VisualCNS Select — styled dropdown. Trigger matches Input (6px radius,
 * hairline). Options render in a bordered popover with a blue-wash hover.
 * Simplified single-select; pass `options` [{value,label}] or use children.
 */
function Select({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select…",
  options = [],
  size = "default",
  disabled = false,
  className = "",
  style = {}
}) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? "");
  const current = isControlled ? value : internal;
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const selected = options.find(o => o.value === current);
  function pick(v) {
    if (!isControlled) setInternal(v);
    onValueChange?.(v);
    setOpen(false);
  }
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: className,
    style: {
      position: "relative",
      display: "inline-block",
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: () => setOpen(o => !o),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "8px",
      height: size === "sm" ? "32px" : "36px",
      minWidth: "180px",
      padding: "0 12px",
      fontFamily: "var(--font-sans)",
      fontSize: "14px",
      color: selected ? "var(--foreground)" : "var(--muted-foreground)",
      background: "transparent",
      border: `1px solid ${open ? "var(--ring)" : "var(--border)"}`,
      borderRadius: "var(--radius-input)",
      boxShadow: open ? "var(--shadow-ring)" : "var(--shadow-xs)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      outline: "none",
      transition: "var(--transition-colors), box-shadow var(--duration-normal) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", null, selected ? selected.label : placeholder), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    style: {
      opacity: 0.5
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  }))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "calc(100% + 4px)",
      left: 0,
      minWidth: "100%",
      zIndex: 50,
      padding: "4px",
      background: "var(--popover)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-md)"
    }
  }, options.map(o => {
    const active = o.value === current;
    return /*#__PURE__*/React.createElement(Option, {
      key: o.value,
      label: o.label,
      active: active,
      onClick: () => pick(o.value)
    });
  })));
}
function Option({
  label,
  active,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "6px 8px",
      fontFamily: "var(--font-sans)",
      fontSize: "14px",
      color: hover || active ? "var(--accent-foreground)" : "var(--foreground)",
      background: hover ? "var(--accent)" : "transparent",
      borderRadius: "var(--radius-sm)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", null, label), active && /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/** VisualCNS switch — 32×18px track, checked = ink (primary), animated thumb. */
function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  className = "",
  style = {}
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  function toggle() {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onCheckedChange?.(!on);
  }
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": on,
    disabled: disabled,
    onClick: toggle,
    className: className,
    style: {
      display: "inline-flex",
      alignItems: "center",
      width: "32px",
      height: "18px",
      padding: "2px",
      borderRadius: "var(--radius-pill)",
      border: "1px solid transparent",
      background: on ? "var(--primary)" : "var(--vcns-border)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "background-color var(--duration-normal) var(--ease-standard)",
      boxShadow: "var(--shadow-xs)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: "14px",
      height: "14px",
      borderRadius: "var(--radius-pill)",
      background: "var(--background)",
      transform: on ? "translateX(14px)" : "translateX(0)",
      transition: "transform var(--duration-normal) var(--ease-standard)"
    }
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** VisualCNS textarea — matches Input styling, min 64px, resizes vertically. */
function Textarea({
  className = "",
  style = {},
  invalid = false,
  ...props
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("textarea", _extends({
    className: className,
    onFocus: e => {
      setFocus(true);
      props.onFocus?.(e);
    },
    onBlur: e => {
      setFocus(false);
      props.onBlur?.(e);
    },
    style: {
      minHeight: "64px",
      width: "100%",
      padding: "8px 12px",
      fontFamily: "var(--font-sans)",
      fontSize: "14px",
      lineHeight: "var(--leading-normal)",
      color: "var(--foreground)",
      background: "transparent",
      border: `1px solid ${focus && !invalid ? "var(--ring)" : invalid ? "var(--destructive)" : "var(--border)"}`,
      borderRadius: "var(--radius-input)",
      boxShadow: focus ? "var(--shadow-ring)" : "var(--shadow-xs)",
      outline: "none",
      resize: "vertical",
      transition: "var(--transition-colors), box-shadow var(--duration-normal) var(--ease-standard)",
      ...style
    }
  }, props));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Accordion.jsx
try { (() => {
/**
 * VisualCNS Accordion — the homepage's signature numbered list pattern.
 * Serif triggers, hairline dividers, chevron rotates on open. `type="multiple"`
 * allows several panels open at once.
 */
function Accordion({
  items = [],
  type = "single",
  defaultValue,
  className = "",
  style = {}
}) {
  const initial = defaultValue !== undefined ? Array.isArray(defaultValue) ? defaultValue : [defaultValue] : [];
  const [open, setOpen] = React.useState(initial);
  function toggle(value) {
    setOpen(prev => {
      const isOpen = prev.includes(value);
      if (type === "multiple") return isOpen ? prev.filter(v => v !== value) : [...prev, value];
      return isOpen ? [] : [value];
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      width: "100%",
      ...style
    }
  }, items.map(item => /*#__PURE__*/React.createElement(AccordionRow, {
    key: item.value,
    item: item,
    open: open.includes(item.value),
    onToggle: () => toggle(item.value)
  })));
}
function AccordionRow({
  item,
  open,
  onToggle
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggle,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "16px",
      width: "100%",
      padding: "20px 0",
      textAlign: "left",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-serif)",
      fontSize: "24px",
      fontWeight: "var(--weight-heading)",
      lineHeight: 1.2,
      color: hover ? "var(--accent)" : "var(--foreground)",
      transition: "color var(--duration-normal) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", null, item.trigger), /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    style: {
      flexShrink: 0,
      marginTop: "8px",
      transform: open ? "rotate(180deg)" : "rotate(0)",
      transition: "transform var(--duration-normal) var(--ease-standard)",
      opacity: 0.6
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateRows: open ? "1fr" : "0fr",
      transition: "grid-template-rows var(--duration-normal) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: "20px",
      fontFamily: "var(--font-sans)",
      fontSize: "16px",
      lineHeight: "var(--leading-relaxed)",
      color: "var(--muted-foreground)"
    }
  }, item.content))));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
/** VisualCNS Breadcrumb — mono-ish trail with slash separators. */
function Breadcrumb({
  items = [],
  className = "",
  style = {}
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Breadcrumb",
    className: className,
    style: {
      ...style
    }
  }, /*#__PURE__*/React.createElement("ol", {
    style: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "8px",
      listStyle: "none",
      margin: 0,
      padding: 0,
      fontFamily: "var(--font-sans)",
      fontSize: "14px"
    }
  }, items.map((item, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }
    }, item.href && !last ? /*#__PURE__*/React.createElement("a", {
      href: item.href,
      style: {
        color: "var(--muted-foreground)",
        textDecoration: "none"
      }
    }, item.label) : /*#__PURE__*/React.createElement("span", {
      style: {
        color: last ? "var(--foreground)" : "var(--muted-foreground)",
        fontWeight: last ? "var(--weight-medium)" : "var(--weight-normal)"
      }
    }, item.label), !last && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--vcns-gray-400)"
      }
    }, "/"));
  })));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/DropdownMenu.jsx
try { (() => {
/**
 * VisualCNS DropdownMenu — bordered popover of items with blue-wash hover.
 * Covers the header account/nav menu pattern. Pass `trigger` + `items`
 * [{label, onSelect, icon, separator}].
 */
function DropdownMenu({
  trigger,
  items = [],
  align = "start",
  className = "",
  style = {}
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: className,
    style: {
      position: "relative",
      display: "inline-block",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => setOpen(o => !o),
    style: {
      display: "inline-flex",
      cursor: "pointer"
    }
  }, trigger), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "calc(100% + 6px)",
      [align === "end" ? "right" : "left"]: 0,
      zIndex: 50,
      minWidth: "200px",
      padding: "4px",
      background: "var(--popover)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-md)"
    }
  }, items.map((item, i) => item.separator ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      height: "1px",
      background: "var(--border)",
      margin: "4px -4px"
    }
  }) : /*#__PURE__*/React.createElement(MenuItem, {
    key: i,
    item: item,
    onClose: () => setOpen(false)
  }))));
}
function MenuItem({
  item,
  onClose
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: () => {
      item.onSelect?.();
      onClose();
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "7px 8px",
      fontFamily: "var(--font-sans)",
      fontSize: "14px",
      color: item.destructive ? "var(--destructive)" : hover ? "var(--accent-foreground)" : "var(--foreground)",
      background: hover ? item.destructive ? "color-mix(in srgb, var(--destructive) 90%, transparent)" : "var(--accent)" : "transparent",
      borderRadius: "var(--radius-sm)",
      cursor: "pointer"
    }
  }, item.icon, /*#__PURE__*/React.createElement("span", null, item.label));
}
Object.assign(__ds_scope, { DropdownMenu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/DropdownMenu.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Icons.jsx
try { (() => {
/* Lucide icon subset (exact Lucide path data — same set the app uses via
   lucide-react). Stroke icons rendered as inline SVG. */
const LUCIDE = {
  "layout-dashboard": '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  "folder-kanban": '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><path d="M8 10v4"/><path d="M12 10v2"/><path d="M16 10v6"/>',
  "check-square": '<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  "hard-drive": '<line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/>',
  "megaphone": '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  "search": '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  "sliders-horizontal": '<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',
  "chevrons-up-down": '<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>',
  "plus": '<path d="M5 12h14"/><path d="M12 5v14"/>',
  "panel-left": '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>',
  "bell": '<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>'
};
function Icon({
  name,
  size = 16,
  color = "currentColor",
  strokeWidth = 2,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0,
      display: "block",
      ...style
    },
    dangerouslySetInnerHTML: {
      __html: LUCIDE[name] || ""
    }
  });
}
window.Icon = Icon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Login.jsx
try { (() => {
const {
  BrandLockup,
  Button,
  Input,
  Label
} = window.VisualCNSDesignSystem_306574;
function Login({
  onSignIn
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ds-login"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-login-brand"
  }, /*#__PURE__*/React.createElement(BrandLockup, {
    logoSize: 30,
    logoSrc: "../../assets/logo.svg"
  })), /*#__PURE__*/React.createElement("div", {
    className: "ds-login-card"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ds-eyebrow"
  }, "Client workspace"), /*#__PURE__*/React.createElement("h1", {
    className: "ds-login-h1"
  }, "Sign in to VisualCNS"), /*#__PURE__*/React.createElement("p", {
    className: "ds-login-sub"
  }, "Track projects, approve work, and stay looped in on your build."), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onSignIn();
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "l-email"
  }, "Work email"), /*#__PURE__*/React.createElement(Input, {
    id: "l-email",
    type: "email",
    defaultValue: "ada@brightpay.co"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Label, {
    htmlFor: "l-pass"
  }, "Password"), /*#__PURE__*/React.createElement(Input, {
    id: "l-pass",
    type: "password",
    defaultValue: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7"
  })), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    style: {
      width: "100%"
    }
  }, "Sign In")), /*#__PURE__*/React.createElement("p", {
    className: "ds-login-foot"
  }, "New here? ", /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Book a discovery call"))));
}
window.DashLogin = Login;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Login.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Sidebar.jsx
try { (() => {
const {
  BrandLockup,
  Avatar
} = window.VisualCNSDesignSystem_306574;
const Icon = window.Icon;
const NAV = [{
  label: "Overview",
  icon: "layout-dashboard",
  href: "overview"
}, {
  label: "Projects",
  icon: "folder-kanban",
  href: "projects"
}, {
  label: "Tasks",
  icon: "check-square",
  href: "tasks"
}, {
  label: "Drive",
  icon: "hard-drive",
  href: "drive"
}, {
  label: "Marketing",
  icon: "megaphone",
  href: "marketing"
}];
function Sidebar({
  active,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("aside", {
    className: "ds-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-side-header"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "ds-side-brand"
  }, /*#__PURE__*/React.createElement(BrandLockup, {
    logoSize: 24,
    logoSrc: "../../assets/logo.svg"
  })), /*#__PURE__*/React.createElement("span", {
    className: "ds-side-sub"
  }, "Client workspace")), /*#__PURE__*/React.createElement("nav", {
    className: "ds-side-nav"
  }, NAV.map(n => /*#__PURE__*/React.createElement("button", {
    key: n.href,
    className: "ds-nav-item" + (active === n.href ? " active" : ""),
    onClick: () => onNavigate(n.href)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: n.icon,
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, n.label)))), /*#__PURE__*/React.createElement("div", {
    className: "ds-side-footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ds-user"
  }, /*#__PURE__*/React.createElement(Avatar, {
    src: "../../assets/people/woman.png",
    fallback: "AO",
    size: 32
  }), /*#__PURE__*/React.createElement("span", {
    className: "ds-user-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ds-user-name"
  }, "Ada Okafor"), /*#__PURE__*/React.createElement("span", {
    className: "ds-user-mail"
  }, "ada@brightpay.co")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevrons-up-down",
    size: 16,
    style: {
      opacity: 0.5,
      marginLeft: "auto"
    }
  }))));
}
window.DashSidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Topbar.jsx
try { (() => {
const Icon = window.Icon;
function Topbar({
  onToggle
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "ds-topbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ds-icon-btn",
    onClick: onToggle,
    "aria-label": "Toggle sidebar"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "panel-left",
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    className: "ds-topbar-sep"
  }), /*#__PURE__*/React.createElement("form", {
    className: "ds-search",
    onSubmit: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 18
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search dashboard",
    "aria-label": "Search dashboard"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "ds-search-filter",
    "aria-label": "Filters"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sliders-horizontal",
    size: 18
  }))), /*#__PURE__*/React.createElement("button", {
    className: "ds-icon-btn",
    "aria-label": "Notifications"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell",
    size: 18
  })));
}
window.DashTopbar = Topbar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Topbar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Views.jsx
try { (() => {
const {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Switch,
  Avatar
} = window.VisualCNSDesignSystem_306574;
const Icon = window.Icon;
const STATUS = {
  "in-progress": {
    label: "In progress",
    bg: "var(--vcns-blue-100)",
    fg: "var(--vcns-blue-strong)"
  },
  review: {
    label: "In review",
    bg: "#fef3c7",
    fg: "#b45309"
  },
  done: {
    label: "Done",
    bg: "#d1fae5",
    fg: "#047857"
  },
  "on-hold": {
    label: "On hold",
    bg: "var(--muted)",
    fg: "var(--muted-foreground)"
  }
};
function Status({
  s
}) {
  const m = STATUS[s];
  return /*#__PURE__*/React.createElement("span", {
    className: "ds-status",
    style: {
      background: m.bg,
      color: m.fg
    }
  }, m.label);
}
const projects = [{
  title: "Storefront rebuild",
  service: "Full Web App",
  status: "in-progress",
  progress: 62,
  due: "Aug 12"
}, {
  title: "Discovery & scoping",
  service: "Discovery",
  status: "review",
  progress: 90,
  due: "Jul 30"
}, {
  title: "Brand system refresh",
  service: "Brand Systems",
  status: "done",
  progress: 100,
  due: "Jul 04"
}, {
  title: "Lead funnel automation",
  service: "Orbit workflow",
  status: "in-progress",
  progress: 38,
  due: "Aug 22"
}, {
  title: "Analytics dashboard",
  service: "Signal workflow",
  status: "on-hold",
  progress: 15,
  due: "—"
}];
function Kpi({
  label,
  value,
  sub
}) {
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: "20px 0",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(CardContent, null, /*#__PURE__*/React.createElement("p", {
    className: "ds-kpi-label"
  }, label), /*#__PURE__*/React.createElement("p", {
    className: "ds-kpi-value"
  }, value), /*#__PURE__*/React.createElement("p", {
    className: "ds-kpi-sub"
  }, sub)));
}
function ProjectsTable({
  rows
}) {
  return /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 0,
      gap: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-card-head"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "ds-card-title"
  }, "Active projects"), /*#__PURE__*/React.createElement(Button, {
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14,
    color: "currentColor"
  }), " New project")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 8px 8px"
    }
  }, /*#__PURE__*/React.createElement(Table, null, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement(TableRow, null, /*#__PURE__*/React.createElement(TableHead, null, "Project"), /*#__PURE__*/React.createElement(TableHead, null, "Service"), /*#__PURE__*/React.createElement(TableHead, null, "Status"), /*#__PURE__*/React.createElement(TableHead, null, "Progress"), /*#__PURE__*/React.createElement(TableHead, null, "Due"))), /*#__PURE__*/React.createElement(TableBody, null, rows.map((p, i) => /*#__PURE__*/React.createElement(TableRow, {
    key: i
  }, /*#__PURE__*/React.createElement(TableCell, {
    style: {
      fontWeight: 500
    }
  }, p.title), /*#__PURE__*/React.createElement(TableCell, {
    style: {
      color: "var(--muted-foreground)"
    }
  }, p.service), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement(Status, {
    s: p.status
  })), /*#__PURE__*/React.createElement(TableCell, null, /*#__PURE__*/React.createElement("div", {
    className: "ds-bar"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: p.progress + "%"
    }
  }))), /*#__PURE__*/React.createElement(TableCell, {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12
    }
  }, p.due)))))));
}
function Overview() {
  return /*#__PURE__*/React.createElement("div", {
    className: "ds-view"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-view-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "ds-eyebrow"
  }, "Client workspace"), /*#__PURE__*/React.createElement("h1", {
    className: "ds-h1"
  }, "Good afternoon, Ada")), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm"
  }, "Book a call")), /*#__PURE__*/React.createElement("div", {
    className: "ds-kpis"
  }, /*#__PURE__*/React.createElement(Kpi, {
    label: "Active projects",
    value: "4",
    sub: "2 in progress"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Open tasks",
    value: "11",
    sub: "3 due this week"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Awaiting review",
    value: "1",
    sub: "Discovery scope"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Spend \xB7 MTD",
    value: "$2,180",
    sub: "Priority retainer"
  })), /*#__PURE__*/React.createElement(ProjectsTable, {
    rows: projects.slice(0, 4)
  }));
}
function Projects() {
  return /*#__PURE__*/React.createElement("div", {
    className: "ds-view"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-view-head"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "ds-h1"
  }, "Projects"), /*#__PURE__*/React.createElement(Button, {
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14
  }), " New project")), /*#__PURE__*/React.createElement(ProjectsTable, {
    rows: projects
  }));
}
const tasks = [{
  t: "Approve homepage hero copy",
  done: false,
  tag: "Storefront rebuild"
}, {
  t: "Share brand assets for export",
  done: true,
  tag: "Brand system refresh"
}, {
  t: "Confirm payment gateway keys",
  done: false,
  tag: "Storefront rebuild"
}, {
  t: "Review discovery scope doc",
  done: false,
  tag: "Discovery & scoping"
}, {
  t: "Sign off on funnel automation map",
  done: true,
  tag: "Lead funnel automation"
}];
function Tasks() {
  const [state, setState] = React.useState(tasks);
  return /*#__PURE__*/React.createElement("div", {
    className: "ds-view"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-view-head"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "ds-h1"
  }, "Tasks")), /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 0,
      gap: 0
    }
  }, state.map((task, i) => /*#__PURE__*/React.createElement("label", {
    key: i,
    className: "ds-task"
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: task.done,
    onCheckedChange: v => setState(s => s.map((x, j) => j === i ? {
      ...x,
      done: v
    } : x))
  }), /*#__PURE__*/React.createElement("span", {
    className: "ds-task-text" + (task.done ? " done" : "")
  }, task.t), /*#__PURE__*/React.createElement("span", {
    className: "ds-task-tag"
  }, task.tag)))));
}
const files = ["Brand guidelines.pdf", "Homepage.fig", "Scope of work.docx", "Logo pack.zip", "Ad creatives", "Invoices"];
function Drive() {
  return /*#__PURE__*/React.createElement("div", {
    className: "ds-view"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-view-head"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "ds-h1"
  }, "Drive"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm"
  }, "Upload")), /*#__PURE__*/React.createElement("div", {
    className: "ds-files"
  }, files.map(f => /*#__PURE__*/React.createElement(Card, {
    key: f,
    style: {
      padding: 20,
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-file-ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "hard-drive",
    size: 18,
    color: "var(--accent)"
  })), /*#__PURE__*/React.createElement("p", {
    className: "ds-file-name"
  }, f)))));
}
function Marketing() {
  return /*#__PURE__*/React.createElement("div", {
    className: "ds-view"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ds-view-head"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "ds-h1"
  }, "Marketing"), /*#__PURE__*/React.createElement(Button, {
    size: "sm"
  }, "New campaign")), /*#__PURE__*/React.createElement("div", {
    className: "ds-marketing"
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      padding: 0,
      gap: 0,
      overflow: "hidden",
      maxWidth: 380
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ig-head"
  }, /*#__PURE__*/React.createElement(Avatar, {
    src: "../../assets/logo.svg",
    fallback: "V",
    size: 36,
    style: {
      background: "var(--vcns-ink)"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "ig-handle"
  }, "visualcns.studio"), /*#__PURE__*/React.createElement("p", {
    className: "ig-loc"
  }, "Lagos, Nigeria"))), /*#__PURE__*/React.createElement("div", {
    className: "ig-image"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/imagery/creative-studio-brand.jpg",
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "ig-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ig-actions"
  }, /*#__PURE__*/React.createElement("span", null, "\u2661 312"), /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCAC 24"), /*#__PURE__*/React.createElement("span", null, "\u2197 28")), /*#__PURE__*/React.createElement("p", {
    className: "ig-caption"
  }, /*#__PURE__*/React.createElement("strong", null, "visualcns.studio"), " Start with a free 45-minute discovery and scoping call. Leave with clearer next steps and a fixed quote for your build."), /*#__PURE__*/React.createElement("p", {
    className: "ig-tags"
  }, "#VisualCNS #DiscoveryCall #WebBuild"))), /*#__PURE__*/React.createElement("div", {
    className: "ds-metrics"
  }, /*#__PURE__*/React.createElement(Kpi, {
    label: "Reach \xB7 7d",
    value: "18.4k",
    sub: "+12% vs last week"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Leads captured",
    value: "63",
    sub: "Orbit workflow"
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Booked calls",
    value: "9",
    sub: "Cal.com"
  }))));
}
window.DashViews = {
  overview: Overview,
  projects: Projects,
  tasks: Tasks,
  drive: Drive,
  marketing: Marketing
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Views.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
const {
  BrandLockup
} = window.VisualCNSDesignSystem_306574;
const groups = [{
  number: "01",
  title: "Product",
  links: ["VisualHQ", "Pasive", "Juju", "Waddi", "Finance", "Pricing"]
}, {
  number: "02",
  title: "Company",
  links: ["Portfolio", "News", "Careers", "Contact"]
}, {
  number: "03",
  title: "Resources",
  links: ["Capabilities", "Industries"]
}];
const socials = ["X", "GH", "LI"];
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "site-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-top"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    "aria-label": "VisualCNS home"
  }, /*#__PURE__*/React.createElement(BrandLockup, {
    invert: true,
    logoSize: 52,
    logoSrc: "../../assets/logo.svg"
  })), /*#__PURE__*/React.createElement("p", {
    className: "footer-lede"
  }, "Software systems, product businesses, and AI-enabled tools built from Lagos for modern teams.")), /*#__PURE__*/React.createElement("div", {
    className: "footer-rule"
  }), /*#__PURE__*/React.createElement("div", {
    className: "footer-grid"
  }, groups.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.title
  }, /*#__PURE__*/React.createElement("h3", {
    className: "footer-h"
  }, /*#__PURE__*/React.createElement("span", {
    className: "footer-num"
  }, g.number), g.title), /*#__PURE__*/React.createElement("nav", {
    className: "footer-links"
  }, g.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#"
  }, l))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "footer-h"
  }, /*#__PURE__*/React.createElement("span", {
    className: "footer-num"
  }, "04"), "Stay looped in"), /*#__PURE__*/React.createElement("p", {
    className: "footer-note"
  }, "Send a note when you are ready to build, price, or ship the next system."), /*#__PURE__*/React.createElement("a", {
    className: "footer-mail",
    href: "#"
  }, /*#__PURE__*/React.createElement("span", null, "hello@pasive.co"), /*#__PURE__*/React.createElement("span", {
    className: "footer-join"
  }, "Join \u2192")))), /*#__PURE__*/React.createElement("div", {
    className: "footer-bottom"
  }, /*#__PURE__*/React.createElement("p", null, "\xA9 2026 VisualCNS Systems \xB7 Privacy \xB7 Terms"), /*#__PURE__*/React.createElement("div", {
    className: "footer-social"
  }, socials.map(s => /*#__PURE__*/React.createElement("a", {
    key: s,
    href: "#"
  }, s))))));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
const {
  useState
} = React;
const {
  BrandLockup,
  Button
} = window.VisualCNSDesignSystem_306574;
const productItems = [{
  name: "Pasive",
  desc: "Commerce tooling for storefronts and online sales."
}, {
  name: "Juju",
  desc: "AI-assisted campaign & marketing workflows."
}, {
  name: "Waddi",
  desc: "AI experience & event planning platform."
}, {
  name: "ColussusIQ",
  desc: "Marketing intelligence from campaign data."
}];
const consultingItems = [{
  name: "VisualHQ",
  desc: "Who we are and what we do."
}, {
  name: "Portfolio",
  desc: "Explore our work and client projects."
}, {
  name: "Capabilities",
  desc: "Browse every VisualHQ capability."
}, {
  name: "Industries",
  desc: "See the markets VisualHQ builds for."
}];
const secondary = ["Pricing", "Careers", "News"];
function HoverMenu({
  label,
  items,
  columns,
  open,
  onOpen,
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    },
    onMouseEnter: onOpen,
    onMouseLeave: onClose
  }, /*#__PURE__*/React.createElement("button", {
    className: "nav-trigger"
  }, label, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  }))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: "100%",
      paddingTop: 14,
      width: columns === 2 ? 480 : 256,
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "mega",
    style: {
      gridTemplateColumns: columns === 2 ? "1fr 1fr" : "1fr"
    }
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.name,
    className: "mega-item",
    href: "#"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mega-name"
  }, it.name), /*#__PURE__*/React.createElement("span", {
    className: "mega-desc"
  }, it.desc))))));
}
function Header() {
  const [products, setProducts] = useState(false);
  const [consulting, setConsulting] = useState(false);
  return /*#__PURE__*/React.createElement("header", {
    className: "site-header"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "site-nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-left"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    "aria-label": "VisualCNS home"
  }, /*#__PURE__*/React.createElement(BrandLockup, {
    logoSize: 28,
    logoSrc: "../../assets/logo.svg"
  })), /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, /*#__PURE__*/React.createElement(HoverMenu, {
    label: "Software",
    items: productItems,
    columns: 2,
    open: products,
    onOpen: () => setProducts(true),
    onClose: () => setProducts(false)
  }), /*#__PURE__*/React.createElement(HoverMenu, {
    label: "Consulting",
    items: consultingItems,
    columns: 1,
    open: consulting,
    onOpen: () => setConsulting(true),
    onClose: () => setConsulting(false)
  }), secondary.map(s => /*#__PURE__*/React.createElement("a", {
    key: s,
    className: "nav-trigger",
    href: "#"
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "nav-cta"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    shape: "pill"
  }, "Sign In"), /*#__PURE__*/React.createElement(Button, {
    shape: "pill"
  }, "Book Now"))));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomeSections.jsx
try { (() => {
const {
  useState
} = React;
const {
  Accordion
} = window.VisualCNSDesignSystem_306574;
const products = [{
  name: "Pasive",
  product: "Ecommerce"
}, {
  name: "Juju",
  product: "AI Marketing Suite"
}, {
  name: "Waddi",
  product: "AI Experience Planner"
}, {
  name: "ColussusIQ",
  product: "Marketing Intelligence"
}];
const capabilities = ["Product Engineering", "Business Automation", "AI Enablement", "Brand Systems"];
const news = ["AcademyPress and Ekenua&Co donate 1,500 copies of Animal Farm to Lagos students", "Honeywell Flour’s FY 2026 profit hits ₦21.9 billion, declares 20 kobo dividend", "New platform to link digital discovery with real events launched"];
function HomeAccordion() {
  return /*#__PURE__*/React.createElement("section", {
    className: "home-accordion"
  }, /*#__PURE__*/React.createElement(Accordion, {
    type: "multiple",
    defaultValue: ["intro"],
    items: [{
      value: "intro",
      trigger: "1. VisualCNS builds software systems for modern businesses.",
      content: "We design and engineer digital products across ecommerce, AI tooling, and experience platforms."
    }, {
      value: "products",
      trigger: "2. Products",
      content: /*#__PURE__*/React.createElement("ul", {
        className: "acc-list"
      }, products.map(p => /*#__PURE__*/React.createElement("li", {
        key: p.name
      }, /*#__PURE__*/React.createElement("a", {
        href: "#"
      }, p.name, " \u2014 ", p.product))))
    }, {
      value: "capabilities",
      trigger: "3. Capabilities",
      content: /*#__PURE__*/React.createElement("ul", {
        className: "acc-list"
      }, capabilities.map(c => /*#__PURE__*/React.createElement("li", {
        key: c
      }, /*#__PURE__*/React.createElement("a", {
        href: "#"
      }, c))))
    }, {
      value: "news",
      trigger: "4. News",
      content: /*#__PURE__*/React.createElement("ul", {
        className: "acc-list"
      }, news.map(n => /*#__PURE__*/React.createElement("li", {
        key: n
      }, /*#__PURE__*/React.createElement("a", {
        href: "#"
      }, n))))
    }]
  }));
}
const portfolio = [{
  excerpt: "A creative-studio brand identity system built for a Lagos design house.",
  img: "../../assets/imagery/creative-studio-brand.jpg",
  cat: "Brand"
}, {
  excerpt: "Dark, modern fintech dashboard for a payments team.",
  img: "../../assets/imagery/fintech-dashboard.jpg",
  cat: "Product"
}, {
  excerpt: "Conversion-focused website for a modern real-estate platform.",
  img: "../../assets/imagery/real-estate-website.png",
  cat: "Web"
}, {
  excerpt: "Orange-forward food delivery app interface and ordering flow.",
  img: "../../assets/imagery/food-delivery-app.jpg",
  cat: "Product"
}, {
  excerpt: "Professional consulting-firm brand identity and collateral.",
  img: "../../assets/imagery/consulting-brand.jpg",
  cat: "Brand"
}];
function Portfolio() {
  const cats = ["All", "Brand", "Product", "Web"];
  const [filter, setFilter] = useState("All");
  const shown = portfolio.filter(p => filter === "All" || p.cat === filter);
  return /*#__PURE__*/React.createElement("section", {
    className: "portfolio"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "pf-title"
  }, "Portfolio ", /*#__PURE__*/React.createElement("span", {
    className: "pf-count"
  }, "(", shown.length, ")")), /*#__PURE__*/React.createElement("div", {
    className: "pf-filters"
  }, cats.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    className: "pf-filter" + (filter === c ? " active" : ""),
    onClick: () => setFilter(c)
  }, c)))), /*#__PURE__*/React.createElement("ul", {
    className: "pf-list"
  }, shown.map((p, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "pf-row"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "pf-link"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pf-thumb"
  }, /*#__PURE__*/React.createElement("img", {
    src: p.img,
    alt: ""
  })), /*#__PURE__*/React.createElement("h3", {
    className: "pf-excerpt"
  }, p.excerpt), /*#__PURE__*/React.createElement("span", {
    className: "pf-cat"
  }, p.cat))))));
}
window.HomeAccordion = HomeAccordion;
window.Portfolio = Portfolio;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomeSections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Pricing.jsx
try { (() => {
const {
  useState
} = React;
const {
  Button,
  Badge
} = window.VisualCNSDesignSystem_306574;
const NGN_PER_USD = 1360;
function usd(n) {
  const raw = n / NGN_PER_USD;
  const r = raw < 50 ? 1 : 10;
  return Math.round(raw / r) * r;
}
function price(amount, cur, prefix = "", suffix = "") {
  if (amount === "free") return "Free";
  return cur === "USD" ? `${prefix}$${usd(amount).toLocaleString()}${suffix}` : `${prefix}₦${amount.toLocaleString()}${suffix}`;
}
const tabs = [{
  id: "technology",
  label: "Technology",
  blurb: "For businesses that need websites, web apps, platforms, or technical implementation."
}, {
  id: "workflows",
  label: "Workflows",
  blurb: "For businesses that need their existing tools connected into clear growth systems."
}, {
  id: "consulting",
  label: "Consulting",
  blurb: "For businesses that need ongoing support, improvements, and guidance."
}];
const offers = {
  technology: [{
    eyebrow: "Free",
    title: "Discovery & Scoping",
    amount: "free",
    timeline: "45 min",
    scope: "Fit, scope & build roadmap.",
    incl: "Fixed quote after call"
  }, {
    eyebrow: "Offer",
    title: "MVP Web App",
    amount: 1632000,
    timeline: "1 week",
    scope: "Up to 5 screens · 1 role · frontend only.",
    incl: "Static frontend (no auth/DB)"
  }, {
    eyebrow: "Offer",
    title: "Full Web App",
    amount: 3808000,
    timeline: "2 weeks",
    scope: "Up to 12 screens · 2–3 roles.",
    incl: "Frontend + backend + auth + DB",
    featured: true
  }, {
    eyebrow: "Offer",
    title: "Custom Web App",
    amount: 6120000,
    prefix: "From ",
    timeline: "4+ weeks",
    scope: "Marketplaces, streaming, payments.",
    incl: "Scoped per project"
  }, {
    eyebrow: "Platform",
    title: "Webflow Site",
    amount: 1292000,
    timeline: "3–5 days",
    scope: "Up to 7 pages · CMS · responsive.",
    incl: "Design, build, CMS & launch",
    chips: ["Webflow"]
  }, {
    eyebrow: "Platform",
    title: "Framer Site",
    amount: 1156000,
    timeline: "2–4 days",
    scope: "Up to 7 pages · interactive.",
    incl: "Design, animations & publish",
    chips: ["Framer"]
  }],
  workflows: [{
    eyebrow: "Workflow",
    title: "Marketing",
    amount: 200000,
    timeline: "Monthly",
    scope: "Run monthly content, ads & follow-up.",
    incl: "Strategy, ad management, automation",
    chips: ["Meta", "SendPulse", "Notion"]
  }, {
    eyebrow: "Workflow",
    title: "Orbit",
    amount: 680000,
    prefix: "From ",
    timeline: "Setup + monthly",
    scope: "Collect leads from every channel.",
    incl: "Lead routing, reminders, booking",
    chips: ["WhatsApp", "Gmail", "Cal.com"],
    featured: true
  }, {
    eyebrow: "Workflow",
    title: "Launch",
    amount: 850000,
    prefix: "From ",
    timeline: "Setup + monthly",
    scope: "Turn ad clicks into tracked leads.",
    incl: "Funnel map, CRM tagging, tracking",
    chips: ["Meta Ads", "Analytics", "CRM"]
  }],
  consulting: [{
    eyebrow: "Retainer",
    title: "Basic",
    amount: 340000,
    suffix: "/mo",
    timeline: "Monthly",
    scope: "Reliable monthly updates & support.",
    incl: "5 hrs/mo · 48-hour response"
  }, {
    eyebrow: "Retainer",
    title: "Priority",
    amount: 612000,
    suffix: "/mo",
    timeline: "Monthly",
    scope: "Faster support & regular check-ins.",
    incl: "12 hrs/mo · 24-hour response",
    featured: true,
    badge: "Most popular"
  }, {
    eyebrow: "Retainer",
    title: "Growth",
    amount: 800000,
    suffix: "/mo",
    timeline: "Monthly",
    scope: "Ongoing feature work & strategy.",
    incl: "25 hrs/mo · same-day response"
  }]
};
function OfferCard({
  o,
  cur
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "offer" + (o.featured ? " featured" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "offer-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "offer-eyebrow"
  }, o.eyebrow), o.badge ? /*#__PURE__*/React.createElement(Badge, null, o.badge) : /*#__PURE__*/React.createElement("span", {
    className: "offer-timeline"
  }, o.timeline)), /*#__PURE__*/React.createElement("h3", {
    className: "offer-title"
  }, o.title), /*#__PURE__*/React.createElement("p", {
    className: "offer-scope"
  }, o.scope), /*#__PURE__*/React.createElement("div", {
    className: "offer-price"
  }, price(o.amount, cur, o.prefix, o.suffix)), o.chips && /*#__PURE__*/React.createElement("div", {
    className: "offer-chips"
  }, o.chips.map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    className: "chip"
  }, c))), /*#__PURE__*/React.createElement("div", {
    className: "offer-incl"
  }, /*#__PURE__*/React.createElement("span", {
    className: "check"
  }, "\u2713"), o.incl), /*#__PURE__*/React.createElement(Button, {
    variant: o.featured ? "default" : "outline",
    style: {
      width: "100%",
      marginTop: 20
    }
  }, "Get plan"));
}
function Pricing() {
  const [cur, setCur] = useState("USD");
  const [tab, setTab] = useState("technology");
  const active = tabs.find(t => t.id === tab);
  return /*#__PURE__*/React.createElement("section", {
    className: "pricing"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pricing-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "pricing-kicker"
  }, "Choose currency"), /*#__PURE__*/React.createElement("p", {
    className: "pricing-sub"
  }, "View pricing in USD or Nigerian naira.")), /*#__PURE__*/React.createElement("div", {
    className: "cur-toggle"
  }, ["USD", "NGN"].map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    className: "cur-btn" + (cur === c ? " active" : ""),
    onClick: () => setCur(c)
  }, c)))), /*#__PURE__*/React.createElement("div", {
    className: "tab-track"
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: "tab" + (tab === t.id ? " active" : ""),
    onClick: () => setTab(t.id)
  }, t.label))), /*#__PURE__*/React.createElement("div", {
    className: "pricing-intro"
  }, /*#__PURE__*/React.createElement("p", {
    className: "pricing-kicker"
  }, active.label), /*#__PURE__*/React.createElement("h2", {
    className: "pricing-h2"
  }, active.blurb)), /*#__PURE__*/React.createElement("div", {
    className: "offer-grid"
  }, offers[tab].map(o => /*#__PURE__*/React.createElement(OfferCard, {
    key: o.title,
    o: o,
    cur: cur
  }))));
}
window.Pricing = Pricing;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Pricing.jsx", error: String((e && e.message) || e) }); }

__ds_ns.BrandLockup = __ds_scope.BrandLockup;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CardHeader = __ds_scope.CardHeader;

__ds_ns.CardTitle = __ds_scope.CardTitle;

__ds_ns.CardDescription = __ds_scope.CardDescription;

__ds_ns.CardContent = __ds_scope.CardContent;

__ds_ns.CardFooter = __ds_scope.CardFooter;

__ds_ns.Separator = __ds_scope.Separator;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.TableHeader = __ds_scope.TableHeader;

__ds_ns.TableBody = __ds_scope.TableBody;

__ds_ns.TableRow = __ds_scope.TableRow;

__ds_ns.TableHead = __ds_scope.TableHead;

__ds_ns.TableCell = __ds_scope.TableCell;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Label = __ds_scope.Label;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.DropdownMenu = __ds_scope.DropdownMenu;

})();
