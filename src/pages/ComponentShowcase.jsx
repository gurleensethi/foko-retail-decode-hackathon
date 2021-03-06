import { useStyletron } from "baseui";
import { ConfirmationLoading } from "../components/ConfirmationLoading";
import { ItemsOrdered } from "../components/ItemsOrdered";

export const ComponentShowcase = () => {
  const [css] = useStyletron();

  return (
    <div
      className={css({
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      })}
    >
      <p>
        This page is for internal use only. A list of all custom components.
      </p>
      <ConfirmationLoading />
      <ItemsOrdered orderId="demo_order" />
    </div>
  );
};
