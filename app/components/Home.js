import React,{useState} from 'react';
import { Text, View, StyleSheet,Image,Button,Alert,TouchableOpacity} from 'react-native';
import desktop from '../../assets/desktop.jpg';
import * as ImagePicker from 'expo-image-picker';

const App = () => {

const [selectedImage, setSelectedImage]=useState(null);


  let openImagePickerAsync= async()=>{
    let permissionResult=await ImagePicker.requestCameraPermissionsAsync()

    if(permissionResult.granted===false){
      alert('Permission to access camera is required');
      return;
    }
    const pickerResult=await ImagePicker.launchImageLibraryAsync()
    if(pickerResult.cancelled===true){
      return;
    }
    setSelectedImage({localUri:pickerResult.uri})
  }

  return (
    <View style={estilo.contenerdor}>
      <Text style={estilo.titulo}>Aprendiendo React Native!</Text>
      <Text style={estilo.titulo}>Imagen de url</Text>
      <Image
      source={{uri:
         selectedImage !== null 
        ?selectedImage.localUri
        :"https://picsum.photos/id/3/200/200",}} style={estilo.image}
      />
      <TouchableOpacity onPress={openImagePickerAsync} style={estilo.button}>
      <Text style={estilo.buttonText}>TouchableOpacity</Text>
     </TouchableOpacity>
      <Text style={estilo.titulo}>Imagen Local</Text>
     <Image
     source={desktop} style={estilo.image}
     /> 
      <Button
     title='Button'
     color='#000'
     onPress={()=> Alert.alert('Button presionado')}
     />

    </View>
  )

};
const estilo=StyleSheet.create({
  contenerdor:{flex:1, justifyContent:'center',alignItems:'center',backgroundColor:'#292929'},
  titulo:{ fontSize: 30,color:'#fff' },
  image:{height:200,width:200, borderRadius:100, resizeMode:'contain'},
  button:{backgroundColor:'darkcyan', padding:4,marginTop:4},
  buttonText:{color:'#fff'}
})

export default App;