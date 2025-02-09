import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { Rating } from 'react-native-ratings'; 

const reviews = [
  {
    name: 'Davion',
    review: 'Laboriosam voluptatibus voluptatibus deserunt repellendus',
    rating: 5,
  },
  {
    name: 'Maudie',
    review: 'Itaque dolor fuga natus eveniet',
    rating: 4,
  },
];

const reviewRating = [
  {
    rating : [200,40,10,4,2]
  }
]

// const renderStarBar = (count) => {
//   const filledStars = '★'.repeat(count);
//   const emptyStars = '☆'.repeat(5 - count);
//   return filledStars + emptyStars;
// };

export default function Review() {
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewData, setReviewData] = useState({
    name: '',
    email: '',
    details: '',
    rating: 0,
  });
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const ratingCounts = {};
  reviews.forEach(review => {
    ratingCounts[review.rating] = (ratingCounts[review.rating] || 0) + 1;
  });

  const totalReviews = reviewRating[0].rating.reduce((sum, count) => sum + count, 0);
  
  const handleReviewSubmit = () => {
    if (!reviewData.name || !reviewData.email || !reviewData.details || reviewData.rating === 0) {
      Alert.alert('Error', 'Please fill in all fields and provide a rating.');
      return;
    }
    setModalVisible(false);
    setTimeout(() => {
      Alert.alert('Success', 'Your review has been submitted!');
      setReviewData({
        name: '',
        email: '',
        details: '',
        rating: 0,
      });
    }, 100);
    console.log('Review DAta', reviewData)
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reviews</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.addReviewButton}>+ Add Review</Text>
        </TouchableOpacity>
      </View>

      {/* Average Rating */}
      <View style={styles.averageRatingContainer}>
      <View style={styles.averageRating}>
        <Text style={styles.averageRatingValue}>
          {averageRating.toFixed(1)}{' '}
          <Text style={styles.star}>★</Text>
        </Text>
        <Text style={styles.reviewCount}>{totalReviews} reviews</Text>
      </View>
        <View style={styles.ratingDistribution}>
          {[5, 4, 3, 2, 1].map((star, index) => (
            <View key={star} style={styles.starBarContainer}>
              <Text>{star}★</Text>
              <View style={styles.barBackground}>
                <View style={[styles.bar, { width: `${(reviewRating[0].rating[index] / totalReviews) * 100}%` }]} />
              </View>
            </View>
          ))}

        </View>
      </View>

      {/* Review List */}
      <View>
        {reviews.map((review, index) => (
          <View key={index} style={styles.reviewContainer}>
            <View style={styles.reviewHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{review.name.charAt(0)}</Text>
              </View>
              <View style={styles.reviewSection}>
              <View style={styles.nameAndReview}>
                <Text style={styles.reviewName} numberOfLines={1}>
                  {review.name}
                </Text>
                <Text style={styles.reviewText}>{review.review}</Text>
              </View>
                <View style={styles.ratingSection}>
                  <Rating
                    type="star"
                    ratingCount={5}
                    startingValue={review.rating}
                    imageSize={15}
                    readonly
                  />
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Review Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a Review</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={reviewData.name}
              onChangeText={(text) => setReviewData({ ...reviewData, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={reviewData.email}
              onChangeText={(text) => setReviewData({ ...reviewData, email: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Review Details"
              multiline
              numberOfLines={4}
              value={reviewData.details}
              onChangeText={(text) => setReviewData({ ...reviewData, details: text })}
            />
            <Text style={styles.ratingLabel}>Your Rating:</Text>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={30}
              startingValue={0}
              onFinishRating={(rating) => setReviewData({ ...reviewData, rating })}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleReviewSubmit}>
                <Text style={styles.modalSubmit}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "rgba(0, 0, 0, 0.7)"
  },
  addReviewButton: {
    color: '#115543',
    fontSize: 14,
    fontWeight: "bold"
  },
  averageRatingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  averageRating: {
    alignItems: 'center',
    marginRight: 20,
  },
  averageRatingValue: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  ratingDistribution: {
    flex: 1,
  },
  star: {
    color: '#115543',
    fontSize: 40,
  },
  starBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft:10
  },
  barBackground: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  bar: {
    height: 10,
    backgroundColor: '#115543',
    borderRadius: 5,
  },
  reviewCount: {
    marginTop: 14,
    color: 'white',
    backgroundColor: '#050505',
    padding:10,
    paddingHorizontal:20,
    borderRadius:25
  },
  reviewContainer: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#115543',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"white"
  },
  reviewSection: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewName: {
    flexShrink: 1,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#333',
  },
  ratingSection: {
    flexShrink: 0,
  },
  reviewText: {
    lineHeight: 20,
    color: 'rgba(0, 0, 0, 0.8)'
  },
  nameAndReview: {
    flex: 1,
  },
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 10, marginBottom: 10 },
  ratingLabel: { marginTop: 10 },
  modalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  modalCancel: { color: '#f44336', fontWeight: 'bold' },
  modalSubmit: { color: '#115543', fontWeight: 'bold' },
});
