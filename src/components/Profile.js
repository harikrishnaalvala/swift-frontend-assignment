import React from 'react';
import { ChevronLeft, User } from 'lucide-react';
import '../styles/App.css';

const Profile = ({ user, onBack }) => {
  if (!user) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p className="loading-text">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-bg">
      <div className="container-wrapper">
        <div className="back-button" onClick={onBack}>
          <ChevronLeft className="icon" />
          Welcome to Dashboard
        </div>

        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar-circle">
              <User className="avatar-icon" />
            </div>
            <div className="profile-details">
              <h1>{user.name}</h1>
              <p>@{user.username}</p>
            </div>
          </div>

          <div className="profile-body">
            <div className="profile-column">
              <section className="profile-section">
               <p><strong>UserID:</strong> {user.id}</p>
                
              </section>

              <section className="profile-section">
                
                <p><strong>Email:</strong> {user.email}</p>
                
              </section>
              <section className="profile-section">
                 <p><strong>Phone:</strong> {user.phone}</p>
              </section>
            </div>

            <div className="profile-column">
              <section className="profile-section">
                
                <p><strong>Username:</strong> {user.username}</p>
               
              </section>

              <section className="profile-section">
               
                 <p><strong>Street:</strong> {user.address.street} {user.address.suite}</p>
                
              </section>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;