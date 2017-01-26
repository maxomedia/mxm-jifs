import firebase from 'config/firebase';

export default function User(user = {}) {
	this.uid = user.uid || null;
	this.displayName = user.displayName || '';
  this.email = user.email || '';
  this.isAnonymous = user.isAnonymous || false;
  this.emailVerified = user.emailVerified || false;
  this.photoURL = user.photoURL || null;
  this.refreshToken = user.refreshToken || null;

  this.set = function() {
  	return firebase
  		.database()
  		.ref(`/users/${this.uid}`)
  		.set(this);
  };
}