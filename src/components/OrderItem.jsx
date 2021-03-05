  
import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { ChevronRight } from "baseui/icon";
import { HeadingXSmall, ParagraphSmall } from "baseui/typography";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";

// function getTagColor(status) {
//   switch (status) {
//     case "pending":
//       return "yellow";
//     case "unfulfilled":
//       return "orange";
//     default:
//       return "black";
//   }
// }

function getStatusIcon(status) {
  switch (status) {
    case "pending":
      return "/icons/pending.svg";
    case "unfulfilled":
      return "/icons/open-box.svg";
    case "fulfilled":
      return "/icons/box.svg";
    default:
      return "/icons/open-box.svg";
  }
}

export const OrderItem = ({ order }) => {
  const [css] = useStyletron();
  const history = useHistory();

  return (
    <div>
      <Block
        padding="16px"
        className={css({ border: "1px solid #e1e1e1", borderRadius: "8px" })}
        marginBottom="16px"
        onClick={() => history.push(`/retailer/process-order/${order.id}`)}
      >
        <Block display="flex">
          <Block flex="1">
            <Block display="flex">
              <HeadingXSmall
                flex="1"
                margin="0px 0px 0px 0px"
                className={css({ fontWeight: "bold" })}
                color="#333333"
              >
                # {order.id}
              </HeadingXSmall>
              <img
                src={getStatusIcon(order.status.toLowerCase())}
                alt="order"
                height="24px"
              />
            </Block>
            <Block
              margin="8px 0px"
              height="1px"
              width="100%"
              backgroundColor="lightgrey"
            />
            <Block display="flex">
              <Block flex="1">
                <ParagraphSmall
                  margin="0"
                  className={css({ fontWeight: "bold", opacity: 0.9 })}
                  color="#4F4F4F"
                >
                  Customer Details
                </ParagraphSmall>
                <ParagraphSmall margin="0">{order.customerName}</ParagraphSmall>
                <ParagraphSmall margin="0px 0px 8px 0px">
                  {order.email}
                </ParagraphSmall>
                <ParagraphSmall
                  margin="0"
                  className={css({ fontWeight: "bold", opacity: 0.9 })}
                  color="#4F4F4F"
                >
                  Pickup Information
                </ParagraphSmall>
                <ParagraphSmall margin="0px 0px 0px 0px" color="#828282">
                  {format(
                    new Date(order.pickupAt.seconds * 1000),
                    "MMMM dd, yyyy • hh:mm a"
                  )}
                </ParagraphSmall>
                <ParagraphSmall margin="0px 0px 0px 0px" color="#828282">
                  {order.instructions}
                  |{" "}
                  {Object.keys(order.items).length} Items
                </ParagraphSmall>
              </Block>
              <Block
                display="flex"
                flexDirection="column"
                justifyContent="center"
                paddingTop="6px"
              >
                <ChevronRight size={32} />
              </Block>
            </Block>
            {/* <Block display="inline" marginLeft="-8px">
            {order.isPaid && (
              <Tag variant="solid" closeable={false} kind="green">
                Paid
              </Tag>
            )}
            {!order.isPaid && (
              <Tag variant="solid" closeable={false} kind="brown">
                Unpaid
              </Tag>
            )}
          </Block>
          <Tag
            variant="solid"
            closeable={false}
            kind={getTagColor(order.status)}
          >
            {order.status[0].toUpperCase() + order.status.substr(1)}
          </Tag> */}
          </Block>
        </Block>
      </Block>
    </div>
  );
};
