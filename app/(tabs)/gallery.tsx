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
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const imageSize = (width - 60) / 2;

interface GalleryImage {
  id: number;
  uri: string;
  title: string;
  description: string;
  category: string;
}

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      uri: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
      title: 'Outdoor Fun',
      description: 'Children enjoying outdoor games and activities in the park',
      category: 'Activities'
    },
    {
      id: 2,
      uri: 'https://images.unsplash.com/photo-1544776527-59c5d278b4a4?w=800&q=80',
      title: 'Happy Celebration',
      description: 'Joyful moments during Children\'s Day celebration',
      category: 'Celebrations'
    },
    {
      id: 3,
      uri: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80',
      title: 'Art Creation',
      description: 'Beautiful artwork created by talented young artists',
      category: 'Arts & Crafts'
    },
    {
      id: 4,
      uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      title: 'Music & Dance',
      description: 'Children expressing themselves through music and dance',
      category: 'Performance'
    },
    {
      id: 5,
      uri: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
      title: 'Creative Workshop',
      description: 'Hands-on learning and creativity in our workshop sessions',
      category: 'Arts & Crafts'
    },
    {
      id: 6,
      uri: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80',
      title: 'Baking Fun',
      description: 'Sweet moments in our baking and cooking activities',
      category: 'Activities'
    },
    {
      id: 7,
      uri: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
      title: 'Story Time',
      description: 'Magical storytelling sessions that inspire imagination',
      category: 'Learning'
    },
    {
      id: 8,
      uri: 'https://images.unsplash.com/photo-1594736797933-d0300ad4fb08?w=800&q=80',
      title: 'Puppet Show',
      description: 'Entertaining puppet performances by young performers',
      category: 'Performance'
    },
    {
      id: 9,
      uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
      title: 'Nature Explorer',
      description: 'Discovering the wonders of nature during outdoor adventures',
      category: 'Activities'
    },
    {
      id: 10,
      uri: 'https://images.unsplash.com/photo-1565092355715-3074a3fa0e32?w=800&q=80',
      title: 'Team Games',
      description: 'Building friendships through collaborative team activities',
      category: 'Activities'
    },
    {
      id: 11,
      uri: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80',
      title: 'Award Ceremony',
      description: 'Celebrating achievements and recognizing young talents',
      category: 'Celebrations'
    },
    {
      id: 12,
      uri: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&q=80',
      title: 'Science Fun',
      description: 'Exciting science experiments that spark curiosity',
      category: 'Learning'
    }
  ];

  const categories = ['All', 'Activities', 'Arts & Crafts', 'Celebrations', 'Performance', 'Learning'];

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  const openImageModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  const renderImageItem = ({ item }: { item: GalleryImage }) => (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => openImageModal(item)}
      activeOpacity={0.8}>
      <Image
        source={{ uri: item.uri }}
        style={styles.galleryImage}
        accessibilityLabel={item.description}
      />
      <View style={styles.imageOverlay}>
        <Text style={styles.imageTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Photo Gallery</Text>
        <Text style={styles.headerSubtitle}>Memories from our amazing Children's Day celebrations!</Text>
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

      {/* Gallery Grid */}
      <FlatList
        data={filteredImages}
        renderItem={renderImageItem}
        numColumns={2}
        contentContainerStyle={styles.galleryContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Image Detail Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <MaterialIcons name="close" size={30} color="white" />
            </TouchableOpacity>
            
            {selectedImage && (
              <View style={styles.modalContent}>
                <Image
                  source={{ uri: selectedImage.uri }}
                  style={styles.modalImage}
                  resizeMode="contain"
                  accessibilityLabel={selectedImage.description}
                />
                <View style={styles.modalInfo}>
                  <Text style={styles.modalTitle}>{selectedImage.title}</Text>
                  <Text style={styles.modalDescription}>{selectedImage.description}</Text>
                  <View style={styles.modalCategory}>
                    <MaterialIcons name="category" size={16} color="#4ECDC4" />
                    <Text style={styles.modalCategoryText}>{selectedImage.category}</Text>
                  </View>
                </View>
              </View>
            )}
          </SafeAreaView>
        </View>
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
    backgroundColor: '#4ECDC4',
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
  galleryContainer: {
    padding: 20,
    paddingTop: 0,
  },
  row: {
    justifyContent: 'space-between',
  },
  separator: {
    height: 15,
  },
  imageContainer: {
    width: imageSize,
    height: imageSize,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  imageTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalImage: {
    width: width - 40,
    height: height * 0.6,
    borderRadius: 15,
  },
  modalInfo: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    width: width - 40,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 12,
  },
  modalCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  modalCategoryText: {
    fontSize: 12,
    color: '#4ECDC4',
    fontWeight: '600',
    marginLeft: 6,
  },
});