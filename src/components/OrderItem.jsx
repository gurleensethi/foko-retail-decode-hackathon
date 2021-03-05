import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { ChevronRight } from "baseui/icon";
import { HeadingXSmall, ParagraphSmall } from "baseui/typography";

function getTagColor(status) {
  switch (status) {
    case "pending":
      return "yellow";
    case "unfulfilled":
      return "orange";
    default:
      return "black";
  }
}

function getStatusIcon(status) {
  switch (status) {
    case "pending":
      return "/icons/pending.svg";
    case "unfulfilled":
      return "/icons/open-box.svg";
    case "fulfilled":
      return "/icons/box.svg";
    default:
      return "";
  }
}

export const OrderItem = ({ order }) => {
  const [css] = useStyletron();

  return (
    <Block>
      <Block display="flex">
        <Block flex="1">
          <Block display="flex">
            <HeadingXSmall
              margin="0"
              marginRight="16px"
              className={css({ fontWeight: "bold" })}
            >
              {order.displayId}
            </HeadingXSmall>
          </Block>
          <ParagraphSmall margin="0">{order.name}</ParagraphSmall>
          <ParagraphSmall margin="0">{order.email}</ParagraphSmall>
          <ParagraphSmall
            margin="0"
            marginBottom="8px"
            className={css({ letterSpacing: "0.2px" })}
          >
            {order.date}
          </ParagraphSmall>
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
        <Block
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          paddingTop="6px"
        >
          <img src={getStatusIcon(order.status)} alt="order" height="32px" />
          <ChevronRight size={32} />
        </Block>
      </Block>
      <Block
        margin="16px 0px"
        height="1px"
        width="100%"
        backgroundColor="lightgrey"
      />
    </Block>
  );
};
