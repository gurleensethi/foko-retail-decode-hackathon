import React from "react";
import { useStyletron } from "baseui";
import { Button } from "baseui/button";
import { PageLayout } from "./page-layout/PageLayout";

const CustomerHome = () => {
  const [css] = useStyletron();

  return (
    <PageLayout
      title="Customer"
      bottomButtonLabel="Click Me!"
      onBottomBtnClicked={() => alert("Bottom Clicked")}
    >
      <div>
        <h2>This is the homepage for customers.</h2>
        <Button className={css({ margin: "20px" })}>
          I am a button from Uber
        </Button>
      </div>
    </PageLayout>
  );
};

export default CustomerHome;
