import { useStyletron } from "baseui";
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";
import {
  HeadingXSmall,
  ParagraphMedium,
  ParagraphSmall,
  ParagraphXSmall,
} from "baseui/typography";
import { useEffect, useState } from "react";
import { useFirestore } from "reactfire";
import { Checkbox } from "baseui/checkbox";

const OrderItem = ({ item, enableCheckbox, onCheckChanged }) => {
  const [css] = useStyletron();

  return (
    <Block display="flex" marginBottom="16px" alignItems="center">
      {enableCheckbox && (
        <Checkbox
          checked={item.isChecked}
          onChange={(e) => onCheckChanged(e.target.checked)}
        />
      )}
      <Block marginRight="16px">
        <img
          className={css({
            objectFit: "cover",
            borderRadius: "6px",
            border: "1px solid #e1e1e1",
          })}
          src={item.imageUrl}
          alt="item pic"
          height="100px"
          width="100px"
        />
      </Block>
      <Block flex="1">
        <ParagraphXSmall margin="0px" color="#828282">
          {item.brand}
        </ParagraphXSmall>
        <ParagraphMedium margin="0px" className={css({ fontWeight: "bold" })}>
          {item.name}
        </ParagraphMedium>
        <ParagraphSmall margin="0px" color="#828282">
          Item No: {item.itemId}
        </ParagraphSmall>
        <ParagraphSmall margin="0px" className={css({ fontWeight: "bold" })}>
          {item.name}
        </ParagraphSmall>
        <ParagraphSmall margin="0px" className={css({})}>
          ${item.price}
        </ParagraphSmall>
      </Block>
      <Block>
        <ParagraphMedium margin="0px" className={css({ fontWeight: "bold" })}>
          x{item.quantity}
        </ParagraphMedium>
      </Block>
    </Block>
  );
};

export const ItemsOrdered = ({
  orderId,
  enableCheckbox = false,
  onCheckChanged,
}) => {
  const [css] = useStyletron();
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const firestore = useFirestore();

  useEffect(() => {
    const ordersRef = firestore.collection("orders").doc(orderId);
    ordersRef.get().then((snapshot) => {
      const items = snapshot.data().items;
      Promise.all(
        Object.keys(items)
          .sort()
          .map((itemId) => {
            const itemRef = firestore.collection("items").doc(itemId);
            return itemRef.get().then((itemSnapshot) => {
              return {
                id: itemId,
                ...itemSnapshot.data(),
                quantity: items[itemId],
                isChecked: false,
              };
            });
          })
      ).then((items) => {
        setItems(items);
        setLoading(false);
      });
    });
  }, [firestore, orderId]);

  return (
    <Block
      width="100%"
      padding="16px"
      className={css({ border: "1px solid #e1e1e1", borderRadius: "8px" })}
    >
      <HeadingXSmall
        margin="0px 0px 0px 0px"
        className={css({ fontWeight: "bold" })}
        color="#333333"
      >
        Items Ordered
      </HeadingXSmall>
      <Block
        margin="8px 0px 16px 0px"
        height="1px"
        width="100%"
        backgroundColor="lightgrey"
      />
      {isLoading ? (
        <Block margin="0 auto" display="flex" justifyContent="center">
          <Spinner size="32px" color="black" />
        </Block>
      ) : (
        <Block>
          <Block className="fade-in">
            {items.map((item) => (
              <OrderItem
                item={item}
                key={item.id}
                enableCheckbox={enableCheckbox}
                onCheckChanged={(isChecked) => {
                  let allItemsChecked = true;

                  setItems((items) => {
                    const newItems = items.map((data) => {
                      if (data.id === item.id) {
                        allItemsChecked = allItemsChecked && isChecked;
                        return { ...data, isChecked };
                      }
                      allItemsChecked = allItemsChecked && data.isChecked;
                      return data;
                    });

                    if (onCheckChanged) {
                      onCheckChanged(allItemsChecked);
                    }

                    return newItems;
                  });
                }}
              />
            ))}
          </Block>
          <Block
            margin="8px 0px 16px 0px"
            height="1px"
            width="100%"
            backgroundColor="lightgrey"
          />
          <Block
            display="flex"
            justifyContent="space-between"
            marginBottom="8px"
          >
            <ParagraphMedium margin="0px" color="#828282">
              Total Items
            </ParagraphMedium>
            <ParagraphMedium margin="0px" color="#828282">
              {items.length}
            </ParagraphMedium>
          </Block>
          <Block
            display="flex"
            justifyContent="space-between"
            marginBottom="8px"
          >
            <ParagraphMedium margin="0px" color="#828282">
              Subtotal
            </ParagraphMedium>
            <ParagraphMedium margin="0px" color="#828282">
              ${items.reduce((total, item) => total + item.price, 0)}
            </ParagraphMedium>
          </Block>
          <Block
            display="flex"
            justifyContent="space-between"
            marginBottom="8px"
          >
            <ParagraphMedium margin="0px" color="#828282">
              Tax
            </ParagraphMedium>
            <ParagraphMedium margin="0px" color="#828282">
              ${items.reduce((total, item) => total + item.price, 0) * 0.15}
            </ParagraphMedium>
          </Block>
          <Block
            display="flex"
            justifyContent="space-between"
            marginBottom="8px"
          >
            <ParagraphMedium
              margin="0px"
              className={css({ fontWeight: "bold" })}
            >
              Total
            </ParagraphMedium>
            <ParagraphMedium
              margin="0px"
              className={css({ fontWeight: "bold" })}
            >
              ${items.reduce((total, item) => total + item.price, 0) * 1.15}
            </ParagraphMedium>
          </Block>
        </Block>
      )}
    </Block>
  );
};
