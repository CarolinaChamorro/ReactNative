import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Permissions from 'expo-permissions'
import MapView, {  Marker }  from 'react-native-maps';


export default class App extends React.Component {
  state={
    latitude:null,
    longitude:null,
    isLoading: true,
      dataSource: [],
  }
  
  async componentDidMount(){
    const {status}=await Permissions.getAsync(Permissions.LOCATION)

    if(status !== 'granted'){
      const response= await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}})=>this.setState({latitude,longitude}, this.mergeCoords),
      (error)=>console.log('Error',error)
    )

    return fetch('http://192.168.10.128:3030/donadores')
    .then((response) => response.json())
    .then((responseJson) => {


      this.setState({
        isLoading: false,
        dataSource: responseJson,
        desLatitude:responseJson.latitude,
        desLongitude:responseJson.longitude
      });
       
    })
    .catch((error) =>{
      console.error(error);
    });
    
  }

  

  renderMarkers = () => {

    const ubicacion = this.setState;
    console.log(ubicacion.latitude);
    return (
      <View>
        {
          ubicacion.map((location) => {
            const {
             latitude, longitude 
            } = location
            return (
              <Marker
                coordinate={{ latitude, longitude }}
              />
            )
          })
        }
      </View>
    )
  }

 render(){
   const {latitude,longitude}=this.state.dataSource

   if(latitude){
    return(
      <MapView
      showsUserLocation
      style={{ flex: 1 }}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      >
        {this.renderMarkers()}
        
      </MapView>
    );
   }
   return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>We need your permission!</Text>
    </View>
  )
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});