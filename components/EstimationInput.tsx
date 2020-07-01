import React, {useState} from 'react';
import {
    View,
  } from 'react-native';
import {Button, TextInput,RadioButton} from 'react-native-paper'

type Props = { 
    submit: (width: number, height: number, depth: number, weight:number, type:string) => void 
};
const EstimationInput = (props:Props) => {
    const [width, setWidth] = useState("");
    const [depth, setDepth] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [type, setType] = useState("Låda")
    const submit = () => {
        const _width = parseFloat(width);
        const _height = parseFloat(height);
        const _depth = parseFloat(depth);
        const _weight = parseFloat(weight);
        if(_width > 0.0 && _height > 0.0 && _depth > 0.0  && _weight > 0.0) {
            props.submit(_width, _height, _depth, _weight, type);
            setWidth("");
            setDepth("");
            setHeight("");
            setWeight("");
        }

        return null
    }
    return(
        <View style={{backgroundColor: 'white', margin:10, padding: 20}}>
            <RadioButton.Group onValueChange={value => setType(value)} value={type}>
                <RadioButton.Item label="Låda" value="Låda" />
                <RadioButton.Item label="Möbel" value="Möbel" />
            </RadioButton.Group>
            <TextInput
                onChangeText = {(w) => setWidth(w)}
                keyboardType="decimal-pad"
                mode="outlined"
                label="Bredd (cm)"
            />
            <TextInput
                onChangeText = {(w) => setDepth(w)}
                keyboardType="decimal-pad"
                mode="outlined"
                label="Djup (cm)"
            />
            <TextInput
                onChangeText = {(w) => setHeight(w)}
                keyboardType="decimal-pad"
                mode="outlined"
                label="Höjd (cm)"
            />
            <TextInput
                onChangeText = {(w) => setWeight(w)}
                keyboardType="decimal-pad"
                mode="outlined"
                label="Vikt (kg)"
            />
            <Button
                mode="contained"
                onPress = {submit}
                style={{marginTop:10}}
            >
                Lägg till
            </Button> 
        </View>
    );
}

export default EstimationInput;