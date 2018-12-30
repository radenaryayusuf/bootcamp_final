import React, { Component } from 'react'
import { Text, View, Image, ImageBackground, TouchableOpacity, AsyncStorage,Dimensions,StyleSheet } from 'react-native'
import { Card, Content, Container, Grid, Row , Button, Icon} from 'native-base'
import axios from 'axios'
import Star from 'react-native-star-view';
import { GET_FAVORIT, USER } from '../actions/video';
import { connect } from 'react-redux'
import ip from '../config'
import LinearGradient from 'react-native-linear-gradient';
import { Col } from 'react-native-easy-grid';
import IconI from 'react-native-vector-icons/Ionicons'
const {width} = Dimensions.get('window')



class cardUsersFavourite extends Component {

    // async componentDidMount() {


    //     const token = await AsyncStorage.getItem('token')
    //     console.log(token)
    //     if (token === null) {
    //         this.setState({ isLogin: false })
    //     } else if (token === 'isRegister') {
    //         this.setState({ isLogin: false })
    //     } else {
    //         this.props.dispatch(GET_FAVORIT(token))
    //         this.setState({ isLogin: true })
    //     }

    // }


    state = {
        favorit: false,
        isLogin: this.props.isLogin,
        isLoading: false,
       
        height: Dimensions.get('window').height
    }

    favorit = async (item) => {

        const token = await AsyncStorage.getItem('token')
        
        if (token != null) {
            console.log(item)
            await axios.post(ip + '/user/favorite',
                {
                    series: item
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    },
                }

            ).then(() =>
                this.setState({ favorit: !this.setState.favorit })
            ).catch((error) => {
                console.log(error)
            })
        }
    }

    showFavorit(item) {
        if (this.props.favorite.results.name_series === item.item.series) {
            return (
                <TouchableOpacity disabled={!this.state.isLogin} onPress={() => this.favorit(item.series)}>
                    <View style={{ height: 30, width: null, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopColor: '#D8368C', borderTopWidth: 2 }}>
                        <Text style={{ color: '#D8368C', fontFamily: 'Roboto-Medium', fontSize: 10 }}>
                            Favorit
                    </Text>
                        <Image source={require('../assets/icon/done.png')} style={{ height: 12, width: 12, marginLeft: 5 }} />
                    </View>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity disabled={!this.state.isLogin} onPress={() => this.favorit(item.item.series)}>
                    <View style={{ height: 30, width: null, backgroundColor: this.state.isLogin ? '#D8368C' : '#929292', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                        <Text style={{ color: 'white', fontFamily: 'Roboto-Medium', fontSize: 10 }}>
                            Add to Favorit
                    </Text>
                        <Image source={require('../assets/icon/add.png')} style={{ height: 12, width: 12, marginLeft: 5 }} />
                    </View>
                </TouchableOpacity>
            )

        }
    }

    render() {
        console.log('action')
        const { item } = this.props
        return (
            <Content style={{flex:1}}>
            <View style={{ backgroundColor:'transparent',borderWidth:0 ,margin:5,borderColor:'transparent', width: null, height: 170 }}>
           
                    <ImageBackground style={{ width: null, height: 150 }} source={{ uri: item.image_url }} imageStyle={{  borderWidth:2, borderColor:'#fff' }}>

                    <View style={styles.talkBubbleTriangle} />

                        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                            <View style={{ backgroundColor: 'rgba(0,0,0,0.5)',marginLeft:2,margin:2, marginBottom:2, height: 40, width: null }}>
                                <View style={{ height: null, width: 110 }}>
                                    <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 12, color: 'white', marginLeft: 5 }}>
                                        {item.series.substring(0, 24)}...
                                    </Text>
                                </View>

                                <Star score={item.rating / 2} style={{ width: 40, height: 8, marginLeft: 5 }} />

                            </View>
                        </View>
                    </ImageBackground>
                {/* {this.showFavorit({ item })} */}
               
            </View>



            {/* <ImageBackground style={{flex:1, width, height:200}} source={require('../image/seishun.jpg')} >
            
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)']} style={styles.linearGradient}>
            <Content padder>
            
            <Grid>
                <Row>
                    <Col>
                <Text style={{fontFamily:'Roboto',fontSize:25 , fontWeight:'bold',color:'#FBFBFB'}}>Seishun Buta Yarou</Text>
                </Col>
                <Col>
                <IconI name='ios-close' color='#FBFBFB' style={{flex:1, alignSelf:'flex-end' , marginRight:5}} size={35} />
                </Col>
                </Row>
                <Row style={{width:200, marginBottom:15}}>
                <Text style={{color:'#7D7D7D'}}>Menurut rumor yang beredar Sindrom Puber adalah sindrom misterius yang hanya mempengaruhi mereka di masa puber.</Text>
                </Row>
                <Row>
                    <Col style={{flexDirection:'row'}}>
                <Button style={{width:70, height:30, backgroundColor:'#E10916'}}>
            <IconI size={20} color='#FBFBFB' style={{marginLeft:10}} name='md-play' />
            <Text style={{color:'#FBFBFB', fontWeight:'bold'}}>Play</Text>
            <Text></Text>
            
          </Button>
          <Button style={{width:70,marginLeft:5, borderColor:'#FBFBFB', borderWidth:1,  height:30, backgroundColor:'transparent'}}>
            <Image source={require('../assets/icon/add.png')} style={{ height: 12, width: 12, marginLeft: 5 }} />
            <Text style={{color:'#FBFBFB', fontWeight:'bold'}}>Add</Text>
            <Text></Text>
            
          </Button>
          </Col>
                </Row>
            </Grid>
            </Content>
            </LinearGradient>
            
            </ImageBackground> */}
            </Content>
            
           
     
        )
    }
}

const mapStateToProps = (state) => ({
    favorite: state.favoriteReducers
})

export default connect(mapStateToProps)(cardUsersFavourite)

var styles = StyleSheet.create({
    linearGradient: {
      height:200,
      width:null,
      paddingLeft: 15,
      paddingRight: 15,
      position: 'relative'
    },
    talkBubbleTriangle: {
        position: 'absolute',
    bottom: -26,
    left:45,
    top: 150,
    width: 0,
    height: 0,
    borderTopColor: '#fff',
    borderTopWidth: 8,
    borderRightWidth: 12,
     borderLeftWidth: 12,
     borderLeftColor:'transparent',
    borderRightColor: 'transparent',
    borderBottomWidth: 26,
    borderBottomColor: 'transparent'
      }
  });