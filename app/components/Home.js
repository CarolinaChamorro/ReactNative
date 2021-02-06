import React, { useState, useEffect } from "react";
import axios from 'axios';
// import ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from 'rn-fetch-blob';
import * as Font from 'expo-font';
import { Alert, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { View, Text, Form, Label, Item, Input, Button } from 'native-base';

import { useFormik } from 'formik';

export default function Home() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      celular: '',
      email: ''
    },
    onSubmit: values => {
      axios
        .post("http://192.168.10.128:3030/donadores/create", {
          nombre: values.nombre,
          apellido: values.apellido,
          celular: values.celular,
          email: values.email,
          latitude:position.latitude,
          longitude:position.longitude

        })
        .then((response) => {
          console.log("fnh", response);
        })
        .catch((err) => {
          throw err;
        });

    },
    validate: values => {
      const errors = {};
      if (!values.nombre || values.nombre < 2) errors.nombre = "Nombre inválido";
      if (!values.celular || values.celular < 2) errors.celular = "Número inválido";
      if (!values.email || values.email < 2) errors.email = "correo inválido";
      return errors;
    },

  })
  // const options = {
  //   title: 'Seleccione la imagen', 
  //   takePhotoButtonTitle: 'Tomar foto',
  //   chooseFromLibraryButtonTitle: "Cambiar imagen",
  //   quality: 1
  // };

  //     const requestCameraRollPermission=async ()=> {
  //       try {
  //           const granted = await PermissionsAndroid.request(
  //             PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //             {
  //               'title': 'Permiso de archivos',
  //               'message': 'La aplicación necesita acceso a tus imagenes'
  //             }
  //           )
  //           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //             console.log("You can use the camera")
  //           } else {
  //             console.log("Camera permission denied")
  //           }
  //         } catch (err) {
  //           console.warn(err)
  //         }
  //       }

  //     const handleSelectImage=()=> {
  //       ImagePicker.showImagePicker(options, (response) => {
  //       console.log('Response = ', response);

  //       if (response.didCancel) {
  //         console.log('usuario canceló la selección de la imagen');
  //       } else if (response.error) {
  //         console.log('ImagePicker Error: ', response.error);
  //       } else if (response.customButton) {
  //         console.log('Botón personalizado del usuario pulsado: ', response.customButton);
  //       } else {
  //           const source = { uri: response.uri };
  //           this.setState({
  //           avatarSource: source,
  //           data:response.data
  //         })
  //       }
  //     });
  //   }

  //   const handleImagen=()=>{
  //  	 RNFetchBlob.fetch('POST', 'http://www.example.com/upload-form', {
  //         Authorization : "Bearer access-token",
  //         otherHeader : "foo",
  //         'Content-Type' : 'multipart/form-data',
  //       }, [ 
  //        { name : 'image', filename : 'image.png', type:'image/png', data: this.state.data},      

  //       ]).then((resp) => {
  //         this.setState({dataSource: json.data})
  //         console.log(json)        
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       })
  //   }
  useEffect(() => {
    entryPoint();
    font();
  }, []);

  const [position, setPosition] = useState(null);

  const getPosition = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({
      });
      setPosition(coords);
    } catch (error) {
      console.log("getPosition -> error", error);
      setPosition(null);
    }
  };
  const entryPoint = async () => {
    try {
      const { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        getPosition();
      }
    } catch (error) {
      console.log("getPermissionAndPosition -> error", error);
    }
  };


  const font = async () => {
    if (!fontsLoaded) {
      loadFonts();
    }
  }

  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto_medium: require('../../assets/fonts/Roboto-Medium.ttf'),
    });
    setFontsLoaded(true);
  }

  console.log(position)

  if (!fontsLoaded) {
    return (<View></View>);
  }

  return (
    <View style={styles.container}>
      <Form>
        <Text style={styles.title}>Formulario de Donadores</Text>
        <Item error={errors.nombre ? true : false}>
          <Label>Nombre</Label>
          <Input value={values.nombre} onChangeText={text => setFieldValue('nombre', text)} />
          <Text>{errors.nombre ? errors.name : ''}</Text>
        </Item>
        <Item>
          <Label>Apellido</Label>
          <Input value={values.apellido} onChangeText={text => setFieldValue('apellido', text)} />
        </Item>
        <Item error={errors.celular ? true : false}>
          <Label>Celular</Label>
          <Input value={values.celular} onChangeText={text => setFieldValue('celular', text)} />
          <Text>{errors.celular ? errors.celular : ''}</Text>
        </Item>
        <Item error={errors.email ? true : false}>
          <Label>Email</Label>
          <Input value={values.email} onChangeText={text => setFieldValue('email', text)} />
          <Text>{errors.email ? errors.email : ''}</Text>
        </Item>
        <Button onPress={handleSubmit} style={styles.botton}>
          <Text>Enviar</Text>
        </Button>
      </Form>
      {/* <Button onPress={handleSelectImage}> 
          	<Text>Tomar foto</Text>
     	</Button>	 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30,
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 15

  },
  title: {
    textAlign: 'center',

    marginBottom: 5

  },
  botton: {
    textAlign: 'center',
    justifyContent: "center",
    marginTop: 15

  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 20

  },

});