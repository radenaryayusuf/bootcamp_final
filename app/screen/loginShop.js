import React, { Component } from "react";
import { StyleSheet, Text, View, ImageBackground, StatusBar, Image, AsyncStorage, ActivityIndicator, ScrollView } from "react-native";
import { Container, Card, CardItem, Item, Content, Button, Icon, Body, Input, Footer } from 'native-base'
import axios from 'axios'
import ipshop from '../configshop'
import IconM from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import OneSignal from 'react-native-onesignal'
class loginShop extends React.Component {
  constructor(properties) {
    super(properties);
   
    this.state = {
       
        isLogin: true,
    isLoading: false,
    email: '',
    password: '',
    nick: ''
    

  
    }
  }
 
 
  
  loginRegister = () => {
    this.setState({ isLoading: true })
    if (this.state.isLogin) {
      axios.post(`${ipshop}/login`,
        {
          email: this.state.email,
          password: this.state.password
        }
      ).then((response) => {
        try {
     
          AsyncStorage.setItem('token', response.data.token).then(() => {
            this.setState({ isLoading: false })
            this.props.navigation.push('listProduct')
          })
     
        } catch (error) {
     
          this.setState({ isLoading: false })
          alert(error)
     
        }

      }).catch((error) => {

        alert('Username & Password Salah')
        this.setState({ isLoading: false })
     
      })

    } else {

      axios.post(`${ipshop}/register`,
        {
          email: this.state.email,
          password: this.state.password
        }
      ).then((response) => {

        alert('Pendaftaran Berhasil Silahkan Login Untuk Melanjutkan')
        this.setState({ isLoading: false })

      }).catch((error) => {

        alert('Username & Password Salah')
        this.setState({ isLoading: false })

      })
    }
  }

  render() {
    return (
        <LinearGradient
        colors={['#C17549', '#865C53', '#402E32']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }} >
         <Image style={{ width: 240, height: 70,top:40, alignSelf: 'center' }} source={require('../image/RShop.png')} />
         <Text style={{color:'#402E32',top:50, fontFamily:'Roboto', fontSize:25, alignSelf:'center'}}>{this.state.isLogin ? 'Welcome Back,' : 'Join With Us !'}</Text>
            <Text style={{color:'#402E32',top:50, fontFamily:'Roboto', fontSize:15, alignSelf:'center'}}>{this.state.isLogin ? 'Sign in to continue' : 'Sign out to continue'}</Text>
         <View style={{ backgroundColor: 'transparent', width: 300,alignSelf:'center', height: this.state.isLogin ? 380 : 450 }}>

            
       
<Body style={{ justifyContent: 'center' }}>
  

  {/* {this.state.isLogin ||

  <Item style={{marginBottom:5, backgroundColor: 'transparent',color:'transparent'}}>
      <IconM style={{marginLeft:10}} size={25} color='#fff' active name='md-person' />
      <Input placeholder='Name' onChangeText={(name) => this.setState({ name })} />
    </Item>

  } */}

  {
    this.state.isLogin ||
    <Item style={{marginBottom:5, backgroundColor: 'transparent',color:'transparent'}} >
      <IconM style={{marginLeft:10}} size={25} color='#fff' active name='md-person' />
      <Input placeholder='Nickname' onChangeText={(nick) => this.setState({ nick })} />
    </Item>
  }

  <Item style={{marginBottom:5,backgroundColor: 'transparent',color:'transparent'}} >
    <IconM style={{marginLeft:10}} size={25} color='#fff' active name='ios-mail' />
    <Input style={{width:320}} placeholder='Email' onChangeText={(email) => this.setState({ email })} />
  </Item>
  <Item style={{backgroundColor: 'transparent',color:'transparent'}} >
    <IconM style={{marginLeft:10}} size={25} color='#fff' active name='md-key' />
    <Input style={{width:320}} placeholder='Password' secureTextEntry={true} onChangeText={(password) => this.setState({ password })} />
  </Item>

  <Button style={{ width: 300, borderColor: '#C17549', marginTop: 10, justifyContent: 'center', backgroundColor: '#C17549', borderRadius: 20 }} bordered onPress={this.loginRegister} >
    {this.state.isLoading ? <ActivityIndicator /> :
      <Text style={{color:'#fff', alignSelf: "center" }}>{this.state.isLogin ? 'Login' : "Create New"}</Text>}
  </Button> 
  

  <View style={{ flexDirection: 'row', marginTop: 5 }}>
    <View style={{ backgroundColor: 'black', height: 1, flex: 1, alignSelf: 'center' }} />
    <Text style={{ alignSelf: 'center', paddingHorizontal: 5, fontSize: 12 }}>OR</Text>
    <View style={{ backgroundColor: 'black', height: 1, flex: 1, alignSelf: 'center' }} />
  </View>
  <Button onPress={() => this.setState({ isLogin: !this.state.isLogin })} style={{ width: 300, borderColor: '#C17549', marginTop: 5, justifyContent: 'center', backgroundColor: '#C17549', borderRadius: 20 }} bordered >
    <Text style={{color:'#fff', alignSelf: "center" }}>{this.state.isLogin ? "Create An Account" : "Already have an Account?"} </Text>
  </Button>
</Body>


</View>

        </LinearGradient>

    )
  }
}
const iconStyles = {
  size: 100,
  color: "#FFFFFF"
};
const styles = StyleSheet.create({
  // Slide styles
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: null,
    height: null,
    resizeMode: 'cover'
  }

});
export default loginShop;