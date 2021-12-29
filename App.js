import * as React from 'react';
import { useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  SectionList,
  FlatList,
  TextInput,
  Image,
  Touchable,
} from 'react-native'; 
import Keyboard from './android/app/src/index';
import firestore from '@react-native-firebase/firestore';
// import Keyboard from "@junctiontv/react-native-on-screen-keyboard";


function HomeScreen({navigation}) {
  useEffect(() => {
    firestore()
      .collection('data')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        });
      });

  }, []);
  const COLORS = {
    primary: "#252c4a",
    secondary: '#1E90FF',
    accent: '#3498db',
    success: '#358138',
    black: "#171717",
    white: "#FFFFFF",
    background: "#252C4A"
  }
  return (
    <View>
      <View style={{
        alignSelf: 'stretch',
        height: 52,
        flexDirection: 'row', // row
        backgroundColor: COLORS.success,
        alignItems: 'center',
        justifyContent: 'space-between', // center, space-around
        paddingLeft: 10,
        paddingRight: 10,
        alignItem: 'center'
      }}>
      <Text style={{color:'white'}}>Books</Text>
      </View>
      <FlatList
        data={bookdata}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        numColumns={2}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard', item.key==0 ? RNDATA:FDATA)}>

              <View style={{ backgroundColor: '#fff', height: 220, width: 150, elevation: 10, margin: 10, borderRadius: 10 }}>
                <View style={{ flex: 50 }}>
                  <Image source={item.image} style={{ height: 120, width: 150 }} />
                </View>
                <View style={{ flex: 40 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, marginLeft: 10 }}>{item.title}</Text>
                  </View>
                </View>
              </View>

            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

function Dashboard({navigation, route}) {
  const data = route.params;

  const [searchitem, setSearchItem] = useState('');
  console.log(data);
  const COLORS = {
    primary: "#252c4a",
    secondary: '#1E90FF',
    accent: '#3498db',
    success: '#358138',
    black: "#171717",
    white: "#FFFFFF",
    background: "#252C4A"
  }
  const handlesearch=()=>{
    console.log(searchitem);
    firestore()
      .collection('data')
      .doc('evqF13EYTu8lbiLYwL2I')
      // .collection('ReactNative')
      .where('Name', '==', searchitem)
      .get()
      .then(querySnapshot => {
        console.log('Total data: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        });
      });

  }
  return ( 
    <ScrollView>

    <View>
      <View style={{
        alignSelf: 'stretch',
        height: 52,
        flexDirection: 'row', // row
        backgroundColor: COLORS.success,
        alignItems: 'center',
        justifyContent: 'space-between', // center, space-around
        paddingLeft: 10,
        paddingRight: 10,
        alignItem: 'center'
      }}>
        <Text style={{ color: 'white' }}>Books</Text>
      </View>
      <TextInput style = {{backgroundColor:'grey', marginTop:10, marginBottom:10}} placeholder='Search' onChangeText={(val) => setSearchItem(val)}>
      </TextInput>
        {handlesearch}
  <SectionList
        sections={data}
        renderSectionHeader={({section}) => (
          <View
            style={{
              backgroundColor: 'grey',
              padding: 5,
              marginBottom: 5,
              height: 40,
              width: 350,
            }}>
            <Text> {section.title} </Text>
          </View>
        )}

        renderItem={({ item, section }) =>

          <TouchableOpacity
            style={{
              padding: 5,
              marginBottom: 5,
              height: 60,
            }}
            onPress={()=> navigation.navigate('urdu')}
            >
            <Text> {item.title} </Text>
          </TouchableOpacity>
        }/>
    </View>
    </ScrollView>
  );
}

function urdu(){
  let value = '';
  const handleInput = ()=>{
    console.log({value});
  };
  return(
    <View style={{ flex: 1, backgroundColor:'#142132'}}>
      <View style={{ width: 300, height: 200, backgroundColor: '#1B2D45', marginLeft: 30, marginTop: 20, borderWidth: 1, borderColor: '#223958'}}>
        <View style={{flexDirection:'row'}}>
        <View style={{ width: 149, height: 30, backgroundColor: '#1B2D45', alignItems: 'center', borderBottomWidth: 1, borderColor: '#223958'}}>
          <Text style={{color:'white'}}>English</Text>
        </View>
        <View style={{ width: 149, height: 30, backgroundColor: '#223958', alignItems: 'center', borderBottomWidth: 1, borderColor: '#223958'}}>
          <Text style={{ color: 'white' }}>Urdu</Text>
          </View>
        </View>

        <TextInput style={{ height: 160, color:'white'}} placeholder="سرچ کریں۔۔۔"
          placeholderTextColor="white"
          onChangeTextColor='white'>
        </TextInput>

      </View>

      <View style={{ flexDirection: 'row', marginLeft: 30, marginTop: 20, borderWidth: 1, borderColor: '#223958', width: 300,}}>
          <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: '#223958', alignItems: 'center', borderBottomWidth: 1, borderColor: '#223958' }}>
            <Text style={{ color: 'white' }}>رومن تو اردو</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: '#B60000', alignItems: 'center', borderBottomWidth: 1, borderColor: '#223958' }}>
            <Text style={{ color: 'white' }}>اردو کی بورڈ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 100, height: 40, backgroundColor: '#FEA500', alignItems: 'center', borderBottomWidth: 1, borderColor: '#223958' }}>
            <Text style={{ color: 'white' }}>Speak</Text>
          </TouchableOpacity>
        </View>

      <View style={{ flexDirection: 'row', marginLeft: 30, marginTop: 20,width: 300, }}>
        <TouchableOpacity style={{ width: 140, height: 40, backgroundColor: '#142132', alignItems: 'center', borderWidth: 1, borderColor: '#B60000', marginLeft: 5}}>
          <Text style={{ color: 'white' }}>SHAIRI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: 140, height: 40, backgroundColor: '#F53D3D', alignItems: 'center', borderBottomWidth: 1, borderColor: '#223958' , marginLeft:5}}>
          <Text style={{ color: 'white' }}>ADD TO PAPER</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={{ width: 300, height: 40, backgroundColor: '#142132', alignItems: 'center', borderWidth: 1, borderColor: 'white', marginLeft: 5 , borderRadius:50, marginLeft:30, marginTop:50}}>
        <Text style={{ color: 'white' }}>Close</Text>
      </TouchableOpacity>

      {/* <View style={{
      width: 0,
      height: 100,marginLeft:150,marginTop:100}}>
        <Keyboard
          title={'title'}
          textInput={{value}}
          onInput={handleInput}
          inputType={'textEmailUrdu'}
          keyboardContainerStyle={styles.keyboardContainer}
          keyboardTitleStyle={styles.keyboardTitle}
          keyboardButtonContainerStyle={styles.keyboardButtonContainer}
          keyboardButtonTextStyle={styles.keyboardButtonText}
          keyboardButtonTextPressStyle={styles.keyboardButtonTextPress}
          keyboardButtonStyle={styles.keyboardButton}
          keyboardButtonPressStyle={styles.keyboardButtonPress}
        />
        <Keyboard
          title={'title'}
          textInput={{ value }}
          onInput={handleInput}
          inputType={'textEmailUrdu'}
          keyboardContainerStyle={styles.keyboardContainer}
          keyboardTitleStyle={styles.keyboardTitle}
          keyboardButtonContainerStyle={styles.keyboardButtonContainer}
          keyboardButtonTextStyle={styles.keyboardButtonText}
          keyboardButtonTextPressStyle={styles.keyboardButtonTextPress}
          keyboardButtonStyle={styles.keyboardButton}
          keyboardButtonPressStyle={styles.keyboardButtonPress}
        />
        <Keyboard
          title={'title'}
          textInput={{ value }}
          onInput={handleInput}
          inputType={'textEmailUrdu'}
          keyboardContainerStyle={styles.keyboardContainer}
          keyboardTitleStyle={styles.keyboardTitle}
          keyboardButtonContainerStyle={styles.keyboardButtonContainer}
          keyboardButtonTextStyle={styles.keyboardButtonText}
          keyboardButtonTextPressStyle={styles.keyboardButtonTextPress}
          keyboardButtonStyle={styles.keyboardButton}
          keyboardButtonPressStyle={styles.keyboardButtonPress}
        />
        <Keyboard
          title={'title'}
          textInput={{ value }}
          onInput={handleInput}
          inputType={'textEmailUrdu'}
          keyboardContainerStyle={styles.keyboardContainer}
          keyboardTitleStyle={styles.keyboardTitle}
          keyboardButtonContainerStyle={styles.keyboardButtonContainer}
          keyboardButtonTextStyle={styles.keyboardButtonText}
          keyboardButtonTextPressStyle={styles.keyboardButtonTextPress}
          keyboardButtonStyle={styles.keyboardButton}
          keyboardButtonPressStyle={styles.keyboardButtonPress}
        />
      </View> */}
    </View>
  );
}
const bookdata = [{key:0, title: 'React Native for Beginners', image: require('./android/app/src/main/assets/rnbook.png'), book: 'RNDATA'}, {key:1, title: 'Flutter for Beginners', image: require('./android/app/src/main/assets/flutter.png'), book:'FDATA'},];
const RNDATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Chapter 1 - What is React Native',
    key: 0,
    data: [{ key: 0, title: 'React Native is a cross platform framework for building Mobile Apps. React Native is a cross platform framework for building Mobile Apps' }, ],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Chapter 2 - Why React Native is best',
    key: 1,
    data: [{key: 0, title: 'React Native is a cross platform framework for building Mobile Apps. React Native is a cross platform framework for building Mobile Apps'}, ],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Chapter 3 - Wat is JSX',
    key: 1,
    data: [{ key: 0, title: 'JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML ' },],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Chapter 4 - What is State',
    key: 1,
    data: [{ key: 0, title: 'JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML ' },],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Chapter 5 - What are Props',
    key: 1,
    data: [{ key: 0, title: 'JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML ' },],
  },
];


const FDATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Chapter 1 - What is Flutter',
    key: 0,
    data: [{ key: 0, title: 'Flutter is a cross platform framework for building Mobile Apps. Flutter is a cross platform framework for building Mobile Apps' },],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Chapter 2 - Why Flutter is best',
    key: 1,
    data: [{ key: 0, title: 'Flutter is a cross platform framework for building Mobile Apps. Flutter is a cross platform framework for building Mobile Apps' },],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Chapter 3 - Wat is DART',
    key: 1,
    data: [{ key: 0, title: 'Flutter is based on DART' },],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Chapter 4 - What is State',
    key: 1,
    data: [{ key: 0, title: 'JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML ' },],
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Chapter 5 - What are components in Flutter',
    key: 1,
    data: [{ key: 0, title: 'JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML, JSX is JavaScript XML ' },],
  },
];

const Stack = createNativeStackNavigator();


function App() {
  var RNFS = require('react-native-fs');

  var path0 = 'Books.rtf';

  RNFS.readFileAssets(path0).then(contents => {
    var contentstring = contents.toString();
    var topic=[];
    var question=[];
    var answer=[];
    for(var i = 0;i<contentstring.length; i++){
      var firstindex=contentstring.indexOf('@', i);
      var secondindex = contentstring.indexOf('@', firstindex+i);
      if (secondindex == -1 || firstindex == -1){
        break;
      }
      var tempstring = contentstring.slice(firstindex+1, secondindex-1);
      topic.push(tempstring);
    }
    for (var i = 0; i < topic.length; i++) {
      var firstindex = contentstring.indexOf('&', i);
      var secondindex = contentstring.indexOf('&', firstindex + i);
      if (secondindex == -1 || firstindex == -1) {
        break;
      }
      var tempstring = contentstring.slice(firstindex + 1, secondindex - 1);
      question.push(tempstring);
    }

    for (var i = 0; i < question.length; i++) {
      var firstindex = contentstring.indexOf('$', i);
      var secondindex = contentstring.indexOf('$', firstindex + i);
      if (secondindex == -1 || firstindex == -1) {
        break;
      }
      var tempstring = contentstring.slice(firstindex + 1, secondindex - 1);
      answer.push(tempstring);
    }
    
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
        <Stack.Screen name="urdu" component={urdu} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 5,
    borderWidth: 2,
    borderRadius: 1,
    borderColor: "white",
    backgroundColor: "#69696980"
  },
  title: {
    fontSize: 20,
    textAlign: "left",
    color: "#ffffff"
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    color: "black"
  },
  textPress: {
    fontSize: 20,
    textAlign: "center",
    color: "white"
  },
  buttonPress: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  }
});

export default App;
