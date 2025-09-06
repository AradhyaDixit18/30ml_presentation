import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const PROFILE_URL = 'https://7m00dhymjc.execute-api.us-east-1.amazonaws.com/prod/user/profile';

const EditProfileScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState<string | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
            setToken(storedToken);
            fetchProfile(storedToken);
        } else {
            setError('Authentication token not found. Please log in again.');
            setLoading(false);
        }
    };
    loadProfile();
  }, []);

  const fetchProfile = async (authToken: string) => {
    setLoading(true);
    setError('');
    try {
        const response = await axios.get(PROFILE_URL, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        if (response.data) {
            setName(response.data.name || '');
            if (response.data.dateOfBirth) {
                setBirthDate(new Date(response.data.dateOfBirth));
            }
            setGender(response.data.gender || '');
            setContactNumber(response.data.phone?.replace('+91', '') || '');
            setImage(response.data.profilePictureUrl || null);
        }
    } catch (apiError) {
        setError('Failed to fetch profile data.');
        console.error('Fetch Profile Error:', apiError);
    } finally {
        setLoading(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!token) {
        setError('Authentication token is missing.');
        return;
    }
    setSaving(true);
    setError('');
    
    try {
        const formattedDob = birthDate ? birthDate.toISOString().split('T')[0] : '';
        await axios.patch(PROFILE_URL, {
            name,
            dateOfBirth: formattedDob,
            gender,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        Alert.alert("Success", "Profile updated successfully.");
    } catch (e) {
        setError("Failed to save profile.");
        console.error('Save Profile Error:', e);
    } finally {
        setSaving(false);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
        setBirthDate(selectedDate);
    }
  };

  if (loading) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
        </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{width: 24}} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.profilePicContainer} onPress={pickImage}>
          <View style={styles.profilePicPlaceholder}>
            {image ? <Image source={{ uri: image }} style={styles.profilePic} /> : <Icon name="user" size={50} color="#8A8A8A" />}
          </View>
          <View style={styles.editIcon}>
            <Icon name="edit-2" size={16} color="#FFFFFF" />
          </View>
        </TouchableOpacity>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.form}>
            <Text style={styles.label}>Name*</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholderTextColor="#A9A9A9" />

            <Text style={styles.label}>Birth Date*</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
                <View style={styles.pickerContainer}>
                    <Text style={styles.pickerText}>{birthDate ? birthDate.toLocaleDateString() : 'Select Date of Birth'}</Text>
                    <Icon name="calendar" size={20} color="#A9A9A9" />
                </View>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker value={birthDate || new Date()} mode="date" display="default" onChange={onDateChange} />
            )}

            <Text style={styles.label}>Gender*</Text>
            <TextInput style={styles.input} value={gender} onChangeText={setGender} placeholderTextColor="#A9A9A9" />

            <Text style={styles.label}>Contact Number</Text>
            <View style={styles.contactInputContainer}>
                <View style={styles.countryCodePicker}>
                    <Text style={styles.countryCodeText}>+91</Text>
                </View>
                <TextInput style={styles.contactInput} value={contactNumber} editable={false} />
            </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={saving}>
          {saving ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.saveButtonText}>Save Details</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1C1623' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#2C2635' },
  headerTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' },
  scrollContainer: { padding: 24 },
  profilePicContainer: { alignItems: 'center', marginBottom: 30 },
  profilePicPlaceholder: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#2C2635', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#4A4458' },
  profilePic: { width: 120, height: 120, borderRadius: 60 },
  editIcon: { position: 'absolute', bottom: 0, right: '35%', backgroundColor: '#9B5DE5', width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  form: { width: '100%' },
  label: { fontSize: 14, color: '#A9A9A9', marginBottom: 8 },
  input: { backgroundColor: '#2C2635', borderRadius: 8, paddingVertical: 14, paddingHorizontal: 16, fontSize: 16, color: '#FFFFFF', marginBottom: 20, borderWidth: 1, borderColor: '#4A4458', justifyContent: 'center' },
  pickerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pickerText: { fontSize: 16, color: '#FFFFFF' },
  contactInputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2C2635', borderRadius: 8, borderWidth: 1, borderColor: '#4A4458' },
  countryCodePicker: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 14, borderRightWidth: 1, borderRightColor: '#4A4458' },
  countryCodeText: { color: '#FFFFFF', fontSize: 16, marginRight: 4 },
  contactInput: { flex: 1, paddingVertical: 14, paddingHorizontal: 16, fontSize: 16, color: '#8A8A8A' },
  saveButton: { backgroundColor: '#5C2C90', padding: 18, borderRadius: 8, alignItems: 'center', marginTop: 40 },
  saveButtonText: { fontSize: 18, color: '#FFFFFF', fontWeight: 'bold' },
  errorText: { color: '#FF5A5F', textAlign: 'center', marginBottom: 10 },
});

export default EditProfileScreen;
