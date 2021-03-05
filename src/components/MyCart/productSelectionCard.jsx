import React, { useState } from 'react';
import { Card } from 'baseui/card';
import { Select, SIZE as SelectSIZE } from "baseui/select";
import { ParagraphXSmall,ParagraphSmall } from "baseui/typography";

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
        props.onQuantityChange(props.index, newQuantity[0]?.label || 0);
    };

    return (
        <Card overrides={{
            Root: {
                style: {
                    borderWidth: 0,
                    height:90
                }
            },
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: 90,
                paddingBottom: 20,
                paddingTop: 10
            }}>

            
            <img style={{
                width: 75,
                height: 75,
                overflow: 'hidden',
                borderRadius: 10,
            }} src={props.imgUrl} alt='{props.imgUrl}' />
            
            <div style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-around'}}>
                <ParagraphXSmall margin="0px" color="#828282">
                {props.brand}
                </ParagraphXSmall>
                <ParagraphSmall margin="0px">
                {props.name}
                </ParagraphSmall>
                <ParagraphXSmall margin="0px" color="#828282">
                Item No: {props.itemId}
                </ParagraphXSmall>
                <Select options={options}
                    value={value}
                    clearable={false}
                    size={SelectSIZE.compact}
                    placeholder={(<span style={{width:20}}></span>)}
                    onChange={params => updateQuantity(params.value)}
                    overrides={{Root:{style:{width:10}}}}
                />
            </div>
            
           <span style={{ width: 30, textAlign: 'center' }}>${props.price * value[0]?.label || 0}</span>

            </div>
            <hr style={{height: 2, borderColor: 'white', color: 'lightgray' }} />
        </Card>
    )
};

export default ProductSelectionCard;