import React,{useState,useEffect} from 'react'
import { View, Text,FlatList,style,StyleSheet,ScrollView ,TextInput} from 'react-native'
import ItemRows from './ItemRows'
import Cards from './Cards'
export default function Home() {
    const url = "https://api.covid19api.com/summary";
    const [data, setData] = useState();
    const [isLoading, setIsloading] = useState(false);
    const [error,setError] = useState();
    const [query, setQuery] = useState('');
const [fullData, setFullData] = useState([]);
    useEffect(() => {
        const fetchCovidData = async () => {
            setIsloading(true);
            try {
                const result = await fetch(url);
                const response = await result.json();
                setData(response)
                console.log(data.country)
                setFullData(response)
                setIsloading(false);
            }
            catch (e) {
                console.log(e)
            }
        }
        fetchCovidData();
    }, []);
  
    return (
        <View style={styles.container}>
        <Text style={styles.covidHeading}>COVID19 World</Text>
        <View style={styles.cards}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 170 }}
        >
            <Cards
                title="Total Cases"
                bg="#FFF"
                number={data ? data.Global.TotalConfirmed : 0}
            />
            <Cards
                title="Recovered"
                bg="#D93B4A"
                number={data ? data.Global.TotalRecovered : 0}
            />
            <Cards
                title="Death Reported"
                bg="#FFF"
                number={data ? data.Global.TotalDeaths : 0}
            />
        </ScrollView>
    </View>  
    <Text style={styles.covidHeading}>COVID19 Region</Text>
        <View style={styles.flatList} >
        <FlatList 
            data={data && data.Countries ?  data.Countries : 0}
            renderItem={({item})=> <ItemRows item={item}
            keyExtractor={item => item.id}/>}  
        />
    </View>
        </View>
       
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1c2732"
    },
    covidHeading: {
        color: '#FFF',
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 20
    },
    cards: {
      
        marginTop: -150
    },
    casesHeading:{
        color: '#FFF',
        fontSize: 15,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 30
    },
    flatList:{
        marginTop:10
    }
})