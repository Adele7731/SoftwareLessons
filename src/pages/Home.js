

import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Image, StyleSheet, Dimensions, StatusBar, SafeAreaView, ActivityIndicator, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Card from "../components/Card/Card"
import CategoryCard from "../components/CategoryCard/CategoryCard"
import Categories from './Categories';
import RenderItemSlider from '../components/RenderItemSlider';
import AppIntroSlider from 'react-native-app-intro-slider';
import B1 from "../ads/Banner/B1"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


import { useSelector, useDispatch, connect } from 'react-redux';
import { Divider } from 'react-native-paper';

export default function Home({ navigation }) {
    const [allData, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Set loading to true on component mount

    const [showRealApp, setShowRealApp] = useState(false);

    const onDone = () => {
        setShowRealApp(true);
    };
    const onSkip = () => {
        setShowRealApp(true);
    };


    useEffect(() => {
        const subscriber = firestore()
            .collection('data')
            .onSnapshot(querySnapshot => {
                const data = [];
                querySnapshot.forEach(documentSnapshot => {
                    data.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,

                    });
                });
                setData(data);
                setLoading(false);
                console.log("allData.img" + allData.img)
            });
        <RenderItemSlider />
        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);


    if (loading) {
        return <ActivityIndicator />;
    }

    const formatData = (data, numColumns) => {
        const n = Math.floor(allData.length / numColumns)
        return data;
    }
    const numColumns = 3;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ImageBackground source={require("../assets/icon1.png")} resizeMode="cover"
                    style={{ flex: 1, justifyContent: "center", opacity: 0.8 }}>
                    <View>
                        <FlatList
                            data={formatData(allData)} numColumns={3}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Detail',
                                        { key: item.key, img: item.img })}>
                                    <Card title={item.key} img={item.img}
                                        content={item.content} />
                                </TouchableOpacity>
                            )}
                            ListFooterComponent={<B1 />}
                        />
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}

