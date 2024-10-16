import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Text, Button } from "react-native";
import { AccountContainer, AuthButton } from "../components/account.styles";
import { useAuth } from "../contexts/auth.context";
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu"; // Import Menu and MenuProvider
import axios from "axios";

export const ProfileScreen = () => {
  const { logout, isLoading, userProfile } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogout = async () => {
    try {
      setError(null);
      await logout();
    } catch (e) {
      setError("Failed to log out");
    }
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    Alert.prompt("Update Profile", "Enter new name or email", async (text) => {
      try {
        const updateProfileDto = { name: text };
        await axios.put(
          "https://todo-33hzc3d83-orionscripts-projects.vercel.app/profile",
          updateProfileDto
        );
        Alert.alert("Profile Updated");
      } catch (e) {
        Alert.alert("Failed to update profile");
      }
    });
  };

  // Handle opening change password modal
  const openChangePasswordModal = () => {
    setIsModalVisible(true);
  };

  // Handle change password
  const handleChangePassword = async () => {
    try {
      const changePasswordDto = { currentPassword, newPassword };
      await axios.put(
        "https://todo-33hzc3d83-orionscripts-projects.vercel.app/change-password",
        changePasswordDto
      );
      Alert.alert("Password Changed Successfully");
      setIsModalVisible(false);
    } catch (e) {
      Alert.alert("Failed to change password");
    }
  };

  // Handle update user details
  const handleUpdateUserDetails = () => {
    Alert.prompt(
      "Update User Details",
      "Enter new user details (name, email, password)",
      async (text) => {
        try {
          const updateUserDto = { name: text };
          await axios.put(
            `https://todo-33hzc3d83-orionscripts-projects.vercel.app/users/${userProfile?.id}`,
            updateUserDto
          );
          Alert.alert("User Details Updated");
        } catch (e) {
          Alert.alert("Failed to update user details");
        }
      }
    );
  };

  return (
    <MenuProvider>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.profileImage}
              source={require("../assets/profile-image.png")}
            />
            <View style={styles.border} />
          </View>
          <Text style={styles.user}>{userProfile?.name || "..."}</Text>
          <Text style={styles.user}>{userProfile?.email || "..."}</Text>
        </View>

        <View style={styles.menuContainer}>
          {/* Three-dot menu */}
          <Menu>
            <MenuTrigger>
              <Text style={styles.menuIcon}>⋮</Text>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={handleUpdateProfile}>
                <Text style={styles.menuOption}>Update Profile</Text>
              </MenuOption>
              <MenuOption onSelect={openChangePasswordModal}>
                <Text style={styles.menuOption}>Change Password</Text>
              </MenuOption>
              <MenuOption onSelect={handleUpdateUserDetails}>
                <Text style={styles.menuOption}>Update User Details</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>

        {/* Modal for changing password */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Change Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Current Password"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <Button title="Submit" onPress={handleChangePassword} />
              <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
            </View>
          </View>
        </Modal>

        <View>
          <AuthButton
            icon="lock-open-outline"
            mode="contained"
            onPress={handleLogout}
            style={styles.button}
          >
            Logout
          </AuthButton>
        </View>
      </ScrollView>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#458ae5",
    padding: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 75,
    borderWidth: 7,
    borderColor: "#fff",
  },
  border: {
    position: "absolute",
    width: 230,
    height: 230,
    borderRadius: 115,
    borderWidth: 5,
    borderColor: "#ff6347",
  },
  user: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    fontStyle: "italic",
  },
  button: {
    marginTop: 40,
    backgroundColor: "#458ae5",
    width: 200,
    height: 50,
    margin: "auto",
  },
  menuContainer: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  menuIcon: {
    fontSize: 24,
    color: "#fff",
  },
  menuOption: {
    padding: 10,
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
