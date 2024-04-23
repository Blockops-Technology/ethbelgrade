import classNames from "classnames";

import styles from "./button.module.scss";

const Button = ({primary, ghost, children, className, disabled, styleType, ...props}) => {
  let applyStyle;

  switch (styleType) {
    case "blue":
      applyStyle = styles.buttonBlue;
      break;
    case "green":
      applyStyle = styles.buttonGreen;
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