import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function AboutPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="info-outline" size={32} color="white" />
        <Text style={styles.headerTitle}>About</Text>
        <Text style={styles.headerSubtitle}>Learn more about this website</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What is this?</Text>
          <Text style={styles.sectionText}>
            This is a simple "Hello World" website built with React Native and Expo Router. 
            It demonstrates clean, modern design principles with minimal functionality.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#34C759" />
              <Text style={styles.featureText}>Clean and modern design</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#34C759" />
              <Text style={styles.featureText}>Interactive button counter</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#34C759" />
              <Text style={styles.featureText}>Responsive layout</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="check-circle" size={20} color="#34C759" />
              <Text style={styles.featureText}>Tab navigation</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Built With</Text>
          <View style={styles.techStack}>
            <View style={styles.techItem}>
              <Text style={styles.techName}>React Native</Text>
              <Text style={styles.techDescription}>Cross-platform mobile framework</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techName}>Expo Router</Text>
              <Text style={styles.techDescription}>File-based routing system</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techName}>TypeScript</Text>
              <Text style={styles.techDescription}>Type-safe JavaScript</Text>
            </View>
          </View>
        </View>

        <View style={styles.welcomeMessage}>
          <MaterialIcons name="favorite" size={24} color="#FF3B30" />
          <Text style={styles.welcomeText}>
            Thank you for visiting our simple website! 
            We hope you enjoyed this clean and minimal experience.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#5856D6',
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 4,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: '#6D6D80',
    lineHeight: 24,
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 16,
    color: '#1D1D1F',
    marginLeft: 12,
  },
  techStack: {
    gap: 16,
  },
  techItem: {
    paddingVertical: 8,
  },
  techName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 4,
  },
  techDescription: {
    fontSize: 14,
    color: '#6D6D80',
  },
  welcomeMessage: {
    backgroundColor: '#FFF2F2',
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeText: {
    flex: 1,
    fontSize: 16,
    color: '#1D1D1F',
    marginLeft: 12,
    lineHeight: 24,
  },
});