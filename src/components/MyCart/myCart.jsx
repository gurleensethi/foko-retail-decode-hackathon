import React, { useState, useEffect } from 'react';
import ProductSelectionCard from "./productSelectionCard";
import { PageLayout } from "../page-layout/PageLayout"
import { useFirestore } from 'reactfire';
import { useHistory } from "react-router-dom";
import { Block } from "baseui/block";
import { Spinner } from "baseui/spinner";


const style = {
    fontWeight: 'bold',
    color: '#696969'
};

const MyCart = () => {
    const onQuantityChange = (index, quantity) => {
        const temp = [...subtotal];
        temp[index] = quantity;
        setSubtotal(temp);
    };
    
    const [subtotal, setSubtotal] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const firestore = useFirestore();
    useEffect(() => {
        const ordersRef = firestore.collection("items");
        const disconnect = ordersRef.onSnapshot((snapshot) => {
            setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
    
        return () => disconnect();
    }, [firestore]);

    const history = useHistory();
    
    return isLoading ? <Block margin="0 auto" display="flex" justifyContent="center">
                            <Spinner size="32px" color="black" />
                        </Block> : (
        <PageLayout
            title="My Cart"
            bottomButtonLabel="Checkout"
            onBottomBtnClicked={() => {
                history.push('/checkout');
            }}>
            <div>
                {items.map((item, index) => 
                    <div style={{
                        height: 100,
                    }}>
                        <ProductSelectionCard 
                            key={item.id}
                            index={index}
                            brand={item.brand}
                            name={item.name} 
                            price={item.price} 
                            itemId={item.itemId}
                            imgUrl={item.imageUrl}
                            onQuantityChange={onQuantityChange} /> 
                    </div>
                )}
            </div>
            <div style={{ display: 'flex', paddingLeft: 20, paddingRight: 20, paddingTop: 10, width: '100%' }}>
                <span style={{  color: 'gray', fontSize: 12 }}>Total Items:</span>
                <span style={{ color: 'gray', marginLeft: 'auto', fontSize: 12 }}>{items.length}</span>
            </div>
            <div style={{ display: 'flex', paddingLeft: 20, paddingRight: 20, paddingTop: 10, width: '100%' }}>
                <span style={{ color: 'gray', fontWeight: 'bold', fontSize: 12 }}>Subtotal:</span>
                <span style={{ color: 'gray', marginLeft: 'auto', fontWeight: 'bold', fontSize: 12 }}>${items.map(item => item.price).reduce((a,b)=>a+b,0)}</span>
            </div>

            <div style={{width: '100%', padding: 20, boxShadow: "0.5px -3px 1px -1px #9E9E9E", marginTop: '100%'}}>
                <div style={{display: 'flex', height: 40}}>
                <span style={style}>Subtotal:</span>
                <span style={{marginLeft: 'auto', ...style}}>${items.map(item => item.price).reduce((a,b)=>a+b,0)}</span>
                </div>
            </div>
        </PageLayout> 
    );
    
};

export default MyCart;