import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
} from 'react-native';
import {Button, Modal, Portal,Provider,Colors} from 'react-native-paper'
import EstimationInput from './components/EstimationInput';
import ListRow from './components/ListRow';


declare const global: {HermesInternal: null | {}};
const pricePerKilo = 1;
const pricePerVolume = 0.001;

interface EstimationObject {
	width:number,
	height:number,
	depth:number,
	weight:number,
	weightByVolume:number,
	price:number,
	type: string,
	hint: string,
	id:string,
}

const App = () => {
	const [list, setList] = useState<EstimationObject[]>([])
	const [modalVisible, setModalVisible] = useState(false)

	const addItem = (width: number, height: number, depth: number, weight:number,type:string) => {
		let price:number = pricePerKilo * weight + pricePerVolume*width*height*depth;
		let weightByVolume = weight/(width*height*depth);
		if(type === "Möbel") {
			weightByVolume*=2;
		}
		let hint = ""
		if(weightByVolume < 0.00003 && type =="Låda"){
			hint = "Det verkar som denna låda är lätt, överväg att fylla lådan helt för att spara pengar."
		}
		
		setList([...list,{
			width,
			height,
			depth,
			weight,
			weightByVolume,
			price,
			type,
			hint,
			id: Math.floor(Math.random() * 1000).toString()
		}])
		setModalVisible(false);
	}
	let total = 0.0
	list.forEach((item) => {
		total += item.price;
	})
	const removeItem = (id:String) => {
		const tempList = list.filter((item) => {return item.id !== id})
		setList(tempList);
	}
  	return (
		<Provider>
			<Portal>	
				<SafeAreaView >
					<FlatList
						data={list}
	  					renderItem={({ item }) => 
						  <ListRow 
							price={item.price} 
							id={item.id} 
							type={item.type}
							hint={item.hint}
							remove = {removeItem} 
						  />}
						keyExtractor={(item) => item.id}
					/>
					<Text style={styles.titleText}>Total estimerad kostnad</Text>
					<Text style={styles.titleText}>{total.toFixed(2)} kr</Text>
					
					<Modal visible={modalVisible} onDismiss={ () => setModalVisible(false)}>
						<EstimationInput
							submit = {addItem}
						/>
					</Modal>

					<Button
						mode="contained"
						disabled = {modalVisible}
						onPress = {() => setModalVisible(true)}
					>
						Lägg till
					</Button>
				</SafeAreaView>
			</Portal>
		</Provider>
  	);
};

const styles = StyleSheet.create({
	titleText: {
        color: Colors.black,
        fontSize: 20,
		fontWeight: "bold",
		textAlign:'center'
		
    }

});

export default App;
