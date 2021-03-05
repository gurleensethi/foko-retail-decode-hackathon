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
import {Checkbox, STYLE_TYPE} from 'baseui/checkbox';
import {SnackbarElement} from 'baseui/snackbar';
import Check from 'baseui/icon/check';

export const ReatilerHome = () => {
  const history = useHistory();
  const [css] = useStyletron();
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const firestore = useFirestore();
  const [checkboxes, setCheckboxes] = useState([
    false,
    false,
  ]);
  useEffect(() => {
    const ordersRef = firestore.collection("orders");

    const disconnect = ordersRef.onSnapshot((snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => disconnect();
  }, [firestore]);
    console.log({checkboxes});

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
          {/* <ChevronRight size={40} /> */}
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
        className={css({ border: "1px solid #e1e1e1", borderLeft: "solid 8px black", borderRadius: "8px" })}
        marginBottom="16px"
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
          <Block display="flex" marginTop="24px" justifyContent="stretch" alignItems="stretch"
         >
          <Button
            shape="pill"
            size="large"
           
            $style={{ width: "100%" }}
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
        className={css({ border: "1px solid #e1e1e1",  borderLeft: "solid 8px #3f3f3f ", borderRadius: "8px" })}
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
              <ChevronRight size={36} onClick={handleAllOrdersClicked}/>
            </Block>
            <Tag kind={KIND.warning} closeable={false}>{pending.length} Pending</Tag>
            </Block>
            </Block>
      
      <Block
        padding="16px"
        className={css({ border: "1px solid #e1e1e1", borderLeft: "solid 8px #3f3f3f ",borderRadius: "8px" })}
        marginBottom="16px"
      >
        <Block display="flex" alignItems="left">
          <Block flex="1">
            <Block display="flex">
              <HeadingMedium
                flex="1"
                margin="0px 0px 0px 0px"
                className={css({ fontWeight: "bold" })}
                color="#333333"
              >
                Messages          
              </HeadingMedium>
              <Checkbox
        checked={checkboxes[0]}
        onChange={e => {
          const nextCheckboxes = [...checkboxes];
          nextCheckboxes[0] = e.currentTarget.checked;
          setCheckboxes(nextCheckboxes);
        }}
        checkmarkType={STYLE_TYPE.toggle_round}
      />
                  </Block>
            </Block>
            </Block>
              <ParagraphSmall margin="0" 
              color="#4F4F4F"
              className={css({ fontWeight: "bold", opacity: 0.9 })}>
                Turn on automated replies during rush hours.
              </ParagraphSmall>
              {checkboxes[0] && <Block  display="flex" marginTop="24px" justifyContent="stretch" alignItems="stretch">
<SnackbarElement
$style={{ width: "100%" }}
          startEnhancer={({size}) => <Check size={size} />}
          message="You are chatting with the store"
          focus={false}
        />
        </Block>}
                
            </Block>

      </>
      )}
    </PageLayout>
  );
};
