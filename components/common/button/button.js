import classNames from "classnames";

import styles from "./button.module.scss";

const Button = ({primary, ghost, children, className, disabled, ...props}) => (
  <button
    disabled={disabled}
    className={classNames(className, styles.button, {[styles.buttonPrimary]: primary && !ghost, [styles.buttonGhost]: ghost, })}
    {...props}
  >
    {children}
  </button>
)

export default Button;