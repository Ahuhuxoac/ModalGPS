import React, {useCallback} from 'react';
import {Colors, Images, Metrics, Svgs} from '../../assets';
import {Card, TouchableOpacity, View} from 'react-native-ui-lib';
import MainTitle from '../component/MainTitle';
import Container from '../component/Container';
import {Image, StyleSheet, ScrollView} from 'react-native';
import Text from '../component/common/Text';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import {useUserLogin} from '@src/hooks/user';
import {firebase} from '@src/config/firebaseconfig';
import {AppThunkDispatch} from '@src/redux/common';
import {useDispatch} from 'react-redux';
import {actions} from '@src/redux/user/UserActions';

const SelectVehicleScreen = () => {
  const {params}: any = useRoute();
  const navigation = useNavigation();
  const isProfile = params?.isProfile;
  const {userData} = useUserLogin();
  const dispatch = useDispatch<AppThunkDispatch>();

  const onSaveVehicleCar = useCallback(async () => {
    if (!userData) {
      return;
    }

    await firebase.firestore().collection('user').doc(userData.id).update({
      method: 'car',
    });

    firebase
      .firestore()
      .collection('user')
      .get()
      .then(result => result.docs)
      .then(docs =>
        docs.map(doc => ({
          id: doc.id,
          username: doc.data().username,
          uri: doc.data().uri,
          method: doc.data().method,
        })),
      )
      .then(data => {
        dispatch(actions.saveUserData({userData: data[0]}));
      });

    if (isProfile) {
      navigation.navigate('MAIN_TAB', {screen: 'MyPageStack'});
    } else {
      navigation.dispatch(StackActions.replace('MAIN_TAB'));
    }
  }, [dispatch, isProfile, navigation, userData]);

  const onSaveVehicleMotor = useCallback(async () => {
    if (!userData) {
      return;
    }

    await firebase.firestore().collection('user').doc(userData.id).update({
      method: 'motor',
    });

    firebase
      .firestore()
      .collection('user')
      .get()
      .then(result => result.docs)
      .then(docs =>
        docs.map(doc => ({
          id: doc.id,
          username: doc.data().username,
          uri: doc.data().uri,
          method: doc.data().method,
        })),
      )
      .then(data => {
        dispatch(actions.saveUserData({userData: data[0]}));
      });
    if (isProfile) {
      navigation.navigate('MAIN_TAB', {screen: 'MyPageStack'});
    } else {
      navigation.dispatch(StackActions.replace('MAIN_TAB'));
    }
  }, [dispatch, isProfile, navigation, userData]);
  return (
    <Container
      safeBottom
      backgroundColor={Colors.blueDarkTurquoise}
      barStyle="dark-content"
      backgroundBody={Colors.blueDarkTurquoise}>
      <MainTitle isgoBack notMenu={!isProfile} marginH-24 title="Phương tiện" />
      <ScrollView style={styles.container}>
        <View marginT-12></View>
        <Card paddingV-16 marginT-24 backgroundColor={Colors.white}>
          <Image source={Images.logo.car} style={styles.image} />
          <View row paddingH-16 paddingT-8 style={styles.spaceBetween}>
            <View>
              <Text marginB-8 h_page_title color={Colors.greyNightRider}>
                Xe ô tô
              </Text>
              <Text body_regular color={Colors.greyNightRider}>
                Tốc độ tối đa 60 km/h
              </Text>
            </View>
            <TouchableOpacity
              onPress={onSaveVehicleCar}
              center
              backgroundColor={Colors.whiteSmoke}
              style={styles.arrowRight}>
              <Svgs.ArrowRight height={24} width={24} />
            </TouchableOpacity>
          </View>
        </Card>
        <Card paddingV-16 marginT-24 backgroundColor={Colors.white}>
          <Image source={Images.logo.motor} style={styles.image} />
          <View flex row paddingH-16 paddingT-8 style={styles.spaceBetween}>
            <View>
              <Text marginB-8 h_page_title color={Colors.greyNightRider}>
                Xe máy
              </Text>
              <Text body_regular color={Colors.greyNightRider}>
                Tốc độ tối đa 40 km/h
              </Text>
            </View>
            <TouchableOpacity
              onPress={onSaveVehicleMotor}
              center
              backgroundColor={Colors.whiteSmoke}
              style={styles.arrowRight}>
              <Svgs.ArrowRight height={24} width={24} />
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: Metrics.screen.width - 32,
    resizeMode: 'contain',
  },
  arrowRight: {
    height: 40,
    width: 40,
    borderRadius: 8,
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});

export default SelectVehicleScreen;
