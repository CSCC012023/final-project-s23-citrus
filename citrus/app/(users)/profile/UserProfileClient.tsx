"use client";
import { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
//import { useRouter } from 'next/router';

async function updateUserProfile(data: any) {
  const res = await fetch(`/api/users`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (res.ok)	console.log('Profile updated successfully!');
  else		console.error('Failed to update profile:', res.status);
  
}

export default async function UserProfileClient(){

  const { data: session } = useSession();
  // if (data.user) // session will have a user field, so you can check that

  const [phoneNumber, setPhoneNumber] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [interests, setInterests] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Assuming you have a user ID in userData
    const updatedData = {
      username: session?.user?.name,
      phone_number: phoneNumber,
      instagram: instagram,
      facebook: facebook,
      interests: interests.split(',').map((interest) => interest.trim()),
    };

    await updateUserProfile(updatedData);
    //router.reload(); // Refresh the page after updating the profile
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Phone Number:
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </label>
      <br />
      <label>
        Instagram:
        <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
      </label>
      <br />
      <label>
        Facebook:
        <input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
      </label>
      <br />
      <label>
        Interests:
        <input type="text" value={interests} onChange={(e) => setInterests(e.target.value)} />
      </label>
      <br />
      <button type="submit">Update Profile</button>
    </form>
  );
};