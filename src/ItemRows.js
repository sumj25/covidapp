import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ItemRows = ({ item }) => {
    return (
        <View style={styles.rows}>
            <View style={{
                justifyContent: 'space-around',
                color:'white',
                alignSelf:'center'
            }}>
            <View style={styles.card}>
            <View style={{flexDirection:'row'}}>
            <View style={{ marginRight:windowWidth/20, marginTop: windowHeight/80,paddingLeft:windowWidth/15 }}>
            <Text style={styles.countryName}>{item.Country}</Text>
        </View>
        <View  style={styles.image}>
            <Image
                source={{
                    uri: `https://www.countryflags.io/${item.CountryCode}/flat/64.png`
                }}
                style={styles.flag}
            />
           
        </View>
       </View>
        <View style={{flexDirection:'row'}}>
        <View style={{paddingRight:windowWidth/3,paddingLeft:windowWidth/15}}>
        <Text style={styles.totalCases}>Confirmed</Text>
            <Text style={{fontSize:20,color:'black', fontWeight: 'bold', marginTop: 5}}>{item.TotalConfirmed}</Text>
                 <Text style={styles.totalCases}>{item.NewConfirmed > 0 ? '  ↑ ' + item.NewConfirmed:' '}</Text>
            
       
            </View>
            <View style={{marginright:windowWidth/15}}>
            <Text style={styles.totaldea}>Deceased</Text>
            <Text style={{fontSize:20,color:'red', fontWeight: 'bold', marginTop: 5}}>{item.TotalDeaths}</Text>
            <Text style={styles.totaldea}>{item.NewDeaths > 0 ? '  ↑ ' + item.NewDeaths:' '}</Text>
            </View>
            </View>
            <View style={{alignSelf:'center'}}>
            <Text style={styles.totalrec}>Recovered</Text>
            <Text style={{fontSize:20,color:'blue', fontWeight: 'bold', marginTop: 5}}>{item.TotalRecovered}</Text>
            <Text style={styles.totalrec}>{item.NewRecovered > 0 ? '  ↑ ' + item.NewRecovered:' '}</Text>
        </View>
            </View>
               
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rows: {
        width: '100%',
        marginTop: 10,
        marginBottom: 8,
        padding: 10
    },
    image:{
        paddingTop:windowHeight/80
    },
    countryName: {
        fontSize: 18,
        color:'red',
        fontWeight: 'bold'
    },
    totalCases: {
        fontSize: 12,
        color:'black',
        fontWeight: 'bold',
        marginTop: 5
    },
    totaldea: {
        fontSize: 12,
        color:'red',
        fontWeight: 'bold',
        marginTop: 5
    },
    totalrec: {
        fontSize: 12,
        color:'blue',
        fontWeight: 'bold',
        marginTop: 5
    },
    flag: {
        height: 30,
        width: 40,
        padding: 10, 
        borderRadius: 1000
    },
    card:{
        backgroundColor:'white',
        width:windowWidth-50,
        height:windowHeight-530,
        shadowColor: '#000000',
            shadowOffset: {
              width: 0,
              height: 3
            },
            shadowRadius: 5,
            shadowOpacity: 1.0,
        borderRadius:15} 
});

export default ItemRows;