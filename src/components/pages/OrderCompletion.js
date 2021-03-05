import React, {useState, useEffect} from "react";
import {
  AspectRatioBox,
  AspectRatioBoxBody,
} from 'baseui/aspect-ratio-box';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid'; 
import { Label2, Label3, Label4, Paragraph4 } from 'baseui/typography'
import { Block } from "baseui/block";
import { PageLayout } from "../page-layout/PageLayout";
import { useFirestore } from "reactfire";
import { useStyletron } from "baseui";
import {
  CheckCircle,
  User,
  MapPin,
  Calendar,
  CreditCard,
  Tag,
  ShoppingCart,
  Clipboard,
} from "react-feather";

const OrderCompletion = (props) => {
  const firestore = useFirestore();
  
  const [css] = useStyletron();
  
  const [isLoading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [productInfos, setProductInfo] = useState([]);

  const { orderId } = props; 

  const docRef = firestore.collection("orders").doc(orderId || "demo_order");
 
  useEffect(() => {
    docRef.get().then((doc) => {
      if (doc.data()) {
          console.log("Document data:", doc.data());
          setOrder(doc.data());
          return doc.data()
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).finally((result)=>{
      console.log("hello")
      const itemKeys = Object.keys(result);
      console.log(itemKeys);
      const itemsRef = firestore.collection("items");
      let tmpProductInfo = new Array();
      itemKeys.forEach((key) => {
        console.log("key", key)
        itemsRef.doc(key).get()
        .then((doc) => {

          let productData = doc.data();
          if (productData) {
            productData['count'] = order?.items[key];
            console.log("ProductData:", productData);
            tmpProductInfo.push(productData)
          }
        })
      })
      setProductInfo(tmpProductInfo);
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });}
  , [firestore]);

  const deliveryInfo = new Object();
  const paymentInfo = new Object();


  const _tmpOrder = [
    { name: "Grape", 
      count: 1,
      price: 20,
      img: ""
    },
    { name: "Lemon",
      count: 1,
      price: 20,
      img: ""
    } 
  ];

  return (
    <PageLayout title="Order Completed" bottomButtonLabel="Place Order" onBottomBtnClicked={()=>console.log("clicked")}>
      <div className={css({ flex: 1, textAlign: "center" })}>
        <Label2 color="#4F4F4F"> Thank you for your order!</Label2>
      </div>
      <CheckedBlock>
        <BottomDividerBlock>
          <ProductTable order={productInfos || _tmpOrder}/>
        </BottomDividerBlock>
        <SummaryGrid data={[]}/>
        <ItemsOrdered orderId={orderId}/>
      </CheckedBlock>
      {/* Order Total Section */}
      <FlexGrid
        flexGridColumnCount={2}
        flexGridColumnGap="scale300"
        flexGridRowGap="scale100"
        padding="scale500"
      >
        <FlexGridItem>
          <Label3>Order Total</Label3>
        </FlexGridItem>
        <FlexGridItem {...narrowItemProps}>
          <Label2>${Number(props.totalPrice || 40).toFixed(2)}</Label2>
        </FlexGridItem>
      </FlexGrid>

      {/* Pickup at section */}
      <SummarySection subtitle="Pickup at" line1={deliveryInfo?.streetName} line2={deliveryInfo?.postalCode}/>
      <SummarySection subtitle="Date & Time" line1={deliveryInfo?.date || new Date().toDateString()} line2={deliveryInfo?.time || "11:30 - 12:00 AM"} />
      <SummarySection subtitle="Payment Method" line1={paymentInfo?.card || "VISA *5000"} line2={paymentInfo?.cardExpiryDate || "12/2023"} />
    </PageLayout>
  )
};

const SummaryGrid = (props) => {
  const data = {props};

  <FlexGrid
    flexGridColumnCount={2}
  >
    {data.map((row) => (
      <FlexGridItem>
        <SummarySection subtitle={row[0]} line1={row[1]} line2={row[2]}/>
      </FlexGridItem>
    ))}
  </FlexGrid>


}
const SummarySection = (props) => {
  const { subtitle, line1, line2 } = props;
  return (
      <FlexGrid 
        flexDirection="column"
        padding="scale500">
        <FlexGridItem>
          <Label2 color="#828282">{subtitle}</Label2>
        </FlexGridItem>
        <FlexGridItem>
          {line1 || "1936 Dundas St West"}
        </FlexGridItem>
        <FlexGridItem>
          {line2 || "M72 B3H"}
        </FlexGridItem>
      </FlexGrid>
  ) 
}

const BottomDividerBlock = (props) => {
  const { children } = props;
  return (
    <Block $style={{borderBottom: `1px solid ${props?.color || "#e6e4ea"}`}}>
        {children}
    </Block>
  )
}

const CheckedBlock = (props) => {
  const {children} = props;
  return (
    <>
      <Block $style={{border: "1px solid #E6E4EA", borderRadius: "10px", position: "relative", backgroundColor: "#FFFFFF", marginTop: "22px", padding: "20px"}}>
        <div style={{position: "absolute", top: "-19px", right:"50%", background: "white", padding: "0 3px"}}>
          <CheckCircle size={40} color="#49AD73"/>
        </div>
        <div style={{paddingTop: "30px"}}>
        hellolkfjewlkjflewjflewjfl
        {children}

        </div>
      </Block>
    </>
  )
}
const itemProps = {
  // backgroundColor: 'mono300',
  height: 'scale2000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const narrowItemProps = {
  ...itemProps,
  overrides: {
    Block: {
      style: ({$theme}) => ({
        width: $theme.sizing.scale1600,
        flexGrow: 0,
      }),
    },
  },
};

const ProductTable = (props) => {
  const { order } = props;
  return (
    <FlexGrid padding="scale700" flexDirection="column" flexGridRowGap="scale500">
      {order.map(row => {
        return (
          <FlexGridItem>
            <ProductRow productInfo={row}/>
          </FlexGridItem>
        )
      })}
    </FlexGrid>
  )
}
const ProductRow = (props) => {
  /*
  * < productInfo >
  * - name
  * - count
  * - price
  * - img
  */
  const { productInfo } = props;

  return (
    <FlexGrid
      flexGridColumnCount={3}
      flexGridColumnGap="scale300"
    >
      <FlexGridItem {...narrowItemProps}>
        <SquaredImage src={productInfo?.img || 'https://source.unsplash.com/user/erondu/300x300'}/>
      </FlexGridItem>
      <FlexGridItem {...itemProps} justifyContent="start" >
        <Label4>
          {productInfo?.name || "Product"}({productInfo?.count || 1})
        </Label4>
      </FlexGridItem>
      <FlexGridItem {...narrowItemProps}>
        <Paragraph4>
          ${Number(productInfo?.price * productInfo?.count || 20.00).toFixed(2)}
        </Paragraph4>
      </FlexGridItem>
    </FlexGrid>)
}

const SquaredImage = (props) => { 
  const { src } = props;
  return (
    <AspectRatioBox width="scale1400" style={{borderRadius: "5px", border: "1px solid #e6e4ea"}}>
      <AspectRatioBoxBody
        as="img"
        src={src}
      />
    </AspectRatioBox>
)}

export default OrderCompletion;