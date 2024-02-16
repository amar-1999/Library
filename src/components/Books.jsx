import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, Pressable} from 'react-native';

const Books = ({book}) => {
  const [status, setStatus] = useState('Unread');
  const changeStatus = () => {
    if (status === 'Unread') {
      setStatus('Read');
    } else {
      setStatus('Unread');
    }
  };

  const statusBtn = {
    backgroundColor: status === 'Read' ? 'green' : 'white',
    borderColor: status === 'Read' ? 'green' : 'gray',
    borderWidth: 1,
    paddingHorizontal: status === 'Read' ? 10 : 5,
    paddingVertical: 2,
    borderRadius: 5,
    alignSelf: 'flex-end',
  };

  const statusText = {
    fontSize: 10,
    textAlign: 'center',
    color: status === 'Read' ? 'white' : 'black',
  };
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: `https://covers.openlibrary.org/b/id/${
            book?.work?.cover_id ? book?.work?.cover_id : book?.cover_i
          }-M.jpg`,
        }}
        style={styles.image}
      />
      <Text style={styles.title}>
        {book.work?.title ? book.work?.title : book?.title}
      </Text>
      <Pressable style={statusBtn} onPress={() => changeStatus()}>
        <Text style={statusText}>{status}</Text>
      </Pressable>
      <View style={styles.row}>
        <View style={styles.items}>
          <Text style={styles.leftItemHeader}>Author(s)</Text>
          <Text style={styles.leftItem}>
            {book?.work?.author_names[0]
              ? book?.work?.author_names[0]
              : book?.author_name}
          </Text>
        </View>
        <View style={styles.items}>
          <Text style={styles.rightItemHeader}>Published Year</Text>
          <Text style={styles.rightItem}>
            {book?.work?.first_publish_year
              ? book?.work?.first_publish_year
              : book?.first_publish_year}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Books;

const styles = StyleSheet.create({
  card: {
    width: '47%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor: 'white',
  },
  image: {
    width: 110,
    height: 110,
    objectFit: 'contain',
    alignSelf: 'center',
  },
  rightItem: {
    fontSize: 10,
    textAlign: 'right',
  },
  leftItem: {
    fontSize: 10,
    textAlign: 'left',
  },
  rightItemHeader: {
    fontSize: 10,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  leftItemHeader: {
    fontSize: 10,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  items: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '4%',
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
});
