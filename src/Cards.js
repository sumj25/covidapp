import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
export default class Cards extends Component {
    render() {
        return (
            <View style={{
                ...styles.container,
                backgroundColor: this.props.bg
            }}>
                <View style={styles.col}>
                </View>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text styles={{
                    ...styles.number,
                    color: this.props.bg == "#D93B4A" ? "#FFF" : "#000"
                }}>
                    {this.props.number}
                </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 130,
        borderRadius: 30,
        padding: 15,
        marginLeft: 20
    },
    col: {
        flexDirection: "row"
    },
    title: {
        marginTop: 22,
        color: '#b8b8aa',
        fontWeight: "bold",
        flexShrink: 12
    },
    number: {
        fontWeight: "bold",
        fontSize: 22
    }
})