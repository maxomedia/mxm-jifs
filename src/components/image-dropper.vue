<template lang="pug">
	div
		div.dropzone(@dragover="onDragEnter")
			input(type="file" multiple @change="onFileChange")
			h2 Drop images here
		div.deletezone
			h2 Delete images here
</template>

<script>
	import firebase from 'config/firebase';
	import cuid from 'cuid';

	export default {
		methods: {
			onDragEnter(e) {
				e.preventDefault();
			},

			onFileChange(event) {
				var files = event.target.files || event.dataTransfer.files;
				for (var i = 0; i < files.length; i++) {
					this.createFile(files[i]);
				}
			},

			createFile(file) {
				var img = new Image();
				var reader = new FileReader();

				reader.onload = (e) => {
					file.blob = this.dataURLtoBlob(e.target.result);
					file.dataURL = e.target.result;
					file.uid = cuid();
					this.$emit('file-added', file);
				};

				reader.readAsDataURL(file);
			},

			dataURLtoBlob(dataurl) {
				var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		    while(n--){
		        u8arr[n] = bstr.charCodeAt(n);
		    }
		    return new Blob([u8arr], {type:mime});
			},
		}
	}
</script>

<style lang="scss">
	.dropzone {
		position: relative;
		height: 300px;
		border: 3px dashed white;
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