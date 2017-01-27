<template lang="pug">
	div.image-upload
		img.image-upload--preview(:src="image.dataURL")
		div.image-upload--progress(:style="progressStyle" v-if="uid")
			img(:src="image.dataURL")
		div.image-upload--remove(v-if="uid")
</template>

<script>
import Vue from 'vue';
	import cuid from 'cuid';
	import firebase from 'config/firebase';

	export default {
		name: 'ImageUpload',
		data() {
			return {
				progress: 0,
				blob: null,
				// dataURL: null,
				uid: cuid(),
			}
		},

		props: {
			image: File,
		},

		computed: {
			progressStyle() { return `width: ${this.progress}%;`; },
			// dataURL() {console.log('heavy'); return window.URL.createObjectURL(this.image); }
		},

		/*created() {
			this.dataURL = window.URL.createObjectURL(this.image);
		},*/

		methods: {
			upload() {
				var uploader = firebase
					.storage()
					.ref(`/images/${this.uid}`)
					.put(this.image);

				uploader.on('state_changed', this.onUploadProgress);

				return uploader
					.then(snapshot => snapshot.downloadURL);
			},

			onUploadProgress(snapshot) {
				this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
		},
	}
</script>

<style lang="scss">
	.image-upload {
		position: relative;
		width: 200px;
		min-height: 100px;
		background-color: rgba(255,255,255,0.1);
	}

	.image-upload--preview {
		width: 100%;
		height: 100%;
		max-width: none;
		filter: grayscale(1);
		object-fit: cover;
	}

	.image-upload--progress {
		position: absolute;
		top: 0;
		left: 0;
		width: 0%;
		height: 100%;
		will-change: width;
		transition: width 1000ms;
		transform: translate3d(0,0,0);
		overflow: hidden;

		img {
			object-fit: cover;
			width: 200px;
			height: 100%;
			max-width: none;
		}
	}

	.image-upload--remove {
		position: absolute;
		background: crimson;
		mix-blend-mode: multiply;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		will-change: opacity;
		transition: opacity 200ms;

		&:hover {
			opacity: 1;
		}
	}
</style>