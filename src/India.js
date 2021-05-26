import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet,Button,Pressable } from 'react-native'
import { formatDistance } from 'date-fns'
import { Dimensions } from 'react-native';
import Cards from './Cards'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Home() {
    const [loaded, setLoaded] = useState(false)
    const [err, setErr] = useState('')
    const [total, setTotal] = useState({})
    const [tested, setTested] = useState({})
    const [statesData, setStatesData] = useState([])
    useEffect(() => {
        fetch('https://api.covid19india.org/data.json')
            .then(response => response.json())
            .then(response => {
                fetch('https://api.covid19india.org/v2/state_district_wise.json')
                    .then(response2 => response2.json())
                    .then(response2 => {
                        setTotal(response.statewise[0])
                        setTested(response.tested[response.tested.length - 1])
                        var states = []
                        for(var i = 1; i < response.statewise.length; i++) {
                            var state = response2.find(x => x.state === response.statewise[i].state)   
                            if(typeof state !== 'undefined') {
                                state['confirmed'] = response.statewise[i].confirmed
                                state['deaths'] = response.statewise[i].deaths
                                state['active'] = response.statewise[i].active
                                state['recovered'] = response.statewise[i].recovered
                                state['lastupdatedtime'] = response.statewise[i].lastupdatedtime
                                state['visible'] = false
                                states.push(state)
                            }  
                        }
                        setStatesData(states)
                        setLoaded(true)
                    })
                .catch(err => setErr(err))
            })
        .catch(err => setErr(err))
    }, [])
 
    const formatDate = (unformattedDate) => {
        const day = unformattedDate.slice(0, 2);
        const month = unformattedDate.slice(3, 5);
        const year = unformattedDate.slice(6, 10);
        const time = unformattedDate.slice(11);
        return `${year}-${month}-${day}T${time}+05:30`;
    };
    const handleTouch = (index) => {
        var temp = [...statesData]
        temp[index].visible = !temp[index].visible
        setStatesData(temp)
        console.log("suman")
        console.log(temp[index].visible )
    }
    if(err) {
        return (
            <View style={{flex : 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontFamily:'Teko-Regular',fontSize: 15,color:'#ff3d3d'}}>{err}</Text>
            </View>
        )
    }
    else if(!loaded) {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontFamily: 'Teko-Regular',fontSize: 15}}>LOADING...</Text>
            </View>
        ) 
    }
    else {
        return (
            <View style={{backgroundColor:"#1c2732"}}>
                    <View>
                        <Text style={styles.tests}>{tested.totalindividualstested} TESTED AS OF {tested.updatetimestamp.slice(0,10)}</Text>
                        <Text style={styles.updated}>
                            { isNaN(Date.parse(formatDate(total.lastupdatedtime))) ? '' : 'Last Updated '+formatDistance(new Date(formatDate(total.lastupdatedtime)), new Date()) + ' Ago'}
                        </Text>
                    </View>
                    <Text style={styles.covidHeading}>COVID19 India</Text>
                    <View>
                    <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 30,marginBottom:10}}
                >
                    <Cards
                        title="Total Cases"
                        bg="#FFF"
                        number={total ? total.confirmed : 0}
                    />
                    <Cards
                        title="Recovered"
                        bg="#D93B4A"
                        number={total ? total.recovered : 0}
                    />
                    <Cards
                        title="Death Reported"
                        bg="#FFF"
                        number={total? total.deaths : 0}
                    />
                </ScrollView>
                </View>
                <Text style={styles.covidHeading}>COVID19 States</Text>
                <ScrollView>
                    <View style={{ marginTop: 10, paddingTop: 10, marginBottom: 20}}>
                      
                        {
                            statesData.map((item,i) => {
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
                                    <Text style={styles.countryName} onPress={() => handleTouch(i)}>{item.state == 'Andaman and Nicobar Islands' ? 'Andaman & Nicobar' : item.state}</Text>
                                </View>
                               </View>
                                <View style={{flexDirection:'row'}}>
                                <View style={{paddingRight:windowWidth/3,paddingLeft:windowWidth/15}}>
                                <Text style={styles.totalCases}>Confirmed</Text>
                                    <Text style={{fontSize:20,color:'black', fontWeight: 'bold', marginTop: 5}}>{item.confirmed}</Text>
                                         <Text style={styles.totalCases}>{item.Confirmed > 0 ? '  ↑ ' + item.Confirmed:' '}</Text>

                                    </View>
                                    <View style={{marginright:windowWidth/15}}>
                                    <Text style={styles.totaldea}>Deceased</Text>
                                    <Text style={{fontSize:20,color:'red', fontWeight: 'bold', marginTop: 5}}>{item.deaths}</Text>
                               
                                    </View>
                                    </View>
                                    <View style={{alignSelf:'center'}}>
                                    <Text style={styles.totalrec}>Recovered</Text>
                                    <Text style={{fontSize:20,color:'blue', fontWeight: 'bold', marginTop: 5}}>{item.recovered}</Text>
                                 
                                </View>
                                    </View>
                                       
                                    </View>
                                </View>
                           
                                )
                            })
                        }                
                    </View>
              
            </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header : {
        fontFamily : 'Teko-Bold',
        fontSize: 30,
        paddingTop: 15,
        textAlign: 'center'
    },
    card : {
        padding: 15,
        width: 150,
        borderRadius: 8,
        height: 90,
        margin: 10,
        elevation: 7
    },
    covidHeading: {
        color: '#FFF',
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 10
    },
    cardContainer : {
        flexDirection: 'row',
        height: 110,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardHead : {
        color: 'white',
        fontFamily: 'Teko-Regular',
        textAlign: 'center',
        fontSize: 16
    },
     cards: {
      
        marginTop: -150
    },
    cardNumber : {
        color: 'white',
        fontFamily: 'Teko-Bold',
        textAlign: 'center',
        fontSize: 35,
        position : 'relative',
        bottom: 8
    },
    updated : {
        fontFamily: 'Teko-Regular',
        opacity: 0.5,
        textAlign: 'center',
        fontSize: 15
    },
    tests : {
        fontFamily: 'Teko-Regular',
        textAlign: 'center',
        opacity: 0.5,
        fontSize: 20,
        marginTop: 20,
        color:"white"
    },
    tableHead : {
        fontFamily : 'Teko-Bold',
        textAlign: 'center',
        fontSize: 20,
        flex: 3
    },
    tableCont : {
        fontFamily: 'Teko-Regular',
        textAlign: 'center',
        fontSize: 20,
        flex: 3
    },
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
        borderRadius:15} ,
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
          },    
})

