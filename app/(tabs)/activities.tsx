import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Activity {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  ageGroup: string;
  materials: string[];
  instructions: string[];
  category: string;
}

export default function ActivitiesPage() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const activities: Activity[] = [
    {
      id: 1,
      title: 'Rainbow Art & Painting',
      description: 'Create beautiful rainbow paintings with vibrant colors and let your imagination run wild!',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80',
      duration: '45 minutes',
      ageGroup: '4-12 years',
      category: 'Arts & Crafts',
      materials: ['Watercolors', 'Brushes', 'Paper', 'Water cups', 'Paper towels'],
      instructions: [
        'Set up your painting area with all materials',
        'Start with red at the top of your paper',
        'Add orange, yellow, green, blue, and purple in order',
        'Blend the colors gently where they meet',
        'Let your rainbow dry and add clouds or sun!'
      ]
    },
    {
      id: 2,
      title: 'Musical Chairs Dance',
      description: 'Classic fun game with music, dancing, and quick thinking. Perfect for group activities!',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      duration: '30 minutes',
      ageGroup: '5-15 years',
      category: 'Games & Sports',
      materials: ['Chairs', 'Music player', 'Open space'],
      instructions: [
        'Arrange chairs in a circle (one less than players)',
        'Start the music and have everyone dance around',
        'When music stops, everyone finds a chair',
        'Player without a chair is out',
        'Remove one chair and continue until one winner remains'
      ]
    },
    {
      id: 3,
      title: 'Story Creation Workshop',
      description: 'Unleash creativity by writing and illustrating your own magical stories and adventures!',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
      duration: '60 minutes',
      ageGroup: '6-14 years',
      category: 'Creative Writing',
      materials: ['Notebooks', 'Colored pencils', 'Stickers', 'Imagination'],
      instructions: [
        'Choose a magical character (wizard, fairy, dragon)',
        'Decide on a setting (enchanted forest, castle, space)',
        'Create a problem your character needs to solve',
        'Write your story with beginning, middle, and end',
        'Draw pictures to illustrate your story'
      ]
    },
    {
      id: 4,
      title: 'Nature Scavenger Hunt',
      description: 'Explore the outdoors and discover the wonders of nature in this exciting treasure hunt!',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
      duration: '90 minutes',
      ageGroup: '5-12 years',
      category: 'Outdoor Adventure',
      materials: ['Hunt checklist', 'Collection bags', 'Magnifying glass', 'Camera'],
      instructions: [
        'Give each child a scavenger hunt list',
        'Look for items like leaves, rocks, flowers',
        'Take photos of birds, insects, or animals',
        'Collect interesting natural objects (where allowed)',
        'Share discoveries and create a nature display'
      ]
    },
    {
      id: 5,
      title: 'Cookie Decorating Fun',
      description: 'Decorate delicious cookies with colorful icing, sprinkles, and creative designs!',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80',
      duration: '45 minutes',
      ageGroup: '4-16 years',
      category: 'Cooking & Baking',
      materials: ['Plain cookies', 'Colored icing', 'Sprinkles', 'Small candies'],
      instructions: [
        'Wash hands and put on aprons',
        'Choose your favorite cookie shapes',
        'Apply base icing color with small spatula',
        'Add patterns with different colored icing',
        'Decorate with sprinkles and candies'
      ]
    },
    {
      id: 6,
      title: 'Puppet Show Theater',
      description: 'Create and perform with handmade puppets in your very own theater production!',
      image: 'https://images.unsplash.com/photo-1594736797933-d0300ad4fb08?w=800&q=80',
      duration: '75 minutes',
      ageGroup: '5-13 years',
      category: 'Drama & Performance',
      materials: ['Socks', 'Felt pieces', 'Glue', 'Markers', 'Small stage or box'],
      instructions: [
        'Choose characters for your puppet show',
        'Decorate socks with felt, buttons, and markers',
        'Create a simple story with beginning and end',
        'Practice puppet movements and voices',
        'Perform your show for family and friends'
      ]
    }
  ];

  const categories = ['All', 'Arts & Crafts', 'Games & Sports', 'Creative Writing', 'Outdoor Adventure', 'Cooking & Baking', 'Drama & Performance'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredActivities = selectedCategory === 'All' 
    ? activities 
    : activities.filter(activity => activity.category === selectedCategory);

  const openActivityDetail = (activity: Activity) => {
    setSelectedActivity(activity);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedActivity(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fun Activities</Text>
        <Text style={styles.headerSubtitle}>Choose your favorite activity and let's have fun!</Text>
      </View>

      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryFilter}
        contentContainerStyle={styles.categoryFilterContent}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(category)}>
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === category && styles.categoryButtonTextActive
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredActivities.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={styles.activityCard}
            onPress={() => openActivityDetail(activity)}
            activeOpacity={0.8}>
            <Image
              source={{ uri: activity.image }}
              style={styles.activityImage}
              accessibilityLabel={`${activity.title} activity image`}
            />
            <View style={styles.activityContent}>
              <View style={styles.activityHeader}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryTagText}>{activity.category}</Text>
                </View>
              </View>
              <Text style={styles.activityDescription}>{activity.description}</Text>
              <View style={styles.activityMeta}>
                <View style={styles.metaItem}>
                  <MaterialIcons name="schedule" size={16} color="#7F8C8D" />
                  <Text style={styles.metaText}>{activity.duration}</Text>
                </View>
                <View style={styles.metaItem}>
                  <MaterialIcons name="group" size={16} color="#7F8C8D" />
                  <Text style={styles.metaText}>{activity.ageGroup}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Activity Detail Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}>
        {selectedActivity && (
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <MaterialIcons name="close" size={24} color="#2C3E50" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedActivity.title}</Text>
            </View>
            
            <ScrollView style={styles.modalContent}>
              <Image
                source={{ uri: selectedActivity.image }}
                style={styles.modalImage}
                accessibilityLabel={`${selectedActivity.title} detailed image`}
              />
              
              <View style={styles.modalInfo}>
                <Text style={styles.modalDescription}>{selectedActivity.description}</Text>
                
                <View style={styles.modalMeta}>
                  <View style={styles.modalMetaItem}>
                    <MaterialIcons name="schedule" size={20} color="#FF6B6B" />
                    <Text style={styles.modalMetaText}>Duration: {selectedActivity.duration}</Text>
                  </View>
                  <View style={styles.modalMetaItem}>
                    <MaterialIcons name="group" size={20} color="#4ECDC4" />
                    <Text style={styles.modalMetaText}>Age Group: {selectedActivity.ageGroup}</Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Materials Needed:</Text>
                  {selectedActivity.materials.map((material, index) => (
                    <View key={index} style={styles.listItem}>
                      <MaterialIcons name="check-circle" size={16} color="#96CEB4" />
                      <Text style={styles.listItemText}>{material}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Instructions:</Text>
                  {selectedActivity.instructions.map((instruction, index) => (
                    <View key={index} style={styles.instructionItem}>
                      <View style={styles.stepNumber}>
                        <Text style={styles.stepNumberText}>{index + 1}</Text>
                      </View>
                      <Text style={styles.instructionText}>{instruction}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FF6B6B',
    padding: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
    opacity: 0.9,
  },
  categoryFilter: {
    marginVertical: 15,
  },
  categoryFilterContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  categoryButtonActive: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  categoryButtonText: {
    color: '#7F8C8D',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  activityCard: {
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
  activityImage: {
    width: '100%',
    height: 150,
  },
  activityContent: {
    padding: 15,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
  },
  categoryTag: {
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 10,
  },
  categoryTagText: {
    fontSize: 10,
    color: '#45B7D1',
    fontWeight: '600',
  },
  activityDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
    marginBottom: 12,
  },
  activityMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginLeft: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  closeButton: {
    marginRight: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
  },
  modalContent: {
    flex: 1,
  },
  modalImage: {
    width: '100%',
    height: 200,
  },
  modalInfo: {
    padding: 20,
  },
  modalDescription: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
    marginBottom: 20,
  },
  modalMeta: {
    marginBottom: 25,
  },
  modalMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalMetaText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 8,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  listItemText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginLeft: 8,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
});