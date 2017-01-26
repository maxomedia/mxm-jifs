import cuid from 'cuid';

export default function (post = {}) {
	this.id = cuid();
	this.created = Date.now();
	this.title = post.title || '';
	this.text = post.text || '';
	this.images = post.images || [];
	this.upvotes = {};
	this.downvotes = {};
}