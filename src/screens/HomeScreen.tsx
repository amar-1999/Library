import { FlatList, StyleSheet, View, TextInput, Image, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { getBooks, searchBooksByTitle } from '../services/apiServices';
import React, { useState, useEffect, useCallback } from 'react';
import Books from '../components/Books';

const HomeScreen = () => {
    const [books, setBooks] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const getBooksData = useCallback(async (query) => {
        setLoading(true);
        try {
            let response;
            if (query) {
                response = await searchBooksByTitle(query);
                setLoading(false);
            } else {
                response = await getBooks();
                setLoading(false);
            }
            setBooks(response?.reading_log_entries?.filter(item => item?.work?.title !== null) || response?.docs || []);
        } catch (error) {
            console.error('Error fetching books:', error);
            setBooks([]);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getBooksData();
    }, []);

    const renderItem = ({ item }) => {
        return <Books book={item} />;
    };

    const handleSearch = () => {
        getBooksData(searchQuery);
    };

    return (
        <View style={{ margin: 10 }}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search books"
                    value={searchQuery}
                    onChangeText={
                        setSearchQuery
                    }
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Image source={require('../assets/searchIcon.png')} style={styles.image} />
                </TouchableOpacity>
            </View>
            {
                loading ?
                    <ActivityIndicator size="large" />
                    :
                    <FlatList
                        data={books}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{
                            paddingVertical: 8,
                            paddingHorizontal: 4,
                        }}
                        numColumns={2}
                        columnWrapperStyle={{
                            justifyContent: 'space-between',
                            marginBottom: 20,
                        }}
                    />
            }

            {books && books.length === 0 && <Text style={{ textAlign: 'center' }}>No books found.</Text>}
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingVertical: 8,
        borderRadius: 8,
    },
    searchInput: {
        flex: 1,
        backgroundColor: 'white',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 8,
        height: 40,
    },
    image: {
        width: 30,
        height: 30,
        objectFit: 'cover',
    }
});
