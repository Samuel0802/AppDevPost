import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from 'react-native-vector-icons/Feather';
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
// import NewPost from "../pages/NewPost";
// import PostUser from "../pages/PostUser";

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
    return (
        <Tab.Navigator
         screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,//esconder tabBar após clicar no input
            tabBarShowLabel: false,//esconder nome do tabBar 
            tabBarActiveTintColor: '#fff',

            tabBarStyle:{
                backgroundColor: '#202225',
                borderTopWidth: 0,
            }

         }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                  tabBarIcon: ({color, size}) => {
                    return <Feather name="home" size={size} color={color} />
                  }
                }}
            />

            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                  tabBarIcon: ({color,size}) =>{
                    return <Feather name="search" size={size} color={color} />
                  }
                }}
            />

            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                 tabBarIcon: ({color,size}) =>{
                    return <Feather name="user" size={size} color={color} />
                  }
                }}
            />



        </Tab.Navigator>
    );
}