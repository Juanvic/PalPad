import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabsLayout(){
    return(
        <Tabs screenOptions={{headerShown: false}}>
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