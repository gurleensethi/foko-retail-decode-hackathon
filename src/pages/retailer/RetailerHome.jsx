import { Block } from "baseui/block";
import { ChevronRight } from "baseui/icon";
import { HeadingXSmall,HeadingMedium, ParagraphSmall } from "baseui/typography";
import { PageLayout } from "../../components/page-layout/PageLayout";
import { SearchBar } from "../../components/SearchBar";
import { Button } from "baseui/button";
import {useHistory } from "react-router-dom";
import { useStyletron } from "baseui";
import { useFirestore } from "reactfire";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import {Tag, KIND} from 'baseui/tag';
import { Spinner } from "baseui/spinner";
import { Icon } from 'semantic-ui-react'

export const ReatilerHome = () => {
  const history = useHistory();
  const [css] = useStyletron();
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const firestore = useFirestore();

  useEffect(() => {
    const ordersRef = firestore.collection("orders");

    const disconnect = ordersRef.onSnapshot((snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => disconnect();
  }, [firestore]);
    console.log(orders);

    const TodayOrdes= orders?.find(order=> order.status === "fulfilled")
    const pending=orders?.filter(order=>order.status === "pending")
    console.log({pending})
  const handleAllOrdersClicked = () => {
    history.push("/retailer/upcoming-orders");
  };
  const handleConfirmedordersClicked = () => {
    history.push("/retailer/upcoming-orders");
  };
  return (
    <PageLayout backButtonVisible={false} title="Curbside" bottom={() => null}>
      <SearchBar />
      {isLoading ? (
        <Block margin="0 auto" display="flex" justifyContent="center">
          <Spinner size="32px" color="black" />
        </Block>
      ) : (
        <>
      <Block padding="16px 0px">
        <Block display="flex" alignItems="center">
          <Block flex="1">
            <HeadingXSmall margin="0">  <Icon name='map marker alternate' size='mini' />Store Location</HeadingXSmall>
            <ParagraphSmall margin="0">1936 Dundas St West</ParagraphSmall>
            <ParagraphSmall margin="0">M72 B3H</ParagraphSmall>
          </Block>
          <ChevronRight size={40} />
        </Block>
        <Block
          marginTop="8px"
          height="1px"
          width="100%"
          backgroundColor="lightgrey"
        />
      </Block>


      <Block
        padding="16px"
        className={css({ border: "1px solid #e1e1e1", borderRadius: "8px" })}
        marginBottom="16px"
        // onClick={() => history.push(`/retailer/process-order/${order.id}`)}
      >
        <Block display="flex" alignItems="center">
          <Block flex="1" flexDirection="row">
            <Block display="flex">
              <HeadingMedium
                flex="1"
                margin="0px 0px 0px 0px"
                className={css({ fontWeight: "bold" })}
                color="#333333"
              >
                Today's Orders          
              </HeadingMedium>
              <ChevronRight size={36} onClick={handleConfirmedordersClicked}/>
            </Block>
            </Block>
            </Block>
            <Block
              margin="8px 0px"
              height="1px"
              width="100%"
              backgroundColor="lightgrey"
            />
              <ParagraphSmall margin="0" 
              color="#4F4F4F"
              className={css({ fontWeight: "bold", opacity: 0.9 })}>
                Next PickUp
              </ParagraphSmall>
              {TodayOrdes?<>
                <ParagraphSmall margin="0">Order#{TodayOrdes.id}</ParagraphSmall> 
                <ParagraphSmall margin="0">{TodayOrdes.customerName}</ParagraphSmall> 
                <ParagraphSmall margin="0">{format(
                    new Date(TodayOrdes.pickupAt.seconds * 1000),
                    "MMMM dd, yyyy • hh:mm a"
                  )} </ParagraphSmall> 
          <Block display="flex" marginTop="24px" justifyContent="center"
          padding="5px 100px">
          <Button
            shape="pill"
            size="large"
            padding="5px 100px"
            onClick={handleConfirmedordersClicked}
          >
            View All
          </Button>
        </Block>
            </>:
           <ParagraphSmall margin="0">No order for today</ParagraphSmall> }
            </Block>

            <Block display="flex" alignItems="center"         
            padding="16px"
        className={css({ border: "1px solid #e1e1e1", borderRadius: "8px" })}
        marginBottom="16px">
          <Block flex="1" flexDirection="row">
            <Block display="flex">
              <HeadingMedium
                flex="1"
                margin="0px 0px 0px 0px"
                className={css({ fontWeight: "bold" })}
                color="#333333"
              >
                All Orders          
              </HeadingMedium>
              <ChevronRight size={36} onClick={handleConfirmedordersClicked}/>
            </Block>
            <Tag kind={KIND.warning}>{pending.length} Pending</Tag>
            </Block>
            </Block>
      
      </>
      )}
    </PageLayout>
  );
};
