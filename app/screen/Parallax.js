import React, { Component } from "react";
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Image,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  ImageBackground,
  Dimensions
} from "react-native";
import Video from 'react-native-video'
const {width} = Dimensions.get('window')
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from 'react-native-linear-gradient'
import Shimmer from './Shimmer'
import CardFavorite from '../components/CardFavorite'
import IconI from 'react-native-vector-icons/Ionicons'
import { POPULAR, ALL_VIDEOS, USER, DETAIL_VIDEO } from '../actions/video'

import { connect } from 'react-redux'
import axios from 'axios'
import ip from '../config'

import IconA from 'react-native-vector-icons/FontAwesome'


import {Header,Left,Body,Right, Icon,Content, Button} from 'native-base'

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

 class Parallax extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
      ),
      refreshing: false,
      token: '',
      isLoading: false,
      isLogin: false,
      videos: 5,
      popular: 5,
      preview: false,
      isLoggedin : true
    };
  }

  async componentDidMount() {

    const token = await AsyncStorage.getItem('token')
    this.props.dispatch(POPULAR(this.state.popular))
    this.props.dispatch(ALL_VIDEOS(this.state.videos))

    if (token) {

      this.setState({ isLogin: true })

      const result = await axios.get(ip + '/user/profile', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })

      this.props.dispatch(USER(result.data))

    } else {

      this.setState({ isLogin: false })

    }
  }


  preview = (slug) => {
    console.log(slug)
    if(this.state.preview == true)
    {
      this.setState({preview: false})
     
    }
    else
    {
      this.setState({preview: true})
     
    }
    this.props.dispatch(DETAIL_VIDEO(slug))
  }
 
  handleMorePopular = () => {

    this.setState({ popular: this.state.popular + 2 })
    this.props.dispatch(POPULAR(this.state.popular + 2))

  }

  footerComponent = () => {
    return <FlatList
      keyExtractor={(index) => `index${index}`}
      data={[1, 2, 3]}
      numColumns={3}
      renderItem={() =>
        <Shimmer
          style={{ height: 180, width: 110, marginRight: 10 }}
          autoRun={true} />
      }
    />
  }

  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    return (
     
        <View style={styles.scrollViewContent}>
        {this.state.isLoggedin ? 
        <Content padder>
        <View style={{ flexDirection: "row" ,marginTop:10}}>
          <Text
            style={{
              alignSelf: "center",
              paddingHorizontal: 5,
              color: "#E0E0E0",
              fontFamily: "Roboto-Bold",
              fontSize: 18,
              fontWeight: "500",
              marginBottom: 8
            }}
          >
           My List
          </Text>
        </View>

        <FlatList
          onEndReachedThreshold={.7}
          onEndReached={this.handleMorePopular}
          keyExtractor={(item, index) => `index${index}`}
          horizontal={true}
          ListFooterComponent={this.footerComponent}
          data={this.props.popular.results}
          showsHorizontalScrollIndicator={false}
          emptyComponent={this.showShimmer1}
          renderPlaceholder
          renderItem={({ item }) => (
            <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center", flex: 1, marginRight: 10 }}
            // onPress={() =>
            //   this.props.navigation.navigate("VideoScreen", {
            //     slug: item.slug,
            //     series: item.series
            //   })
            // }
            onPress={() => this.preview(item.slug)}
          >
            <CardFavorite item={item} {...this.props} />
            </TouchableOpacity>





          )}
        />
{this.state.preview &&
              <TouchableOpacity style={{height:200,
                width,
                top:-16, marginRight: 20}} onPress={() =>
                this.props.navigation.push('VideoScreen', {
                  slug: this.props.allVideo.data.slug,
                  series: this.props.allVideo.data.series,
                },
                  this.setState({ paused: true })
                )}>
                <Video
                  muted={true}
                  ref={(ref) => {
                    this.player = ref
                  }}
          //        paused={this.state.paused}
                  source={{ uri: "https://r4---sn-4pgnuhxqp5-jb3r.googlevideo.com/videoplayback?id=16e9c24ff2516de7&itag=18&source=blogger&mm=31&mn=sn-4pgnuhxqp5-jb3r&ms=au&mv=m&pl=19&ei=ofklXI7TPIu_-wOQg4L4Cg&susc=bl&mime=video/mp4&dur=1457.980&lmt=1545885999346045&mt=1545992467&ip=139.193.70.16&ipbits=0&expire=1546021409&sparams=ip,ipbits,expire,id,itag,source,mm,mn,ms,mv,pl,ei,susc,mime,dur,lmt&signature=025678C7EFEA72DF47BF41195A569FB7B3BD5477624A57824C3F6D41C460A8EB.9281F92571AD8D35C13D131F1357EF23583F7DD0B411921BDFC697025D8A6A08&key=us0&cpn=oweQgWIUldYg6oAg&c=WEB_EMBEDDED_PLAYER&cver=20181220" }}
                  style={styles.backgroundVideo} >


   
                  </Video>
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)']} style={styles.linearGradient}>
        <Content padder style={{backgroundColor:'transparent' }}>
        
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
        
              </TouchableOpacity>
            }


      </Content> :
         null }
            
          <Content padder>
            <View style={{ flexDirection: "row" ,marginTop:10,marginLeft:10}}>
              <Text
                style={{
                  alignSelf: "center",
                  paddingHorizontal: 5,
                  color: "#E0E0E0",
                  fontFamily: "Roboto-Bold",
                  fontSize: 18,
                  fontWeight: "500",
                  marginBottom: 8
                }}
              >
                Most Populer
              </Text>
            </View>

            <FlatList
              onEndReachedThreshold={.7}
              onEndReached={this.handleMorePopular}
              keyExtractor={(item, index) => `index${index}`}
              horizontal={true}
              ListFooterComponent={this.footerComponent}
              data={this.props.popular.results}
              showsHorizontalScrollIndicator={false}
              emptyComponent={this.showShimmer1}
              renderPlaceholder
              renderItem={({ item }) => (
                <CardFavorite item={item} {...this.props} />
              )}
            />
          </Content>

          <Content padder>
            <View style={{ flexDirection: "row" ,marginTop:10,marginLeft:10}}>
              <Text
                style={{
                  alignSelf: "center",
                  paddingHorizontal: 5,
                  color: "#E0E0E0",
                  fontFamily: "Roboto-Bold",
                  fontSize: 18,
                  fontWeight: "500",
                  marginBottom: 8
                }}
              >
                Most Populer
              </Text>
            </View>

            <FlatList
              onEndReachedThreshold={.7}
              onEndReached={this.handleMorePopular}
              keyExtractor={(item, index) => `index${index}`}
              horizontal={true}
              ListFooterComponent={this.footerComponent}
              data={this.props.popular.results}
              showsHorizontalScrollIndicator={false}
              emptyComponent={this.showShimmer1}
              renderPlaceholder
              renderItem={({ item }) => (
                <TouchableOpacity
                style={{ justifyContent: "center", alignItems: "center", flex: 1, marginRight: 10 }}
                // onPress={() =>
                //   this.props.navigation.navigate("VideoScreen", {
                //     slug: item.slug,
                //     series: item.series
                //   })
                // }
                onPress={() => this.preview(item.slug)}
              >
                <CardFavorite item={item} {...this.props} />
                </TouchableOpacity>





              )}
            />
 {this.state.preview &&
                  <TouchableOpacity style={{height:200,
                    width,
                    top:-16, marginRight: 20}} onPress={() =>
                    this.props.navigation.push('VideoScreen', {
                      slug: this.props.allVideo.data.slug,
                      series: this.props.allVideo.data.series,
                    },
                      this.setState({ paused: true })
                    )}>
                    <Video
                      muted={true}
                      ref={(ref) => {
                        this.player = ref
                      }}
              //        paused={this.state.paused}
                      source={{ uri: "https://r4---sn-4pgnuhxqp5-jb3r.googlevideo.com/videoplayback?id=16e9c24ff2516de7&itag=18&source=blogger&mm=31&mn=sn-4pgnuhxqp5-jb3r&ms=au&mv=m&pl=19&ei=ofklXI7TPIu_-wOQg4L4Cg&susc=bl&mime=video/mp4&dur=1457.980&lmt=1545885999346045&mt=1545992467&ip=139.193.70.16&ipbits=0&expire=1546021409&sparams=ip,ipbits,expire,id,itag,source,mm,mn,ms,mv,pl,ei,susc,mime,dur,lmt&signature=025678C7EFEA72DF47BF41195A569FB7B3BD5477624A57824C3F6D41C460A8EB.9281F92571AD8D35C13D131F1357EF23583F7DD0B411921BDFC697025D8A6A08&key=us0&cpn=oweQgWIUldYg6oAg&c=WEB_EMBEDDED_PLAYER&cver=20181220" }}
                      style={styles.backgroundVideo} >


       
                      </Video>
                      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#000', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)']} style={styles.linearGradient}>
            <Content padder style={{backgroundColor:'transparent' }}>
            
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
            
                  </TouchableOpacity>
                }


          </Content>
        </View>
    //   <View style={styles.scrollViewContent}>
    //     {data.map((_, i) => (
    //       <View key={i} style={styles.row}>
    //         <Text>{i}</Text>
    //       </View>
    //     ))}
    //   </View>
    
    );
  }

  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp"
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp"
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 150],
      extrapolate: "extend"
    });

    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: "clamp"
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: "clamp"
    });

    return (
      <View style={styles.fill}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                setTimeout(() => this.setState({ refreshing: false }), 1000);
              }}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT
          }}
        >

          {this._renderScrollViewContent()}

          
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] }
          ]}
        >
        <Animated.View style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }]
              }
            ]}>
            <ImageBackground
              source={require('../assets/img/anime.jpg')} 
              style={{height:250}}
            >
            <View style={{backgroundColor:'rgba(0,0,0,0.7)',flex:1}}>

            </View>
            </ImageBackground>
            <View style={{height:40,alignSelf:'center',flexDirection:'row',marginTop:-20}}>
                <View style={{flexDirection:'row', height:40,width:100,marginRight:20,backgroundColor:'#E84393',borderRadius:6,justifyContent:'center',alignItems:'center'}}>
                  <IconA name='caret-right' style={{fontSize:30}} color='white'/>
                  <Text style={{color:'white',fontSize:14,fontWeight:'500',marginLeft:10}}>
                    PLAY
                  </Text>
                </View>
                <View style={{height:40,width:100,borderColor:'#E84393',borderRadius:6,borderWidth:2,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={{ color: 'white', fontFamily: 'Roboto-Medium', fontSize: 10 }}>
                            Add to Favorit
                    </Text>
                        <Image source={require('../assets/icon/add.png')} style={{ height: 12, width: 12, marginLeft: 5 }} />
                </View>
            </View>
            
        </Animated.View>
          {/* <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }]
              }
            ]}
            source={require("../assets/img/anime.jpg")}
          /> */}
           
          
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,{alignItems:'center'}
            
          ]}
        >
          {/* <Text style={styles.title}>Title</Text> */}
          <View style={{width:'100%',height:60,flexDirection:'row'}}>
            <View style={{flex:1}}>
                <Image
                    style={{ width: 110, height: 30,marginLeft:10}}
                    source={require("../assets/img/Animeflix(EDITED).png")}

                  />
            </View>
            <View style={{justifyContent:'center',height:40,marginRight:50}}>
                <View style={{alignSelf:'flex-end',flexDirection:'row'}}>
                    <IconA name='search' style={{fontSize:20,marginRight:20}} color='white'/>
                    <IconA name='bell' style={{fontSize:20}} color='white'/>
                </View>
            </View>  


          </View>
        </Animated.View>
      </View>
    );
  }
}

const stateMapToProps = state => ({
    popular: state.popularReducers,
    allVideo: state.videoReducers,
    user: state.userReducers
  });
  
  export default connect(stateMapToProps)(Parallax);



const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor:'#101010'
  },
  content: {
    flex: 1
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#101010",
    overflow: "hidden",
    height: HEADER_MAX_HEIGHT
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null,
    // height: HEADER_MAX_HEIGHT,
    height:250,
    resizeMode:'contain'
    
  },
  linearGradient: {
    height:200,
    width:null,
    paddingLeft: 15,
    paddingRight: 15,
    position: 'relative'
  },
  bar: {
    backgroundColor: "transparent",
    marginTop: Platform.OS === "ios" ? 28 : 38,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0
  },
  title: {
    color: "white",
    fontSize: 18
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== "ios" ? HEADER_MAX_HEIGHT : 0
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    marginRight:5
  },
});