import React, { Component } from 'react';
import {Image ,ScrollView} from 'react-native';
import { Container, Card,Header,Left,Body,Title,ActivityIndicator,Label,Right,Button,Badge,Item,Input, Content, List,Icon, ListItem, Text,CardItem,Footer,FooterTab } from 'native-base';
import axios from 'axios'
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from 'react-redux'
import { GET_PRODUCTS } from '../actions/video'
import IconM from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'
import SlideShow from '../components/swipershop';
import FlashSales from '../components/flashSale';
 class listProduct extends Component {
  constructor(properties) {
    super(properties);
    this.state = {
       
    isLoading: false,
    badgecount : 0,
    quantity : 0
    }
  }
  gotoCart() {
    this.props.navigation.push('cart')
  }

  addToCart (id_product, prices ) {
    {
      this.state.quantity < 1 ? 
       axios.post('http://192.168.1.124:3333/order',
      {
        product_id: id_product,
        qty : this.state.quantity,
        price: prices 
      }
    ).then((response) => {
  
      alert('Item Sudah ditambahkan')
      this.setState({ isLoading: false })
  
    }).catch((error) => {
  
      alert('Gagal untuk menambahkan')
      this.setState({ isLoading: false })
  
    }) :
    alert('Item Sudah ada di cart')
  //   axios.patch(`http://192.168.1.124:3333/order/${id_product}`,
  //   {
  //     qty : this.state.quantity
  //   }
  // ).then((response) => {

  //   alert('Item Sudah ditambahkan lagi')
  //   this.setState({ isLoading: false })

  // }).catch((error) => {

  //   alert('Gagal untuk menambahkan lagi')
  //   this.setState({ isLoading: false })

  // })
    }
   
  }

   
  async componentDidMount() {
    await  this.props.dispatch(GET_PRODUCTS())
  }
  // gotoMovie(id) {
  //   this.props.navigation.push('cart', {id})
  // }
  gotoMovie() {
    this.props.navigation.push('cast')
  }
  render() {
    return (
      <Container>
        <Header searchBar rounded androidStatusBarColor='#fff' style={{ backgroundColor: '#fff', padding: 0 }}>
         
          {/* <Body style={{flex:2}}> */}
          <Item style={{ backgroundColor: 'rgba(0,0,0,0.2)'}} >
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Button onPress={ () => {this.gotoCart()}}  transparent>
             
              <Icon name="cart" />
            </Button>
            <Button transparent>
             
             <Icon name="notifications-outline" />
           </Button>
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
          {/* </Body> */}
         
        </Header>
        <Content>
        <SlideShow />
        <Button style={{marginTop: -50, marginLeft: 270}} transparent><Label style={{color: '#EDEDED', textShadowColor: '#8D8D8D', textShadowOffset: {width: 2, height: 2},textShadowRadius: 10 }}>Lihat Semua</Label></Button>
        <Content padder>
        <Grid>
          <Row style={{justifyContent:'space-around',marginBottom:15,marginTop:15}}>
            <Col style={{width:30 }}><Image style={{width:30, height:40}} source={require('../image/icon1.png')} />
            <Text style={{textAlign:'center', fontSize:10,color:'#B9B9B9'}}>Wanita</Text>
            </Col>
            <Col style={{width:40 }}><Image style={{width:40, height:40}} source={require('../image/icon2.png')} />
            <Text style={{textAlign:'center', fontSize:10,color:'#B9B9B9'}}>Olahraga</Text></Col>
            <Col style={{width:32 }}><Image style={{width:30, height:43}} source={require('../image/icon3.png')} />
            <Text style={{textAlign:'center', fontSize:10,color:'#B9B9B9'}}>Gaming</Text></Col>
            <Col style={{width:45 }}><Image style={{width:45, height:40}} source={require('../image/icon4.png')} />
            <Text style={{textAlign:'center', fontSize:10,color:'#B9B9B9'}}>Film</Text></Col>
            <Col style={{width:48 }} ><Image style={{width:48, height:40}} source={require('../image/icon5.png')} />
            <Text style={{textAlign:'center', fontSize:10,color:'#B9B9B9'}}>Kamera</Text></Col>
          </Row>
          <Row style={{justifyContent:'space-around'}}>
            <Col style={{width:43 }}><Image style={{width:43, height:40}} source={require('../image/icon6.png')} />
            <Text style={{textAlign:'center', fontSize:10,color:'#B9B9B9'}}>Kesehatan</Text>
            </Col>
            <Col style={{width:40 }}><Image style={{width:40, height:40}} source={require('../image/icon7.png')} />
            <Text style={{textAlign:'center', fontSize:10,color:'#B9B9B9'}}>Kado</Text></Col>
            <Col style={{width:35 }}><Image style={{width:35, height:43}} source={require('../image/icon8.png')} />
            <Text style={{textAlign:'center', fontSize:10,color:'#B9B9B9'}}>Buku</Text></Col>
            <Col style={{width:45 }}><Image style={{width:45, height:40}} source={require('../image/icon9.png')} />
            <Text style={{textAlign:'center', fontSize:10,color:'#B9B9B9'}}>Hobi</Text></Col>
            <Col style={{width:48 }} ><Image style={{width:48, height:48}} source={require('../image/icon10.png')} />
            <Text style={{textAlign:'center', fontSize:10,color:'#B9B9B9'}}>Software</Text></Col>
          </Row>
        </Grid>
        </Content>
        <Card style={{borderRadius: 0, marginLeft: 0,marginRight: 0, height:320}}>
              <CardItem  header button onPress={() => alert("This is Card Header")}>
                <Grid>
                  <Row style={{height:5}}>
                    <Col>
                    <Text style={{color: '#868686', fontWeight: "bold",marginLeft:-10}}>Flash Deal</Text>
                    </Col>
                    <Col>
                    <Button style={{ marginTop: -12,marginRight:-20,alignSelf: "flex-end"}} transparent><Text style={{fontSize: 14,color:'#868686'}}>Lihat Semua</Text></Button>
                    </Col>
                    </Row>
                </Grid>
                
              </CardItem>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} scrollEventThrottle = {10}>
              <FlashSales
        imageUriFilm={require('../image/flash1.png')}
        title="Under Armour's"
       
        />
        <FlashSales
        imageUriFilm={require('../image/flash2.jpg')}
        title="Use Turtle Beach PS4 Headset"
      
        />
        <FlashSales
        imageUriFilm={require('../image/flash3.jpg')}
        title="Leo Gomez Studio TShirt"
      
        />
              </ScrollView>

              </Card>

        <List> 
            {
              this.props.products.isLoading ? <ListItem >
              <Text>Loading</Text>
            </ListItem> :
            this.props.products.results.map((item) => (
              
              <ListItem key={item.id}  >
              <Left style={{flexDirection:'column'}} >
              <Image 
               source={{uri:item.image_url}}
               style={{
                 flex:1, width: 80, height: 80, resizeMode: 'cover',borderRadius:10
               }}
               />
              <Text style={{marginLeft:-60}} >{item.name}</Text>
              </Left>
              <Body style={{ flexDirection:'row'}}>
              <Icon   name='pricetag' />
                <Text style={{ fontWeight:'bold'}}>{item.price}</Text>
                
              </Body>
              <Right>
              <Button style={{width:47}} onPress={() => {this.addToCart(item.id, item.price), this.setState({quantity : this.state.quantity + 1})}}   primary>
          
            <Icon   name='add' />
          </Button>
              </Right>
            </ListItem>
          
            
          ))}
          </List>
            
         
        </Content>
        <Footer style={{backgroundColor:'#fff'}}>
          <FooterTab style={{backgroundColor:'#fff'}}>
            <Button >
              <IconM active name="home" size={25} />
            </Button>
            <Button>
              <IconM name="mail"  size={25} />
            </Button>
            <Button>
              <IconM name="user"  size={25} />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.productreducer
  }
}

export default connect(mapStateToProps)(listProduct);