import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import React, {useState, useEffect} from 'react';
import Global from '../../Global';

export default function TabsLayout(){


    return(

        <Tabs screenOptions={{headerShown: false, tabBarStyle: {backgroundColor: Global.COLOR.BACKGROUND2, borderColor: Global.COLOR.ORANGE}, tabBarActiveTintColor: Global.COLOR.ORANGE }}
            
        >
            <Tabs.Screen 
                name="index"
                options={{title: "Início", tabBarIcon: ({size, color}) => (<MaterialIcons name="home" size={size} color={color} />)}}
            >
            </Tabs.Screen>
            <Tabs.Screen
                name="deck"
                options={{title: "PalDeck", tabBarIcon: ({size, color}) => (<MaterialIcons name="apps" size={size} color={color} />)}}

            >
            </Tabs.Screen>
            <Tabs.Screen
                name="sobre"
                options={{title: "Sobre", tabBarIcon: ({size, color}) => (<MaterialIcons name="person" size={size} color={color} />)}}

            >
            </Tabs.Screen>
        </Tabs>
    )
} 