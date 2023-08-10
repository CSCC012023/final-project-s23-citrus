"use client";
import { FormEvent, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Heading } from '@chakra-ui/react';
import { useRouter } from "next/navigation";
import Link from 'next/link'; // Import the Link component


import '@/lib/patch'

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
      phone_number: phoneNumber == "" ? undefined : phoneNumber,
      instagram: instagram == "" ? undefined : instagram,
      facebook: facebook == "" ? undefined : facebook,
      interests: interests.length == 0 ? undefined : interests, // Use the interests array in the updated data
    };

    await updateUserProfile(updatedData);
  };

  const router = useRouter();

  return (
    <>
      <h1 className='text-xl font-extrabold'>
        Edit Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex-col content-center gap-2.5 text-center">
        <div>
          <label>
            Phone Number
          </label>
          <br />
          <input type="text" value={phoneNumber} className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-black"
            onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div>
          <label>
            Instagram
          </label>
          <br />
          <input type="text" value={instagram} className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-black"
            onChange={(e) => setInstagram(e.target.value)} />
        </div>
        <div>
          <label>
            Facebook
            <br />
          </label>
          <input type="text" value={facebook} className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-black"
            onChange={(e) => setFacebook(e.target.value)} />
        </div>
        <div>
          <label>
            Interests
          </label>
          <div>
            <input type="text" value={interest} className="py-2 border border-gray-300 rounded-md text-black"
              onChange={handleInterestChange} />
            <button type="button" className="border p-3 rounded-lg bg-blue-900" onClick={handleAddInterest}>
              Add
            </button>
          </div>
        </div>
        <ul>
          {interests.map((item, index) => (
            <li key={index}>
              {item}{' '}
              <button type="button" className="border p-4 rounded-lg bg-blue-900" onClick={() => handleRemoveInterest(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      <button className="border p-4 mt-8 rounded-lg bg-blue-900" type="submit" onClick={() => { router.refresh() }}>Update Profile</button>
    </form >
    </>
  );
}