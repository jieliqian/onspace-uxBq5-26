import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomePage() {
  const router = useRouter();

  const quickActions = [
    {
      id: 1,
      title: 'Fun Activities',
      icon: 'celebration',
      color: '#FF6B6B',
      route: '/activities',
    },
    {
      id: 2,
      title: 'Photo Gallery',
      icon: 'photo-camera',
      color: '#4ECDC4',
      route: '/gallery',
    },
    {
      id: 3,
      title: 'Play Games',
      icon: 'games',
      color: '#45B7D1',
      route: '/games',
    },
    {
      id: 4,
      title: 'Stories',
      icon: 'menu-book',
      color: '#96CEB4',
      route: '/activities',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <LinearGradient
          colors={['#FF6B6B', '#4ECDC4', '#45B7D1']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Happy Children's Day!</Text>
            <Text style={styles.headerSubtitle}>
              Let's celebrate the joy and wonder of childhood! 🎉
            </Text>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1544776527-59c5d278b4a4?w=800&q=80',
              }}
              style={styles.headerImage}
              accessibilityLabel="Happy children celebrating Children's Day"
            />
          </View>
        </LinearGradient>

        {/* Welcome Message */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to Our Special Day!</Text>
          <Text style={styles.welcomeText}>
            Children's Day is a time to celebrate the innocence, creativity, and boundless energy of children everywhere. Join us for a day filled with fun activities, games, and memorable moments!
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Explore & Have Fun</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[styles.quickActionCard, { backgroundColor: action.color }]}
                onPress={() => router.push(action.route)}
                activeOpacity={0.8}>
                <MaterialIcons name={action.icon as any} size={32} color="white" />
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Content */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Today's Highlights</Text>
          
          <View style={styles.featuredCard}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
              }}
              style={styles.featuredImage}
              accessibilityLabel="Children playing outdoor games and activities"
            />
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>Special Activities Today</Text>
              <Text style={styles.featuredDescription}>
                Join us for exciting outdoor games, creative workshops, and special performances designed just for kids!
              </Text>
            </View>
          </View>

          <View style={styles.featuredCard}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
              }}
              style={styles.featuredImage}
              accessibilityLabel="Children doing arts and crafts activities"
            />
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>Arts & Crafts Corner</Text>
              <Text style={styles.featuredDescription}>
                Unleash your creativity with painting, drawing, and craft-making activities. Every child is an artist!
              </Text>
            </View>
          </View>
        </View>

        {/* Fun Facts */}
        <View style={styles.funFactsSection}>
          <Text style={styles.sectionTitle}>Did You Know?</Text>
          <View style={styles.funFactCard}>
            <MaterialIcons name="lightbulb" size={24} color="#FFA726" />
            <Text style={styles.funFactText}>
              Children's Day is celebrated on different dates around the world, but the spirit of joy and celebration remains the same everywhere!
            </Text>
          </View>
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
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  headerImage: {
    width: width * 0.7,
    height: 150,
    borderRadius: 15,
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#7F8C8D',
    lineHeight: 24,
  },
  quickActionsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2,
    height: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  featuredSection: {
    padding: 20,
  },
  featuredCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: 150,
  },
  featuredContent: {
    padding: 15,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  funFactsSection: {
    padding: 20,
    paddingBottom: 40,
  },
  funFactCard: {
    backgroundColor: '#FFF8E1',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#FFA726',
  },
  funFactText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#F57C00',
    lineHeight: 20,
  },
});