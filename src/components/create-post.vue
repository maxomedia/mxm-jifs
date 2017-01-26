<template lang="pug">
	div
		h1 new post
		div.clearfix
			image-upload(:file="file" v-for="file in files")
		p
			span Type a
			input(placeholder="title" v-model="title")
			span  and some
			image-dropper(@file-added="addFile")
			span  or write some
			textarea(placeholder="text" v-model="text")
			span  and
			button(@click="submitPost" v-bind:disabled="uploadingFiles") submit it.
		p.error(v-if="error") {{error}}
</template>

<script>
	import cuid from 'cuid';
	import firebase from 'config/firebase';
	import ImageUpload from 'components/image-upload';
	import ImageDropper from 'components/image-dropper';
	import Post from 'models/post';

	export default {
		data() {
			return {
				title: '',
				imgUrl: '',
				img: null,
				text: '',
				error: false,
				files: [],
				uploadingFiles: false,
			};
		},

		computed: {
			user() { return this.$store.state.auth.user; }
		},

		methods: {
			addFile(file) {
				this.files.push(file);
			},

			submitPost() {
				this.uploadingFiles = true;
				var uploads = this.$children
					.filter(child => child.$options.name == 'ImageUpload')
					.map(child => child.upload());

				Promise.all(uploads)
					.then((data) => {
						this.uploadingFiles = false;
						this.error = false;

						var post = new Post({
							title: this.title,
							text: this.text,
							images: data,
							user: this.user,
						});

						return firebase
							.database()
							.ref(`/posts/${post.id}`)
							.set(post);
					})
					.catch(err => {
						this.error = err;
					});
			},
		},

		components: {
			ImageUpload,
			ImageDropper,
		}
	};
</script>

<style>
	.clearfix:before,
	.clearfix:after {
		display: table;
		content: '';
	}
	.clearfix:after {
		clear: both;
	}
</style>