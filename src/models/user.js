import firebase from 'config/firebase';

export default function User(user = {}) {
	this.uid = user.uid || null;
	this.displayName = user.displayName || '';
  this.email = user.email || '';
  this.isAnonymous = user.isAnonymous || false;
  this.emailVerified = user.emailVerified || false;
  this.photoURL = user.photoURL || null;
  this.refreshToken = user.refreshToken || null;
  
  var ref = firebase.database().ref(`/users/${this.uid}`);

  this.set = () => {
  	return ref.set(JSON.parse(JSON.stringify(this)));
  };

  this.getUserInfo = () => {
    return {
      uid: this.uid,
      displayName: this.displayName,
      email: this.email,
      photoURL: this.photoURL,
    };
  };
}