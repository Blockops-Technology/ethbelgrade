import classNames from "classnames";

import styles from "./button.module.scss";

const Button = ({primary, ghost, children, className, disabled, styleType, ...props}) => {
  let applyStyle;

  switch (styleType) {
    case "blue":
      applyStyle = styles.buttonBlue;
      break;
    case "purple":
      applyStyle = styles.buttonPurple;
      break;
    case "pink":
      applyStyle = styles.buttonPink;
      break;
    case "emerald":
      applyStyle = styles.buttonEmerald;
      break;
    case "yellow":
      applyStyle = styles.buttonYellow;
      break;
    case "red":
      applyStyle = styles.buttonRed;
      break;
    default:
      applyStyle = "";
  }

  return (
    <button
      disabled={disabled}
      className={classNames(className, styles.button, {[styles.buttonPrimary]: primary && !ghost, [styles.buttonGhost]: ghost, [applyStyle]: applyStyle })}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button;