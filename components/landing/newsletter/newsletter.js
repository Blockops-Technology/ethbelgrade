import { useState } from "react";
import { useFormspark } from "@formspark/use-formspark";

import styles from "./newsletter.module.scss";
import Button from "../../common/button/button";
import { toast } from "react-toastify";

const FORMSPARK_FORM_ID = "RTyF5jW2";
const Newsletter = () => {
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });
  const [email, setEmail] = useState("");
  const onInputChange = (e) => setEmail(e.target.value);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const submitForm = async (e) => {
    if (!email) {
      toast.error("Email required")
      return;
    };

    if (!validateEmail(email)) {
      toast.error("Not a valid email address")
      return;
    }

    await submit({ email });
    toast.success("Form submitted");
  };

  return (
    <div className={styles.newsletter}>
      <div className="container">
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <p className={styles.title}>Newsletter</p>
            <p className={styles.text}>Don&apos;t miss anything important about ETH Belgrade*</p>
          </div>
          <div className={styles.form}>
            <div className={styles.inputWrapper}>
              <input value={email} onChange={onInputChange} type="text" placeholder="enter your email" />
              <p className={styles.disclaimer}>*Only essential information. We promise.</p>
            </div>
            <Button onClick={submitForm} className={styles.button}>Sign up</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;