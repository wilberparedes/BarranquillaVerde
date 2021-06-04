import React, { useEffect, useState, createRef  } from 'react';
import { useColorScheme, Text, View, StatusBar, StyleSheet, Image, TouchableOpacity, ScrollView, Linking, BackHandler, Animated, Dimensions, Platform } from 'react-native';
import { Colors, Fonts, Functions, Metrics, StylesGeneral } from '../../themes';
import { actions } from '../../store';

import { connect } from 'react-redux';
import { Appbar, Checkbox } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ActionSheet from "react-native-actions-sheet";
import Swiper from 'react-native-swiper';
import ImagePicker from 'react-native-image-crop-picker';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import LoadingComponent from '../../sections/components/loading'
import {  mapDarkStyle, mapStandardStyle } from '../../themes/Utils';
import IconsOfferApp from '../components/IconsOfferApp';
import ButtonOfferApp from '../components/ButtonOfferApp';
import InputField from '../components/InputField';
import URL_MEDIA from '../../../url_media';

const { width } = Dimensions.get("window");
const CARD_HEIGHT = 260;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;



const HomeApp = ({navigation, token, userData, SendReport, myPositions, LoadParques}) => {

    const isDarkMode = useColorScheme() == 'dark';

    const actionSheetDetails = createRef();
    const ActionSheetNewReport = createRef();
    const { alertOK } = Functions;

    const _map = React.useRef(null);
    const _scrollView = React.useRef(null);
    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);

    
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [Parques, setParques] = useState([])
    const [loadingReport, setLoadingReport] = useState(false)
    const [photoUser, setPhotoUser] = useState('');
    const [photoUserData, setPhotoUserData] = useState({});
    const [Details, setDetails] = useState({});
    const [zonaNovedad, setZonaNovedad] = useState('');
    const [comentario, setComentario] = useState('')


    const [initialRegionInit, setInitialRegionInit] = useState({
      latitude: myPositions.latitude, 
      longitude: myPositions.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });

    //FUNCTIONS
    useEffect(() => {
      loadParques();
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          Back();
          return true;
        }
      );
      return () => backHandler.remove();
    }, []);
    useEffect(() => {
      if(success){
        ActionSheetNewReport.current?.hide();
      }
    }, [success]);

    const loadParques = () => {
      const rLoadParques = LoadParques(token)
        .then((data) => data.json())
        .then((dataJson) => {
          setParques(dataJson);
          setLoading(false);
          setTimeout(() => {
            _map.current.animateToRegion(
              {
                latitude: Number(dataJson[0].latitude),
                longitude: Number(dataJson[0].longitude),
                latitudeDelta: initialRegionInit.latitudeDelta,
                longitudeDelta: initialRegionInit.longitudeDelta,
              },
              350
            );
          }, 1000);
        });
    }


    useEffect(() => {

      mapAnimation.addListener(({ value }) => {

        let index = Math.floor(value / CARD_WIDTH + 0.3);
        if (index >= Parques.length) index = Parques.length - 1;
        
        if (index <= 0) index = 0;
  
        clearTimeout(regionTimeout);
  
        const regionTimeout = setTimeout(() => {
          if( mapIndex !== index ) {
            mapIndex = index;
            _map.current.animateToRegion(
              {
                // ...Parques[index],
                latitude: Number(Parques[index].latitude),
                longitude: Number(Parques[index].longitude),
                latitudeDelta: initialRegionInit.latitudeDelta,
                longitudeDelta: initialRegionInit.longitudeDelta,
              },
              350
            );
          }
        }, 10);

      });

    });

    const interpolations = Parques.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
  
      const scale = mapAnimation.interpolate({
        inputRange,
        outputRange: [1, 1.6, 1],
        extrapolate: "clamp"
      });
  
      return { scale };
    });

    const onMarkerPress = (mapEventData) => {
      const markerID = mapEventData._targetInst.return.key;
  
      let x = (markerID * CARD_WIDTH) + (markerID * 20); 
      if (Platform.OS === 'ios') {
        x = x - SPACING_FOR_CARD_INSET;
      }
  
      _scrollView.current.scrollTo({x: x, y: 0, animated: true});
    }

    const Back = () => {
      navigation.goBack();
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
      const Parque = Parques[e];
      setDetails(Parque);
      actionSheetDetails.current?.show();
    }

    const takePhotoFromCamera = () => {
      ImagePicker.openCamera({
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

    const sendReport = () => {
      if(photoUser == ''){
        alertOK(
          'Advertencia',
          `Por favor, adjunte una Foto.`, 
          true
        );
      }
      else if(zonaNovedad == ''){
        alertOK(
          'Advertencia',
          `Por favor, Seleccione Novedad.`, 
          true
        );
      }
      else if(comentario == ''){
        
        alertOK(
          'Advertencia',
          `Por favor, agregue una breve Descripción de su novedad.`, 
          true
        );
      }else{

        setLoadingReport(true);
        const name = `picture-${Date.now()}`;
        const rSendReport = SendReport(token, name, photoUserData, userData.id, Details.id, zonaNovedad, comentario)
          .then((data) => data.json())
          .then((dataJson) => {
            if(dataJson.success){
              setPhotoUser('');
              setPhotoUserData({});
              setDetails({});
              setZonaNovedad('');
              setComentario('');
              setLoadingReport(false);
              setSuccess(true);

              alertOK(
                'Novedad registrada exitosamente!',
                `Hemos recibido su reporte y pronto le daremos seguimiento`, 
                true
              );

            }else{
              setLoadingReport(false);
              alertOK(
                'Advertencia',
                `${dataJson.message}`, 
                true
                
              );
            }
          });
      }

    }

    

    if(loading){
      return <LoadingComponent />
    }

    return (

        <View style={{backgroundColor: 'white', flex: 1}}>
        
          <View style={{ flex: 1 }}>

            {/* <View style={{backgroundColor: 'transparent', position: 'absolute', zIndex: 999, top: getStatusBarHeight()}}>
              <Appbar.Action
                icon="arrow-left"
                color={'black'}
                onPress={() => Back() }
                />
            </View> */}

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
              ref={_map}
              provider={PROVIDER_GOOGLE}
              style={{flex: 1, position: 'relative'}}
              initialRegion={ initialRegionInit }
              customMapStyle={isDarkMode ? mapDarkStyle : mapStandardStyle}
              >
                {Parques.map((marker, index) => {
                  const scaleStyle = {
                    transform: [
                      {
                        scale: interpolations[index].scale,
                      },
                    ],
                  };
                  return (
                    <Marker key={index} coordinate={{ latitude: Number(marker.latitude),
                      longitude: Number(marker.longitude) }} onPress={(e)=>onMarkerPress(e)}>
                      <Animated.View style={[styles.markerWrap]}>
                        <Animated.Image
                          source={require('../../../assets/map_marker.png')}
                          style={[styles.marker, scaleStyle]}
                          resizeMode="cover"
                        />
                      </Animated.View>
                    </Marker>
                  );
                })}
            </MapView>

            <Animated.ScrollView
              ref={_scrollView}
              horizontal
              pagingEnabled
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              snapToInterval={CARD_WIDTH + 20}
              snapToAlignment="center"
              style={styles.scrollView}
              contentInset={{
                top: 0,
                left: SPACING_FOR_CARD_INSET,
                bottom: 0,
                right: SPACING_FOR_CARD_INSET
              }}
              contentContainerStyle={{
                paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
              }}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: mapAnimation,
                      }
                    },
                  },
                ],
                {useNativeDriver: true}
              )}
            >
              {Parques.map((marker, index) =>(
                <View style={styles.card} key={index}>
                  <Image 
                    source={{uri: URL_MEDIA + marker.images[0].url}}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                  <View style={styles.textContent}>
                    <Text numberOfLines={1} style={styles.cardtitle}>{marker.name}</Text>
                    <Text numberOfLines={1} style={styles.cardDescription}><Text style={{...Fonts.fontMedium}}>Dirección: </Text> {marker.address}</Text>
                    <View style={styles.button}>
                      <TouchableOpacity
                        onPress={() => openDetails(index)}
                        style={[styles.signIn, {
                          borderColor: Colors.primary,
                          borderWidth: 1
                        }]}
                      >
                        <Text style={[styles.textSign, {
                          color: Colors.primary
                        }]}>Ver detalles</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </Animated.ScrollView>
            
          </View>
          

          {/* ACTION DETALLE DE PARQUE */}
          <ActionSheet ref={actionSheetDetails} containerStyle={styles.actionStyles}>
            <View style={{height: Metrics.screenHeight - getStatusBarHeight() - 50, marginHorizontal: 15}}>

              {/* HEADER */}
              <TouchableOpacity onPress={() => actionSheetDetails.current?.hide()} style={{position: 'absolute', right: 0, top: 5, zIndex: 99}}>
                <IconsOfferApp
                  icons="close"
                  size={25}
                  style={{ padding: 5 }}
                  />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 0.5, borderColor: Colors.SemiLightGrey}}>
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
                        backgroundColor: Colors.grisHr,
                      }}>
                      <Image 
                        source={{uri: URL_MEDIA + img.url}} 
                        style={{height: undefined, width: Metrics.screenWidth, flex: 1}}
                        />
                    </View>
                  ))}
                </Swiper>


                <View style={styles.itemContent}>
                  <View style={styles.itemContentDetails}>
                    <IconsOfferApp icons={'directions'} size={25} style={styles.itemContentDetailsIcon} />
                    <View>
                      <Text><Text style={{...Fonts.fontMedium}}>Nombre: </Text>{Details.name}</Text>
                      <Text><Text style={{...Fonts.fontMedium}}>Dirección: </Text>{Details.address}</Text>
                      <Text><Text style={{...Fonts.fontMedium}}>Barrio: </Text>{`${Details.neighborhood}`}</Text>
                      <View style={{marginTop: 5}}>
                        <Text><Text style={{...Fonts.fontMedium}}>{`\u2022 Parque: `}</Text>{`SÍ`}</Text>
                        {/* {() && ( */}
                          <Text><Text style={{...Fonts.fontMedium}}>{`\u2022 Cancha de fútbol: `}</Text>{`${Details.soccer_field == 1 ? 'SÍ' : 'NO'}`}</Text>
                        {/* )} */}
                        {/* {(Details.gym == 1) && ( */}
                          <Text><Text style={{...Fonts.fontMedium}}>{`\u2022 Gimnasio: `}</Text>{`${Details.gym == 1 ? 'SÍ' : 'NO'}`}</Text>
                        {/* )} */}
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
              <TouchableOpacity onPress={() => ActionSheetNewReport.current?.hide()} style={{position: 'absolute', right: 0, top: 5, zIndex: 99}}>
                <IconsOfferApp
                  icons="close"
                  size={25}
                  style={{ padding: 5 }}
                  />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 0.5, borderColor: Colors.SemiLightGrey}}>
                <Text style={{...Fonts.fontBold, fontSize: 18,marginLeft: 5, textAlign: 'center'}}>{`Nuevo reporte`}</Text>
              </View>
              
              {/* CONTENT */}
              <ScrollView>

                <View style={styles.itemContent}>
                  <View style={styles.itemContentDetails}>
                    <IconsOfferApp icons={'directions'} size={25} style={styles.itemContentDetailsIcon} />
                    <View>
                      <Text><Text style={{...Fonts.fontMedium}}>Nombre: </Text>{Details.name}</Text>
                      <Text><Text style={{...Fonts.fontMedium}}>Dirección: </Text>{Details.address}</Text>
                      <Text><Text style={{...Fonts.fontMedium}}>Barrio: </Text>{`${Details.neighborhood}`}</Text>
                    </View>
                  </View>
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'space-evenly',  flexDirection: 'row', paddingVertical: 15 }}>
                  <View  style={{ alignItems: 'center' }}>
                    <View style={{ flex: 1, marginBottom: 5 }}>
                      <Text style={{...Fonts.fontBold, fontSize: 14, color: Colors.TextSemiBlack }}>Adjuntar foto</Text>
                    </View>
                    <TouchableOpacity onPress={() => takePhotoFromCamera()} style={{width: 75, height: 75, overflow: 'hidden', borderRadius: 75 / 2, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5}}>
                      {(photoUser != '') ? (
                        <Image source={{uri:  photoUser}} style={{width: 85, height: 85, borderRadius: 85 / 2}} />
                      ):
                      (
                        <IconsOfferApp icons={'camera'} size={30} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{marginLeft: 10}} >
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                    <View
                      style={
                        Platform.OS === 'ios'
                        ? { borderRadius: 20, borderColor: Colors.LightGrey, borderWidth: 1 }
                        : null
                      }>
                      <Checkbox
                        status={zonaNovedad == 'zonasverdes' ? 'checked' : 'unchecked'}
                        onPress={() => setZonaNovedad( 'zonasverdes' ) }
                        style={{ margin: 0 }}
                        uncheckedColor={Colors.LightGrey}
                        color={Colors.primary}
                      />
                    </View>
                    <Text style={{...Fonts.fontMedium}}>Novedad Zonas verdes</Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                    <View
                      style={
                        Platform.OS === 'ios'
                        ? { borderRadius: 20, borderColor: Colors.LightGrey, borderWidth: 1 }
                        : null
                      }>
                      <Checkbox
                        status={zonaNovedad == 'parques' ? 'checked' : 'unchecked'}
                        onPress={() => setZonaNovedad( 'parques' ) }
                        style={{ margin: 0 }}
                        uncheckedColor={Colors.LightGrey}
                        color={Colors.primary}
                      />
                    </View>
                    <Text style={{...Fonts.fontMedium}}>Novedad Parques</Text>
                  </View>
                  
                  {(Details.gym == 1) && (
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                      <View
                        style={
                          Platform.OS === 'ios'
                          ? { borderRadius: 20, borderColor: Colors.LightGrey, borderWidth: 1 }
                          : null
                        }>
                        <Checkbox
                          status={zonaNovedad == 'gimnasio' ? 'checked' : 'unchecked'}
                          onPress={() => setZonaNovedad( 'gimnasio' ) }
                          style={{ margin: 0 }}
                          uncheckedColor={Colors.LightGrey}
                          color={Colors.primary}
                        />
                      </View>
                      <Text style={{...Fonts.fontMedium}}>Novedad Gimnasio biosaludable</Text>
                    </View>
                  )}
                </View>

                <View style={{paddingVertical: 15, width: '100%'}}>
                  <Text style={{...Fonts.fontMedium, fontSize: 16, textAlign: 'center', marginBottom:15}}>Agregar comentario</Text>
                  <View style={{ ...StylesGeneral.containerInput, marginBottom: 5 }}>
                    <InputField
                      multiline
                      numberOfLines={6}
                      value={comentario}
                      placeholder="Descripción de novedad"
                      onChange={(text) => setComentario( text )}
                    />
                  </View>
                </View>

                
                <View style={{paddingVertical: 0, alignItems: 'center'}}>
                  <View style={{marginVertical: 10}}>
                    <ButtonOfferApp 
                      uppercase={false} 
                      disabled={loadingReport}
                      loading={loadingReport}
                      text={'Enviar reporte'}
                      textColor={'white'}
                      buttonColor={Colors.primary}
                      buttonStyle={{paddingHorizontal: 30}}
                      onPress={() => sendReport()}
                      />
                      {(!loadingReport) && (
                        <TouchableOpacity style={{ paddingVertical: 15 }} onPress={() => ActionSheetNewReport.current?.hide()}>
                          <Text style={{...Fonts.fontMedium, fontSize: 16, textDecorationLine: 'underline', color: '#D0021B', textAlign: 'center' }}>Cancelar</Text>
                        </TouchableOpacity>
                      )}
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

  //-----------
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    paddingHorizontal: 10,
  },
  cardtitle: {
    ...Fonts.fontBold, 
    marginTop: 5,
    fontSize: 16,
    color: Colors.TextBlack
  },
  button: {
    alignItems: 'center',
    marginTop: 0,
  },
  cardDescription: {
    marginTop: -5,
    marginBottom: 5,
    fontSize: 14,
    color: Colors.TextBlack
  },
  signIn: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginBottom: 5
  },
  textSign: {
    fontSize: 14,
    ...Fonts.fontBold, 
  }
})


const mapStateToProps = (state) =>{
  return{
    token: state.user.token,
    datauuid: state.user.uuid,
    myPositions: state.location.location.coords,
    userData: state.user.dataUser,
  }
}


const mapDispatchToProps = dispatch => ({
  SendReport: (token, name, img, iduser, idparque, zonanovedad, comentario) => 
    dispatch(actions.api.sendReport(token, name, img, iduser, idparque, zonanovedad, comentario)),
  LoadParques: (token) => 
    dispatch(actions.api.loadParques(token)),
  dispatch
});

export default connect( mapStateToProps, mapDispatchToProps )(HomeApp);