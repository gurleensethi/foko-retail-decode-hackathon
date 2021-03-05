import React, { useState } from 'react';
import ProductSelectionCard from "./productSelectionCard";
import { PageLayout } from "../page-layout/PageLayout"
import { Button, SHAPE, SIZE } from 'baseui/button';

const products = {
    product1: 5,
    product2: 7,
    product3: 10
};

const MyCart = () => {
    const [subtotal, setSubtotal] = useState(Object.fromEntries(Object.entries(products).map(([k,v]) => [k, 1])));

    const onQuantityChange = (name, quantity) => {
        const temp = {...subtotal};
        temp[name] = quantity;
        setSubtotal(temp);
    };
    
    return (
        <PageLayout
            title="My Cart"
            bottom={() => (
                <div style={{width: '80%'}}>
                <Button shape={SHAPE.pill} size={SIZE.large} overrides={{Root:{style:{width: '100%'}}}}>Checkout!</Button>
                </div>
            )}
        >
            <div>
                {Object.entries(products).map(([k,v],index) => 
                    <div>
                        <ProductSelectionCard 
                            key={index} 
                            name={k} 
                            price={v} 
                            imgUrl='https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_2.0/w_432,c_limit/ce13ce3b-704c-4bc7-bad2-9fc214a8079a/air-max-plus-iii-shoe-br9zBx.jpg'
                            onQuantityChange={onQuantityChange} /> 
                    </div>
                )}
            </div>
            <hr />
            <div style={{ display: 'flex', paddingTop: 5 }}>
                <span style={{ marginLeft: 20, fontWeight: 'bold' }}>Subtotal</span>
                <span style={{ marginLeft: 'auto', marginRight: 20, fontWeight: 'bold', width: 70 }}>${Object.entries(subtotal).map(([k,v]) => v * products[k]).reduce((a,b)=>a+b)}</span>
            </div>
        </PageLayout> 
    );
    
};

export default MyCart;