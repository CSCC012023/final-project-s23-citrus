"use client";
import { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from './profile.module.css';
import { Heading } from '@chakra-ui/react';



async function updateUserProfile(data: any) {
  try {
    const res = await fetch(`/api/users`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      console.log('Profile updated successfully!');
    } else {
      console.error('Failed to update profile:', res.status);
    }
  } catch (error) {
    console.error('An error occurred while updating the profile:', error);
  }
}

export default function UserProfileClient() {
  const { data: session } = useSession();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [interest, setInterest] = useState(''); // Separate state for individual interest
  const [interests, setInterests] = useState<string[]>([]); // State to store all interests

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterest(e.target.value);
  };

  const handleAddInterest = () => {
    if (interest.trim() !== '') {
      setInterests([...interests, interest.trim()]); // Add the new interest to the interests array
      setInterest(''); // Clear the individual interest state
    }
  };

  const handleRemoveInterest = (index: number) => {
    const updatedInterests = interests.filter((_, i) => i !== index);
    setInterests(updatedInterests);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Assuming you have a user ID in userData
    const updatedData = {
      username: session?.user?.name,
      phone_number: phoneNumber,
      instagram: instagram,
      facebook: facebook,
      interests: interests, // Use the interests array in the updated data
    };

    await updateUserProfile(updatedData);

  };

  return (
    <>
      <Heading size="lg" mb={4}>
        Edit Profile
      </Heading>
    <form onSubmit={handleSubmit}>
      <label>
        Phone Number:
        <input type="text" value={phoneNumber} 
        onChange={(e) => setPhoneNumber(e.target.value)} />
        
      </label>
      <br />
      <label>
        Instagram:
        <input type="text" value={instagram}
        onChange={(e) => setInstagram(e.target.value)} />
      </label>
      <br />
      <label>
        Facebook:
        <input type="text" value={facebook} 
        onChange={(e) => setFacebook(e.target.value)} />
      </label>
      <br />
      <label>
        Interests:
        <div>
          <input type="text" value={interest} onChange={handleInterestChange} />
          <button type="button" onClick={handleAddInterest}>
            Add
          </button>
        </div>
        <ul>
          {interests.map((item, index) => (
            <li key={index}>
              {item}{' '}
              <button type="button" onClick={() => handleRemoveInterest(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </label>
      <br />
      <button type="submit">Update Profile</button>
    </form>
    </>
  );
}