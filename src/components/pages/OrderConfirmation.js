import React from "react";
import {
  Card,
  StyledBody,
  StyledAction,
  StyledThumbnail,
} from 'baseui/card';
import {
  AspectRatioBox,
  AspectRatioBoxBody,
} from 'baseui/aspect-ratio-box';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid'; 
import { Label2, Label3, Label4, Paragraph4 } from 'baseui/typography'
import { Block } from "baseui/block";
import { styled } from "baseui";
import { PageLayout } from "../page-layout/PageLayout";

export default (props) => {
  const { orders, user } = props; //order: [{item: "product", number: 2}, ]
  return (
    <PageLayout title="Order Confirmation" bottomButtonLabel="Place Order" onBottomBtnClicked={()=>console.log("clicked")}>
      <BottomDividerBlock color="#181818">
        <ProductTable/>
      </BottomDividerBlock>
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
      <SummarySection subtitle="Pickup at" line1="1936 Dundas St West" line2="M72 B3H"/>
      <SummarySection subtitle="Date & Time" line1="March 10, 2021" line2="11:30 - 12:00 AM" />
      <SummarySection subtitle="Payment Method" line1="VISA *5000" line2="12/2023" />
    </PageLayout>
  )
};

const SummarySection = (props) => {
  const { subtitle, line1, line2 } = props;
  return (
    <BottomDividerBlock color="#CBCBCB">
      <FlexGrid 
        flexDirection="column"
        padding="scale500">
        <FlexGridItem>
          <Label2>{subtitle}</Label2>
        </FlexGridItem>
        <FlexGridItem>
          {line1 || "1936 Dundas St West"}
        </FlexGridItem>
        <FlexGridItem>
          {line2 || "M72 B3H"}
        </FlexGridItem>
      </FlexGrid>
    </BottomDividerBlock>
  ) 
}
const BottomDividerBlock = (props) => {
  const { children } = props;
  return (
    <Block $style={{borderBottom: `2px solid ${props?.color || "black"}`}}>
      {children}
    </Block>
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
  return (
    <FlexGrid padding="scale700" flexDirection="column" flexGridRowGap="scale500">
      <FlexGridItem>
        <ProductRow/>
      </FlexGridItem>
      <FlexGridItem>
        <ProductRow/>
      </FlexGridItem>
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
    <AspectRatioBox width="scale1400">
      <AspectRatioBoxBody
        as="img"
        src={src}
      />
    </AspectRatioBox>
)}