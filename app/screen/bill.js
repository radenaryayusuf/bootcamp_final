import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Title, Text,Content } from 'native-base';
export default class bill extends Component {
  render() {
    return (
      <Container>
        <Header>
       <Left  style={{flex:1}} />
          <Body style={{flex:1}}>
            <Title>YOUR BILL</Title>
          </Body>
          <Right style={{flex:1}}>
          </Right>
        </Header>
          <Content padder>
          
          </Content>
      </Container>
    );
  }
}