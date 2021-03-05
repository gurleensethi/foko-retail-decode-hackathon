import React from "react";
import { HeadingSmall } from "baseui/typography";
import { useStyletron } from "baseui";
import { ArrowLeft } from "baseui/icon";
import { Button } from "baseui/button";

export const PageLayout = ({
  children,
  title,
  onBottomBtnClicked,
  bottomButtonLabel,
  bottom,
}) => {
  const [css] = useStyletron();

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          padding: "8px",
        })}
      >
        <ArrowLeft size={32} />
        <div className={css({ flex: 1, textAlign: "center" })}>
          <HeadingSmall margin="0" marginRight="32px">
            {title || "No Title Provided"}
          </HeadingSmall>
        </div>
      </div>
      <div className={css({ flex: 1, overflow: "scroll", padding: "16px" })}>
        {children}
      </div>
      <div
        className={css({
          padding: "16px",
          display: "flex",
          justifyContent: "center",
        })}
      >
        {typeof bottom === "function" ? (
          bottom()
        ) : (
          <Button
            onClick={onBottomBtnClicked}
            className={css({ width: "100%" })}
          >
            {bottomButtonLabel || "No Label Provided"}
          </Button>
        )}
      </div>
    </div>
  );
};
