import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import HomeScreen from './src/screens/HomeScreen'



function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    height: '100%',
  },
});

export default App;
