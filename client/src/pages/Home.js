import React from "react";
import '../styles/Home.css'
const Home = () => {
  return (
    <div>
        <h1 className="webheader">Event Management Platform</h1>
    <section className="landing-page">
    <div className="content">
      <div className="text-content">
      <h1>Poor Time Management?</h1>
<p>Struggling to manage your events efficiently? Our platform helps you stay organized, whether you're hosting or attending. Get instant access to event details, real-time registrations, and updates.</p>
        <div className="button-group">
          <a href="/register" className="btn-register">Register Now</a>
          <a href="/login" className="btn-login">Login</a>
        </div>
      </div>
    </div>
    <div className="image-content">
      <img src="https://www.niagaracollege.ca/hospitalityandtourism/wp-content/uploads/sites/76/2019/08/i-em.jpg" alt="Event"/>
    </div>
  </section>
    </div>
  );
};

export default Home;
