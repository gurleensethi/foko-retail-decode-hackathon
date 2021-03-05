import React from "react";
import { useStyletron } from "baseui";
import { Button } from "baseui/button";

const CustomerHome = () => {
  const [css] = useStyletron();

  return (
    <div>
      <h2>This is the homepage for customers.</h2>
      <Button className={css({ margin: "20px" })}>
        I am a button from Uber
      </Button>
    </div>
  );
};

export default CustomerHome;
