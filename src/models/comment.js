import cuid from 'cuid';
import User from 'models/user';
import firebase from 'config/firebase';

export default function (comment = {}) {

  // Properties
  this.id = comment.id || cuid();
  this.created = comment.created || Date.now();
  this.user = comment.user || null;
  this.text = comment.text || '';
  this.post = comment.post || null;
  this.votes = comment.votes || {};

  const ref = firebase.database().ref(`/comments/${this.id}`);

  // Methods
  this.set = () => ref.set(JSON.parse(JSON.stringify(this)));
  this.remove = () => ref.remove();
  this.upvote = (userId) => ref
    .child(`votes/${userId}`)
    .set(!this.votes[userId] || this.votes[userId] < 0 ? 1 : 0);
  this.downvote = (userId) => ref
    .child(`votes/${userId}`)
    .set(!this.votes[userId] || this.votes[userId] > 0 ? -1 : 0);
}