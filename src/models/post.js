import cuid from 'cuid';

export default function (post = {}) {
	this.id = post.id || cuid();
	this.created = post.created || Date.now();
	this.title = post.title || '';
	this.text = post.text || '';
	this.images = post.images || [];
	this.upvotes = post.upvotes || {};
	this.downvotes = post.downvotes || {};
  this.user = post.user || null;
}