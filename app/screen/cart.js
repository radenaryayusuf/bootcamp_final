import React, { Component } from 'react';
import { Container, Header, Left, Body,List,ListItem, Right, Button, Title,Item,Input,Footer,FooterTab, Text,Content,Icon } from 'native-base';
import { connect } from 'react-redux'
import { GET_CART } from '../actions/video'
import { TextInput } from 'react-native-paper'
class cart extends Component {
  constructor(properties) {
    super(properties);
    this.state = {
       
    isLoading: false,
    quantity : '0'
    }
  }
  async componentDidMount() {
    await  this.props.dispatch(GET_CART())
  }
  render() {
    return (
      <Container>
        <Header>
          <Left  style={{flex:1}}>
        <Button onPress={ () => this.props.navigation.goBack() } transparent>
              <Icon name='arrow-back' />
            </Button>
            </Left>
          <Body style={{flex:1}}>
            <Title>MY CART</Title>
          </Body>
          <Right style={{flex:1}}>
          </Right>
        </Header>
          <Content padder>
          <List> 
            {
              this.props.cartlist.isLoading ? <ListItem >
              <Text>Loading</Text>
            </ListItem> :
            this.props.cartlist.results.map((item) => (
              
              <ListItem key={item.id}  >
              <Left>
              <Text>{item.product.name}</Text>
              </Left>
              <Body></Body>
              <Right style={{flexDirection:'row',marginLeft:20}}>

              <Item style={{width:30}} regular>
            <Input style={{alignSelf:'center'}}  onChangeText={(text) => this.setState({quantity : text })}
            value={this.state.quantity}
            keyboardType='numeric' />
          </Item> 
              </Right>
            </ListItem>
          
            
          ))}
          </List>
          </Content>
          <Footer>
          <FooterTab>
            <Button>
              <Icon name="arrow-forward" />
            </Button>
           
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cartlist: state.cartReducer
  }
}

export default connect(mapStateToProps)(cart);