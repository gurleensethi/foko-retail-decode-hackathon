import { useStyletron } from "baseui";
import { Paragraph1 } from "baseui/typography";

export const ConfirmationLoading = () => {
  const [css] = useStyletron();

  return (
    <div
      className={css({
        width: "240px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <div
        className={css({
          height: "100px",
          width: "140px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        })}
      >
        <div className="pulse"></div>
        <img
          src="/icons/location.svg"
          alt="location icon"
          className={css({ width: "40px" })}
        />
      </div>
      <Paragraph1 className={css({ textAlign: "center", fontWeight: "bold" })}>
        Your order is on its way...hang tight for a confirmation.
      </Paragraph1>
    </div>
  );
};
