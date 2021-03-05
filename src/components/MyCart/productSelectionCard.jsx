import React, { useState } from 'react';
import { Card } from 'baseui/card';
import { Button, KIND, SHAPE, SIZE } from 'baseui/button';
import { Select, SIZE as SelectSIZE } from "baseui/select";
import { Trash } from 'react-feather';

const options = [
    { label: 1, id: 1 },
    { label: 2, id: 2 },
    { label: 3, id: 3 },
    { label: 4, id: 4 },
    { label: 5, id: 5 }
]

const ProductSelectionCard = (props) => {
    const [value, setValue] = useState([options[0]]);

    const updateQuantity = (newQuantity) => {
        setValue(newQuantity);
        props.onQuantityChange(props.name, newQuantity[0]?.label || 0);
    };

    return (
        <Card overrides={{
            Root: {
                style: {
                    borderWidth: 0,
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
            
            <Select options={options}
                value={value}
                clearable={false}
                size={SelectSIZE.compact}
                placeholder={(<span style={{width:20}}></span>)}
                onChange={params => updateQuantity(params.value)}
                overrides={{Root:{style:{width:10}}}}
            />
            
           <span style={{ width: 30, textAlign: 'center' }}>${props.price * value[0]?.label || 0}</span>
           
            <Button kind={KIND.secondary} size={SIZE.mini} shape={SHAPE.pill} style={{marginLeft: 10}}>
                <Trash size={15} />
            </Button>
            </div>
        </Card>
    )
};

export default ProductSelectionCard;