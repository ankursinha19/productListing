import React, { useEffect, useState } from "react";
import {
  View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Button, Alert
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostCreator } from "../redux/reducers/slices/authSlice";
import SearchBar from '../components/searchBar'
const PostScreen = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const { getPostLoading, getPost } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.theme?.darkMode);

  // State for Add Post Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // State for Update Post Modal
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");

  useEffect(() => {
    dispatch(getAllPostCreator());
  }, []);

  useEffect(() => {
    setPosts(getPost);
  }, [getPost]);

  const handleSearch = async (query) => {
    if (query.length > 1) {
      try {
        const res = await fetch(`https://dummyjson.com/posts/search?q=${query}`);
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error("Search failed:", error);
      }
    } else {
      setPosts(getPost);
    }
  };

  // Function to Add a New Post
  const handleAddPost = async () => {
    if (!title || !body) {
      Alert.alert("Error", "Title and body cannot be empty.");
      return;
    }

    try {
      const response = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, userId: 5 }),
      });
      const newPost = await response.json();

      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setModalVisible(false);
      setTitle("");
      setBody("");
      Alert.alert("Success", "Post added successfully!");
    } catch (error) {
      console.error("Error adding post:", error);
      Alert.alert("Error", "Failed to add post.");
    }
  };

  // Function to Update a Post
  const handleUpdatePost = async () => {
    if (!updatedTitle) {
      Alert.alert("Error", "Title cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`https://dummyjson.com/posts/${selectedPostId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: updatedTitle }),
      });
      const updatedPost = await response.json();

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === selectedPostId ? updatedPost : post))
      );
      setEditModalVisible(false);
      setUpdatedTitle("");
      Alert.alert("Success", "Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
      Alert.alert("Error", "Failed to update post.");
    }
  };

  // Function to Delete a Post
  const handleDeletePost = async (postId) => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await fetch(`https://dummyjson.com/posts/${postId}`, { method: "DELETE" });
              setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
              Alert.alert("Success", "Post deleted successfully!");
            } catch (error) {
              console.error("Error deleting post:", error);
              Alert.alert("Error", "Failed to delete post.");
            }
          },
        },
      ]
    );
  };

  if (getPostLoading) {
    return (
      <View style={[styles.loadingContainer, darkMode && styles.darkBackground]}>
        <ActivityIndicator size="large" color={darkMode ? "#fff" : "blue"} />
        <Text style={[styles.loadingText, darkMode && styles.textLight]}>Loading posts...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, darkMode && styles.darkBackground]}>
      <SearchBar onSearch={handleSearch} />

      <View style={{ alignItems: "center", marginVertical: 10 }}>
        <Button title="Add New Post" onPress={() => setModalVisible(true)} color="#007BFF" />
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={[styles.postCard, darkMode && styles.postCardDark]}>
            <Image
              source={{ uri: `https://source.unsplash.com/600x400/?nature,${item.id}` }}
              style={styles.postImage}
            />
            <View style={styles.postContent}>
              <Text style={[styles.postTitle, darkMode && styles.textLight]}>{item.title}</Text>
              <Text style={[styles.postBody, darkMode && styles.textLight]} numberOfLines={3}>
                {item.body}
              </Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    setSelectedPostId(item.id);
                    setUpdatedTitle(item.title);
                    setEditModalVisible(true);
                  }}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeletePost(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Add Post Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput placeholder="Title" style={styles.input} value={title} onChangeText={setTitle} />
          <TextInput placeholder="Body" style={styles.input} value={body} onChangeText={setBody} multiline />
          <Button title="Add Post" onPress={handleAddPost} />
          <View style={{ marginVertical: 10 }}>
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
          </View>

        </View>
      </Modal>

      {/* Edit Post Modal */}
      <Modal visible={editModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput placeholder="Title" style={styles.input} value={updatedTitle} onChangeText={setUpdatedTitle} />
          <View style={{ marginVertical: 10 }}>
            <Button title="Update Post" onPress={handleUpdatePost} />
          </View>
          <Button title="Cancel" onPress={() => setEditModalVisible(false)} color="red" />
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  listContainer: { padding: 15 },
  postCard: { backgroundColor: "#FFF", borderRadius: 12, overflow: "hidden", marginBottom: 15 },
  postImage: { width: "100%", height: 180 },
  postContent: { padding: 15 },
  postTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  buttonContainer: { flexDirection: "row", marginTop: 10 },
  editButton: { flex: 1, backgroundColor: "#007BFF", padding: 8, borderRadius: 6, marginRight: 5, alignItems: "center" },
  deleteButton: { flex: 1, backgroundColor: "#FF3B30", padding: 8, borderRadius: 6, alignItems: "center" },
  input: { borderWidth: 1, padding: 10, margin: 10, borderRadius: 5 },
  modalContainer: { flex: 1, justifyContent: "center", padding: 20 },
  postCardDark: { backgroundColor: "green", },
  darkBackground: {
    backgroundColor: "black"
  },
  newPostButton: {
    width: "80%"
  }
});

export default PostScreen;
