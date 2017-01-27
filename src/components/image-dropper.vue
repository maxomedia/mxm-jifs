<template lang="pug">
	div
		div.dropzone(@dragover="onDragEnter")
			input(type="file" multiple @change="onFileChange")
			h2 Drop images here
			p Or click to upload images
		div.clearfix.image-dropper--previews
			image-upload(:image="image" v-for="(image, index) in images" ref="images" @click.native="removeImage(index)")
</template>

<script>
	import Vue from 'vue';
	import cuid from 'cuid';
	import firebase from 'config/firebase';
	import ImageUpload from 'components/image-upload';

	export default {
		name: 'ImageDropper',
		data() {
			return {
				images: [],
			};
		},

		methods: {
			uploadAll() {
				var uploads = this.$refs.images.map(image => image.upload());
				return Promise.all(uploads);
			},

			onDragEnter(e) {
				e.preventDefault();
			},

			onFileChange(event) {
				var images = event.target.files || event.dataTransfer.files;
				for (var i = 0; i < images.length; i++) {
					images[i].dataURL = window.URL.createObjectURL(images[i]);
					this.images.push(images[i]);
				}
			},

			removeImage(index) {
				this.images.splice(index, 1)
				//this.images = this.images.filter(image => image.name !== imageToRemove.name);
			},
		},

		components: {
			ImageUpload,
		},
	}
</script>

<style lang="scss">
	.dropzone {
		position: relative;
		height: 300px;
		border: 3px dashed white;
	}
	.image-dropper--previews {
		display: flex;
		flex-wrap: wrap;

		.image-upload {
			flex: 0 0 200px;
		}
	}
	input[type="file"] {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		z-index: 1;
	}
</style>