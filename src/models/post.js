import cuid from 'cuid';
import firebase from 'config/firebase';

export default function(post = {}) {
    this.id = post.id || cuid();
    this.created = post.created || Date.now();
    this.title = post.title || '';
    this.text = post.text || '';
    this.images = post.images || [];
    this.votes = post.votes || {};
    this.user = post.user || null;

    var ref = firebase.database().ref(`/posts/${this.id}`);

    this.set = () => ref.set(JSON.parse(JSON.stringify(this)));
    this.remove = () => ref.remove();
    this.upvote = (userId) => ref
        .child(`votes/${userId}`)
        .set(!this.votes[userId] || this.votes[userId] < 0 ? 1 : 0);
    this.downvote = (userId) => ref
        .child(`votes/${userId}`)
        .set(!this.votes[userId] || this.votes[userId] < 0 ? -1 : 0);

    this.getData = () => ({
        id: this.id,
        created: this.created,
        title: this.title,
        text: this.text,
        images: this.images,
        votes: this.votes,
        user: this.user,
    });
}