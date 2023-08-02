import React from 'react';
import styles from './styles.module.css';

const AboutUsPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <h1 className={styles.heading}>ABOUT US</h1>
        <p className={styles.description}>
          We are a software company dedicated to providing innovative solutions and top-notch software
          products to our clients. With a passion for technology and a team of skilled developers, we strive
          to deliver exceptional results that exceed expectations.
        </p>
        <p className={styles.phoneNumber}>Phone: +1 (123) 456-7890</p>
      </div>
    </div>
  );
};

export default AboutUsPage;
