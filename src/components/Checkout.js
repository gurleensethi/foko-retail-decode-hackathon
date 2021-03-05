import React from 'react';
import { useStyletron } from "baseui";
import { PageLayout } from './page-layout/PageLayout'
import ChevronRight from 'baseui/icon/chevron-right';
import {StatefulMenu} from 'baseui/menu';
import {
  ListItemLabel,
  MenuAdapter,
  ARTWORK_SIZES,
} from 'baseui/list';
import { User, MapPin, Calendar, CreditCard, Tag, ShoppingCart, Clipboard} from 'react-feather'

const ITEMS = Array.of({
    title: 'Customer Information',
    infoLine1: 'Casey He',
    infoLine2: 'Casey123@gmail.com',
    icon: User,
  },
  {
    title: 'Store Location',
    infoLine1: '1936 Dundas St West',
    infoLine2: 'M72 B3H',
    icon: MapPin,
  },
  {
    title: 'Date & Time',
    infoLine1: 'March 10, 2021',
    infoLine2: '11:30 - 12:00 AM',
    icon: Calendar,
  },
  {
    title: 'Payment Method',
    infoLine1: 'Visa*5001',
    infoLine2: '12/2023',
    icon: CreditCard,
  },
  {
    title: 'Promo Code',
    infoLine1: '',
    infoLine2: '',
    icon: Tag,
  },
  {
    title: 'Items',
    infoLine1: '',
    infoLine2: '',
    icon: ShoppingCart,
  },
  {
    title: 'Add Instructions',
    infoLine1: '',
    infoLine2: '',
    icon: Clipboard,
  }
  );

const Checkout = () => {
    const [css] = useStyletron();

    return (
        <PageLayout 
            title="Checkout"
            bottomButtonLabel="Place Order"
            onBottomBtnClicked={() => alert("Your Order has been placed!")}
        >
        <StatefulMenu
            items={ITEMS}
            onItemSelect={() => console.log('select')}
            overrides={{
                List: {
                style: {
                    height: '600px',
                    width: '350px',
                },
                },
                Option: {
                props: {
                    overrides: {
                    ListItem: {
                        component: React.forwardRef((props, ref) => (
                        <MenuAdapter
                            {...props}
                            ref={ref}
                            artwork={props.item.icon}
                            artworkSize={ARTWORK_SIZES.MEDIUM}
                            endEnhancer={() => <ChevronRight />}
                        >
                            <ListItemLabel
                                description={props.item.infoLine2}>
                            {props.item.title}
                            <ListItemLabel
                                description={props.item.infoLine1}>
                            </ListItemLabel>
                            </ListItemLabel>
                        </MenuAdapter>
                        )),
                    },
                    },
                },
                },
            }}
        /> 
        <div>
            <h3 className={css({
                display: 'inline-block',
                margin: "20px"
                })}>
                Order Total:
            </h3>
            <p className={css({
                display: 'inline-block',
                margin: "20px",
                float: "right"
                })}> 
                $40.00</p>
        </div>
        </PageLayout>

    );
};

export default Checkout;