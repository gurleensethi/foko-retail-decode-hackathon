import { useStyletron } from "baseui";
import { PageLayout } from "../components/page-layout/PageLayout";
import { useHistory } from "react-router-dom";

export const ConfirmationLoading = () => {
  const [css] = useStyletron();
  const history = useHistory();

  return (
    <PageLayout
      title=" "
      backButtonVisible={false}
      bottomButtonLabel="Track Order"
      onBottomBtnClicked={() => {
      history.push("/progress")
      }}
    >
    <div
      className={css({
        width: "250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "auto",
      })}
    >
      <h1 className={css({ textAlign: "center", fontWeight: "bold" })}>
        Your order has been placed
      </h1>
      <div
        className={css({
          height: "200px",
          width: "140px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px"
        })}
      >
        <div className="pulse"></div>
        <img
          src="/icons/location.svg"
          alt="location icon"
          className={css({ width: "40px" })}
        />
        
      </div>
      <p className={css({ textAlign: "center"})}>
        The store is currently reviewing your order. You’ll be notified once the order is confirmed. 
        </p>
    </div>
    </PageLayout>
  );
};

export default ConfirmationLoading;
