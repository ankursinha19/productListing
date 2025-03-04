import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const darkMode = useSelector((state) => state.theme?.darkMode);

    const handleSearch = (text) => {
        setQuery(text);
        onSearch(text);
    };

    return (
        <View style={[styles.searchContainer, darkMode && styles.searchContainerDark]}>
            <Ionicons name="search" size={20} color={darkMode ? "#fff" : "#666"} />
            <TextInput
                style={[styles.input, darkMode && styles.inputDark]}
                placeholder="Search posts..."
                placeholderTextColor={darkMode ? "#bbb" : "#666"}
                value={query}
                onChangeText={handleSearch}
            />
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 12,
        paddingHorizontal: 12,
        marginHorizontal: 15,
        marginVertical: 10,
        height: 45,

        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,

        // Elevation for Android
        elevation: 5,
    },
    searchContainerDark: {
        backgroundColor: "#333",
        shadowColor: "#FFF",
        elevation: 3,
    },
    input: {
        flex: 1,
        height: 40,
        marginLeft: 10,
        color: "#000",
        fontSize: 16,
    },
    inputDark: {
        color: "#fff",
    },
});

export default SearchBar;
