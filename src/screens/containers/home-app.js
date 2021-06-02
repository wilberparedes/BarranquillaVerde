import React, { useEffect, useState, createRef  } from 'react';
import { Text, View, StatusBar, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, BackHandler } from 'react-native';
import { Colors, Fonts, Metrics, StylesGeneral } from '../../themes';
import { actions } from '../../store';

import { connect } from 'react-redux';
import { Appbar, Checkbox } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as mime from 'react-native-mime-types';
import ActionSheet from "react-native-actions-sheet";
import Swiper from 'react-native-swiper';
import ImagePicker from 'react-native-image-crop-picker';
import MapView, { Marker } from 'react-native-maps';


import IconsOfferApp from '../components/IconsOfferApp';
import ButtonOfferApp from '../components/ButtonOfferApp';

// import uid from "uid";

// import useAlert from '../../hooks/useAlert';



const HomeApp = ({navigation, UploadFile}) => {

    const actionSheetDetails = createRef();
    const ActionSheetNewReport = createRef();

    const Parques = [
      {
        id: 1,
        name: "Parque Electrificadora",
        latitude: 11.0140744,
        longitude: -74.8138129,
        address: "Calle 85 y 86 Carrera 64 y Cra 64b",
        neighborhood: "Andalucia",
        images:[
          {
            url: "https://barranquilla-verde.herokuapp.com/assets/parq-1-1.png",
          },
          {
            url: "https://barranquilla-verde.herokuapp.com/assets/parq-1-2.png",
          },
          {
            url: "https://barranquilla-verde.herokuapp.com/assets/parq-1-3.png",
          },
          {
            url: "https://barranquilla-verde.herokuapp.com/assets/parq-1-4.png",
          },
          {
            url: "https://barranquilla-verde.herokuapp.com/assets/parq-1-5.png",
          },
          {
            url: "https://barranquilla-verde.herokuapp.com/assets/parq-1-6.png",
          },
          {
            url: "https://barranquilla-verde.herokuapp.com/assets/parq-1-7.png",
          },
          {
            url: "https://barranquilla-verde.herokuapp.com/assets/parq-1-8.png",
          },
        ],
        gym: 1,
        soccer_field: 1,
      },
      {
        id: 2,
        name: "Parque Santa Monica",
        latitude: 11.0109385,
        longitude: -74.8207462,
        address: "Kr 52 Cl 90B",
        neighborhood: "Santa Monica"
      }
    ]

    const [photoUser, setPhotoUser] = useState('');
    const [photoUserData, setPhotoUserData] = useState({});
    const [Details, setDetails] = useState({});
    const [tengopedido, setTengopedido] = useState(false);
    const [initialRegionInit, setInitialRegionInit] = useState({
      latitude: 11.0140744, //10.9878,
      longitude: -74.8138129, //-74.7889,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });

    //FUNCTIONS
    useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          Back();
          return true;
        }
      );
      return () => backHandler.remove();
    }, []);

    const Back = () => {
      navigation.goBack();
    }

    const mapReadyInit = () => {

    }

    const handleOpenLink = async (url) => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }

    const goToMaps = () => {
      alert({
        title: 'Ir a ruta de entrega',
        // message: `Sus datos no fueron enviados con éxito, por favor vuelva a intentarlo.`,
        icon: {
          name: 'maps',
        },
        button:{
          text: 'Ver mapa',
          onPress: () => handleOpenLink('https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=11.013024,-74.827322')
        }
      });
      // handleOpenLink('https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=11.013024,-74.827322')
    }

    const openDetails = (e) => {
      console.log('openDetails', e)
      const Parque = Parques[e];
      console.log(Parque)
      setDetails(Parque);
      actionSheetDetails.current?.show();
    }

    const takePhotoFromCamera = (origen) => {
      console.log('takePhotoFromCamera');
      ImagePicker.openCamera({
        // width: 300,
        // height: 300,
        cropping: false,
        includeExif: true,
      }).then((image) => {
        setPhotoUserData({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
          type: image.mime,
          name: "imgreport.jpg"
        });
        setPhotoUser(image.path);
        
      })
    }

    const generateRNFile = (uri, name) => {
      return uri ? new Blob([uri], {type: mime.lookup(uri) || 'image'}) : null;
      // const imageProfile = generateRNFile(photoUserData.uri, `picture-${Date.now()}`);
    }
    
    const upFile = () => {
      console.log("upFile")
      const name = `picture-${Date.now()}`;
      const imageProfile = generateRNFile(photoUserData.uri, name);
      console.log("name", name)
      const rUploadFile = UploadFile("1321321321", name, photoUserData)
          .then((data) => data.json())
          .then((dataJson) => {
            console.log(dataJson);
          });
    }


    return (

        <View style={{backgroundColor: 'white', flex: 1}}>
        
          <View style={{ flex: 1 }}>

            <View style={{backgroundColor: 'transparent', position: 'absolute', zIndex: 999, top: getStatusBarHeight()}}>
              <Appbar.Action
                icon="arrow-left"
                color={'black'}
                onPress={() => Back() }
                />
            </View>

            {/* <View style={{backgroundColor: 'white', alignSelf: 'center', alignContent: 'center', width: '80%', position: 'absolute', zIndex: 999, top: getStatusBarHeight() + 50, borderRadius: 10, shadowColor: "#000", shadowOffset:{ width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 }}>
              <View style={{flexDirection: 'row', padding: 20}}>
                <Image 
                  source={require('../../../assets/icons/marker-image-ico.png')}
                  style={{width: 20, height: 30, resizeMode: 'contain', marginRight: 15}}
                  />
                <View style={{alignContent: 'center', flex: 1}}>
                  <Text style={{...StylesGeneral.textSemiBlackBold}}>Don Churro (CC Buenavista 1)</Text>
                  <Text style={{...StylesGeneral.textSemiBlackRegular}}>Cl. 98 #52-115, Barranquilla, Atlántico</Text>
                </View>
              </View>
            </View> */}

            <MapView 
              ref={map => { map_init = map}}
              onMapReady={mapReadyInit()}
              style={{flex: 1, position: 'relative'}}
              initialRegion={ initialRegionInit }
              >
                {Parques.map((data, i) => (
                  <Marker.Animated 
                    key={i}
                    coordinate={data}
                    onPress={(e) => openDetails(i)}
                  />
                ))}
            </MapView>

            {/* <View style={{backgroundColor: 'white', alignSelf: 'center', alignContent: 'center', width: '100%', position: 'absolute', zIndex: 999, bottom: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10, shadowColor: "#000", shadowOffset:{ width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3 }}>
              <View style={{ padding: 30}}>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <IconsOfferApp icons={'timer'} size={20} />
                  <View style={{alignContent: 'center', flex: 1, marginLeft: 15,}}>
                    <Text style={{...StylesGeneral.textSemiBlackRegular, textAlign: 'center'}}>Tiempo estimado de llegada es de 14 minutos</Text>
                  </View>
                </View>

                <ButtonOfferApp 
                  uppercase={false}
                  style={{marginTop: 15}}
                  buttonColor={Colors.black}
                  textColor={'white'}
                  text={'Más información'}
                  onPress={() => actionSheetDetails.current?.show()}
                  />

              </View>
            </View> */}
            
          </View>
          

          {/* ACTION DETALLE DE PARQUE */}
          <ActionSheet ref={actionSheetDetails} containerStyle={styles.actionStyles}>
            <View style={{height: Metrics.screenHeight - getStatusBarHeight() - 50, marginHorizontal: 15}}>

              {/* HEADER */}
              <TouchableOpacity onPress={() => actionSheetDetails.current?.hide()} style={{position: 'absolute', right: 0, top: 15, zIndex: 99}}>
                <IconsOfferApp
                  icons="close"
                  size={25}
                  style={{ padding: 5 }}
                  />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20, borderBottomWidth: 0.5, borderColor: Colors.SemiLightGrey}}>
                <Text style={{...Fonts.fontBold, fontSize: 18,marginLeft: 5}}>{Details.name}</Text>
              </View>
              
              {/* CONTENT */}
              <ScrollView>

                <Swiper style={{height: 220}} showsButtons={false} loop={false}>
                  {Details && Details.images && Details.images.map((img, i) => (
                    <View 
                      key={i}
                      style={{
                        flex: 1,
                        backgroundColor: Colors.primary,
                      }}>
                      <Image 
                        source={{uri: img.url}} 
                        style={{height: undefined, width: Metrics.screenWidth, flex: 1}}
                        />
                    </View>
                  ))}
                </Swiper>


                <View style={styles.itemContent}>
                  <View style={styles.itemContentDetails}>
                    <IconsOfferApp icons={'directions'} size={25} style={styles.itemContentDetailsIcon} />
                    <View>
                      <Text>Nombre: {Details.name}</Text>
                      <Text>Dirección: {Details.address}</Text>
                      <Text>{`Barrio: ${Details.neighborhood}`}</Text>
                      <View style={{marginTop: 10}}>
                        <Text>{`\u2022 Parque: SÍ`}</Text>
                        <Text>{`\u2022 Cancha de futbol: SÍ`}</Text>
                        <Text>{`\u2022 Gimnasio: SÍ`}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                
                <View style={{paddingVertical: 15, alignItems: 'center'}}>
                  <Text style={{...StylesGeneral.textMediumBoldGrey}}>¿Tiene alguna novedad por reportar?</Text>
                  <View style={{marginVertical: 10}}>
                    <ButtonOfferApp 
                      uppercase={false} 
                      text={'Realizar reporte'}
                      textColor={'white'}
                      buttonColor={Colors.primary}
                      buttonStyle={{paddingHorizontal: 30}}
                      onPress={() => { actionSheetDetails.current?.hide(); ActionSheetNewReport.current?.show(); }}
                      />
                  </View>
                </View>

              </ScrollView>

            </View>
          </ActionSheet>



          {/* ACTION NUEVO REPORTE */}
          <ActionSheet ref={ActionSheetNewReport} containerStyle={styles.actionStyles}>
            <View style={{height: Metrics.screenHeight - getStatusBarHeight() - 50, marginHorizontal: 15}}>

              {/* HEADER */}
              <TouchableOpacity onPress={() => ActionSheetNewReport.current?.hide()} style={{position: 'absolute', right: 0, top: 15, zIndex: 99}}>
                <IconsOfferApp
                  icons="close"
                  size={25}
                  style={{ padding: 5 }}
                  />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 20, borderBottomWidth: 0.5, borderColor: Colors.SemiLightGrey}}>
                <Text style={{...Fonts.fontBold, fontSize: 18,marginLeft: 5, textAlign: 'center'}}>{`Nuevo reporte`}</Text>
              </View>
              
              {/* CONTENT */}
              <ScrollView>

                <View style={styles.itemContent}>
                  <View style={styles.itemContentDetails}>
                    <IconsOfferApp icons={'directions'} size={25} style={styles.itemContentDetailsIcon} />
                    <View>
                      <Text>Nombre: {Details.name}</Text>
                      <Text>Dirección: {Details.address}</Text>
                      <Text>{`Barrio: ${Details.neighborhood}`}</Text>
                    </View>
                  </View>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => takePhotoFromCamera()} style={{width: 85, height: 85, overflow: 'hidden', borderRadius: 85 / 2, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                    {(photoUser != '') ? (
                      <Image source={{uri:  photoUser}} style={{width: 85, height: 85, borderRadius: 85 / 2}} />
                    ):
                    (
                      <IconsOfferApp icons={'plus'} size={30} />
                    )}
                  </TouchableOpacity>

                  <View style={{marginLeft: 15, flex: 1}}>
                    <Text style={{...Fonts.fontBold, fontSize: 14, color: Colors.TextSemiBlack }}>Agrega una foto.</Text>
                  </View>
                </View>

                
                <View style={{paddingVertical: 15, alignItems: 'center'}}>
                  <Text style={{...StylesGeneral.textMediumBoldGrey}}>¿Tiene alguna novedad por reportar?</Text>
                  <View style={{marginVertical: 10}}>
                    <ButtonOfferApp 
                      uppercase={false} 
                      text={'Realizar reporte'}
                      textColor={'white'}
                      buttonColor={Colors.primary}
                      buttonStyle={{paddingHorizontal: 30}}
                      onPress={() => upFile()}
                      // ActionSheetNewReport.current?.hide()
                      />
                  </View>
                </View>

              </ScrollView>

            </View>
          </ActionSheet>


          <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true}/>

        </View>
    );

    
};




const styles = StyleSheet.create({

  actionStyles:{
    borderTopRightRadius: 10, 
    borderTopLeftRadius: 10, 
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0
  },
  buttonClose: {
    width: 25, 
    height: 25, 
    
  },


  itemContent: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 15, 
    borderBottomWidth: 0.5, 
    borderColor: Colors.SemiLightGrey
  },
  itemContentDetails: {
    flexDirection: 'row', 
    justifyContent: 'flex-start'
  },
  itemContentDetailsIcon: {
    marginVertical: 10, 
    marginRight: 10 
  },
  itemContentIcons:{
    padding: 10, 
    borderWidth: .5, 
    borderRadius: 45 / 2, 
    borderColor: Colors.LightGrey
  },

  tagNotLike: {
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 5, 
    paddingHorizontal: 5,
    marginRight: 10, 
    marginBottom: 10, 
    borderRadius: 5, 
    borderWidth: 1, 
    borderColor: Colors.back
  }
  
})


const mapDispatchToProps = dispatch => ({
  UploadFile: (token, name, img) => 
    dispatch(actions.api.uploadFile(token, name, img)),
  dispatch
});

export default connect( null, mapDispatchToProps )(HomeApp);