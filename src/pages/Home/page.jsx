import React from 'react'
import HealthcareServices from '../../components/Home/HealthcareServices';
import WhyChooseUs from '../../components/Home/WhyChooseUs';
import HealthcareReviews from '../../components/Home/HealthcareReviews';
import HealthcareChat from '../../components/Home/HealthcareChat';

const Home = () => {
  return (
    <div>
        <HealthcareServices />
        <WhyChooseUs />
        <HealthcareReviews />
        <HealthcareChat />
    </div>
  )
}

export default Home ;