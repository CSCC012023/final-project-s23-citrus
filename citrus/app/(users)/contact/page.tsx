import React from 'react';
import styles from './styles.module.css';

const AboutUsPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoAndContentContainer}>
        <div className={styles.center}>
          <h1 className={styles.heading}>- ABOUT US -</h1>
          <p className={styles.description}>
            Welcome to Eventual - your gateway to meaningful connections and exciting events! 
          </p>
          <p className={styles.description}>
            Our platform allows you to connect with like-minded individuals, attend events, and share your own gatherings with the community. Whether it&apos;s discovering new hobbies, exploring your city&apos;s hidden gems, or simply making new friends, Eventual is here to make it happen.
          </p>
          <p className={styles.description}>
            We take pride in providing exceptional tech support, available 24/7, to ensure your experience with us is seamless and enjoyable. Our team is always ready to assist, so you can focus on what matters most - connecting, engaging, and having a great time!
          </p>
          <p className={styles.phoneNumber}>Join us today and become a part of our thriving community. Let&apos;s create lasting memories and build meaningful connections together!</p>
          <p className={styles.phoneNumber}>-</p>

          <p className={styles.phoneNumber}>Phone: 647-324-8322</p>
          <p className={styles.phoneNumber}>Email: techsupport@eventual.com</p>
        </div>
        <div className={styles.logoContainer}>
          <img src="/eventual_logo.svg" alt="Logo" width={150} height={150} />
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
