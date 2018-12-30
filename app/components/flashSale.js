import React, {Component} from 'react'
import{
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {Card,Content,Body,Button, CardItem, Right} from 'native-base'
import StarRating from 'react-native-star-rating'
class flashSale extends React.Component{
    render(){
        return(
            
          <Card style={{borderRadius: 0,width:345, height:270, marginRight:6, marginLeft:6, marginStart:0}} >
              
          <CardItem>
            
              <View>
                <Grid>
                  <Col style={{marginBottom:15}}>
                    
                  <Text style={{fontWeight : "bold",color: '#868686'}}>{this.props.title}</Text>
                   
                  </Col>
                  <Col>
                  <Button style={{width:50,height: 50 ,alignSelf: "flex-end",  justifyContent: "center", borderRadius: 0}} bordered info>
        <Text style={{ fontSize: 12,color: '#37B4AE'}}>50%</Text>
      </Button>
                  </Col>
                </Grid>
                <View style={{alignSelf:"center",marginTop:55}}>
                <Image
                style={{width: 310, height: 148}}
                source={this.props.imageUriFilm}
                
                />
              
                </View>
              </View>
          </CardItem>
          
         
          </Card>
        )
    }
}
export default flashSale;