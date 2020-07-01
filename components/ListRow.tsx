import React from 'react'
import {IconButton, Colors, Text} from 'react-native-paper'
import { StyleSheet, View, Alert } from 'react-native';

type Props = { 
    price: Number,
    type: String,
    id:String,
    hint:string,
    remove: (id:String) => void
};
const ListRow = (props:Props) => {
    return(
        <View style={styles.wrapper}>
            <View style={{flex:4}}>
                <Text style={styles.titleText}>{props.type} {props.price.toFixed(2)} kr</Text>
            </View>
            {
                props.hint.length > 0 &&

                <View style={{flex:1}} >
                    <IconButton
                        icon="information"
                        color={Colors.yellow100}
                        size={30}
                        onPress={() => {
                            Alert.alert(
                                'Information',
                                props.hint,
                                [
                                  { text: 'OK', onPress: () => console.log('OK Pressed') }
                                ],
                                { cancelable: false }
                              );
                        }}
                    />
                </View>
            }
            
            <View style={{flex:1}}>
                <IconButton
                    icon="delete"
                    color={Colors.red500}
                    size={30}
                    onPress={() => props.remove(props.id)}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    wrapper: {
        flexDirection:'row', 
        flex:1, 
        justifyContent:'space-between', 
        backgroundColor:Colors.blueGrey200, 
        alignItems:'center',
        marginHorizontal:0,
        marginVertical:0,
        paddingHorizontal:20,
        paddingVertical: 10,
        borderBottomWidth:10,
        borderBottomColor: Colors.indigo400
    },
    titleText: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: "bold"
    }
  });
export default ListRow;