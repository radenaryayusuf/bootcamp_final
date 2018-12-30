
import React, { Component } from 'react'
import VideoPlayer from 'react-native-video-controls'
import { View, StyleSheet } from 'react-native'
//   file={'https://content.jwplatform.com/manifests/vM7nH0Kl.m3u8'}
export default class VideoS extends Component {
    render() {
        return (
            <VideoPlayer
                ref={(ref) => {
                    this.player = ref
                }}
                source={{ uri: "https://r4---sn-4pgnuhxqp5-jb3r.googlevideo.com/videoplayback?id=16e9c24ff2516de7&itag=18&source=blogger&mm=31&mn=sn-4pgnuhxqp5-jb3r&ms=au&mv=m&pl=19&ei=fs4lXOWHC4rF-QPXg664Dg&susc=bl&mime=video/mp4&dur=1457.980&lmt=1545885999346045&mt=1545981374&ip=139.193.70.16&ipbits=0&expire=1546010366&sparams=ip,ipbits,expire,id,itag,source,mm,mn,ms,mv,pl,ei,susc,mime,dur,lmt&signature=3E66EDDC1B3F21CE0F8795BFCC2C5425F2209459552281730C12A7CB4EE11D1E.A71CA670369204B8DF4D181F097ABE705DF84185EAA164D428FC477E642F334E&key=us0&cpn=1L-xA38PrJ7RTQaZ&c=WEB_EMBEDDED_PLAYER&cver=20181220" }}
                style={styles.backgroundVideo} />

        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        height: 180
    },
    backgroundVideo: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: null,
        height: 300
    },
    image: {
        width: null,
        height: 300,
    },
    linearGradient: {
        flex: 2
    }
});
