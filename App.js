import { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <View style={styles.card}>
        <Text style={styles.eyebrow}>EXPO GO TEST</Text>
        <Text style={styles.title}>We are connected.</Text>
        <Text style={styles.subtitle}>
          This screen came from the Expo project in your GitHub repository.
        </Text>

        <View style={styles.counterBox}>
          <Text style={styles.counterLabel}>Button presses</Text>
          <Text style={styles.counter}>{count}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => setCount((current) => current + 1)}
        >
          <Text style={styles.buttonText}>Test the app</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.resetButton}
          onPress={() => setCount(0)}
        >
          <Text style={styles.resetButtonText}>Reset counter</Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          Next, tell me what to change and we will watch the app update.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B1020',
    justifyContent: 'center',
    padding: 22,
  },
  card: {
    backgroundColor: '#141B31',
    borderColor: '#26314F',
    borderRadius: 28,
    borderWidth: 1,
    padding: 26,
  },
  eyebrow: {
    color: '#7C9DFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 12,
  },
  subtitle: {
    color: '#B8C1D9',
    fontSize: 16,
    lineHeight: 24,
  },
  counterBox: {
    alignItems: 'center',
    backgroundColor: '#0E1529',
    borderRadius: 20,
    marginVertical: 26,
    padding: 22,
  },
  counterLabel: {
    color: '#8F9AB7',
    fontSize: 14,
    marginBottom: 4,
  },
  counter: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '800',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#6E8EFF',
    borderRadius: 16,
    paddingVertical: 16,
  },
  buttonText: {
    color: '#081020',
    fontSize: 17,
    fontWeight: '800',
  },
  resetButton: {
    alignItems: 'center',
    borderColor: '#6E8EFF',
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 12,
    paddingVertical: 15,
  },
  resetButtonText: {
    color: '#AFC0FF',
    fontSize: 16,
    fontWeight: '700',
  },
  note: {
    color: '#7E8AA8',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 18,
    textAlign: 'center',
  },
});
