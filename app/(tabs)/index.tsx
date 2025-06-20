import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomePage() {
  const [count, setCount] = React.useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4A90E2', '#50C9C3']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <MaterialIcons name="waving-hand" size={48} color="white" />
        <Text style={styles.headerTitle}>Hello, World!</Text>
        <Text style={styles.headerSubtitle}>Welcome to our simple website</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Hello There! 👋</Text>
          <Text style={styles.welcomeText}>
            This is a simple and clean website built with React Native. 
            Tap the button below to see some interaction!
          </Text>
        </View>

        <View style={styles.counterSection}>
          <Text style={styles.counterLabel}>Button clicked:</Text>
          <Text style={styles.counterValue}>{count} times</Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCount(count + 1)}
            activeOpacity={0.8}>
            <MaterialIcons name="touch-app" size={20} color="white" />
            <Text style={styles.buttonText}>Click Me!</Text>
          </TouchableOpacity>

          {count > 0 && (
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => setCount(0)}
              activeOpacity={0.8}>
              <MaterialIcons name="refresh" size={16} color="#007AFF" />
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Simple & Clean</Text>
          <Text style={styles.infoText}>
            Sometimes the best websites are the simplest ones. 
            This demonstrates clean design with minimal but effective functionality.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 12,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 8,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: '#6D6D80',
    lineHeight: 24,
  },
  counterSection: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  counterLabel: {
    fontSize: 18,
    color: '#1D1D1F',
    marginBottom: 8,
  },
  counterValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
  },
  resetButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  infoSection: {
    backgroundColor: '#F2F2F7',
    padding: 24,
    borderRadius: 16,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#6D6D80',
    lineHeight: 24,
  },
});