import React, { useState } from 'react';
import { Card } from 'baseui/card';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { Button, KIND, SHAPE, SIZE } from 'baseui/button';
import { Plus, CheckIndeterminate } from 'baseui/icon';


const ProductSelectionCard = (props) => {
    const [quantity, setQuantity] = useState(1);

    const updateQuantity = (newQuantity) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
            props.onQuantityChange(props.name, newQuantity);
        }
    };

    return (
        <Card overrides={{
            Root: {
                style: {
                    border: 0,
                    paddingRight: 0
                }
            }
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>

            <img style={{
                width: 60
            }} src={props.imgUrl} alt='new' />
            
            <span style={{ fontWeight: 'bold' }}>{props.name}</span>
            
            <div style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                paddingRight: 5,
                paddingLeft: 5
            }}>
            <Button kind={KIND.secondary} size={SIZE.mini} shape={SHAPE.circle} onClick={() => updateQuantity(quantity - 1)}>
                <CheckIndeterminate />
            </Button>
            
            <span style={{ width: 20, textAlign: 'center' }}>{quantity}</span>
            
            <Button kind={KIND.secondary} size={SIZE.mini} shape={SHAPE.circle} onClick={() => updateQuantity(quantity + 1)}>
                <Plus />
            </Button>
            </div>
            
           <span style={{ width: 30, textAlign: 'center' }}>${props.price * quantity}</span>
           
            <Button kind={KIND.secondary} size={SIZE.mini} shape={SHAPE.circle} style={{marginLeft: 10}}>
                <DeleteOutlinedIcon fontSize={'small'} />
            </Button>
            </div>
        </Card>
    )
};

export default ProductSelectionCard;