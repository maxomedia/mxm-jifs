<template lang="pug">
	div.preview-image
		img(:src="file.dataURL")
		p.progress Progress: {{progress}}%
</template>

<script>
	import firebase from 'config/firebase';

	export default {
		name: 'ImageUpload',
		data() {
			return {
				progress: 0,
			};
		},
		props: {
			file: File,
		},
		methods: {
			upload() {
				var uploader = firebase
					.storage()
					.ref(`/images/${this.file.uid}`)
					.put(this.file.blob);

				uploader.on(
					'state_changed',
					this.trackProgress
				);

				return uploader
					.then(snapshot => snapshot.downloadURL);
			},
			trackProgress(snapshot) {
				this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
		},
	}
</script>

<style lang="scss">
	.preview-image {
		float: left;

		img {
			max-width: 80px;
		}
	}	
</style>