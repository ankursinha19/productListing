import React, { useEffect, useState } from "react";
import {
  View, Text, Image, ActivityIndicator, ScrollView, StyleSheet
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authCreator } from "../redux/reducers/slices/authSlice";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [authUserData, setAuthuser] = useState({})
  const { authUser, authLoading } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.theme?.darkMode);

  useEffect(() => {
    dispatch(authCreator());
  }, [dispatch]);


  useEffect(() => {
    setAuthuser(authUser)
  }, [authUser]);
  if (authLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={darkMode ? "#fff" : "blue"} />
      </View>
    );
  }
  return (
    <ScrollView style={[styles.container, darkMode && styles.containerDark]}>
      {/* Profile Header */}
      <View style={[styles.header, darkMode && styles.headerDark]}>
        <Image source={{ uri: authUserData?.image }} style={styles.profileImage} />
        <Text style={[styles.name, darkMode && styles.textLight]}>
          {authUserData?.firstName} {authUserData?.lastName}
        </Text>
        <Text style={[styles.role, darkMode && styles.textLight]}>{authUserData?.role}</Text>
      </View>

      {/* User Info Sections */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, darkMode && styles.textLight]}>Personal Information</Text>
        <View style={[styles.card, darkMode && styles.cardDark]}>
          <InfoRow label="Username" value={authUserData?.username} darkMode={darkMode} />
          <InfoRow label="Email" value={authUserData?.email} darkMode={darkMode} />
          <InfoRow label="Phone" value={authUserData?.phone} darkMode={darkMode} />
          <InfoRow label="Gender" value={authUserData?.gender} darkMode={darkMode} />
          <InfoRow label="Birth Date" value={`${authUserData?.birthDate} (Age: ${authUserData?.age})`} darkMode={darkMode} />
          <InfoRow label="Blood Group" value={authUserData?.bloodGroup} darkMode={darkMode} />
          <InfoRow label="Height" value={`${authUserData?.height} cm`} darkMode={darkMode} />
          <InfoRow label="Weight" value={`${authUserData?.weight} kg`} darkMode={darkMode} />
        </View>
      </View>

      {/* Address Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, darkMode && styles.textLight]}>Address</Text>
        <View style={[styles.card, darkMode && styles.cardDark]}>
          <InfoRow label="Street" value={authUserData?.address?.address} darkMode={darkMode} />
          <InfoRow label="City" value={authUserData?.address?.city} darkMode={darkMode} />
          <InfoRow label="State" value={authUserData?.address?.state} darkMode={darkMode} />
          <InfoRow label="Country" value={authUserData?.address?.country} darkMode={darkMode} />
          <InfoRow label="Postal Code" value={authUserData?.address?.postalCode} darkMode={darkMode} />
        </View>
      </View>

      {/* Company Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, darkMode && styles.textLight]}>Company Information</Text>
        <View style={[styles.card, darkMode && styles.cardDark]}>
          <InfoRow label="Company" value={authUserData?.company?.name} darkMode={darkMode} />
          <InfoRow label="Title" value={authUserData?.company?.title} darkMode={darkMode} />
          <InfoRow label="Department" value={authUserData?.company?.department} darkMode={darkMode} />
        </View>
      </View>

      {/* Education Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, darkMode && styles.textLight]}>Education</Text>
        <View style={[styles.card, darkMode && styles.cardDark]}>
          <InfoRow label="University" value={authUserData?.university} darkMode={darkMode} />
        </View>
      </View>
    </ScrollView>
  );
};

// Reusable InfoRow Component (Handles Dark Mode)
const InfoRow = ({ label, value, darkMode }) => (
  <View style={[styles.infoRow, darkMode && styles.infoRowDark]}>
    <Text style={[styles.infoLabel, darkMode && styles.textLight]}>{label}</Text>
    <Text style={[styles.infoValue, darkMode && styles.textLight]}>
      {value || "N/A"} {/* Fallback to 'N/A' if value is missing */}
    </Text>
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#4A90E2",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  headerDark: {
    backgroundColor: "#222",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  role: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.8,
    marginTop: 5,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: "#1E1E1E",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infoRowDark: {
    borderBottomColor: "#444",
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  infoValue: {
    fontSize: 16,
    color: "#666",
  },
  textLight: {
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
