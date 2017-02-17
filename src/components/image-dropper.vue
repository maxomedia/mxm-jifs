<template lang="pug">
	div.image-dropper
		div.dropzone.module
			h2 Drop images
			input(type="file" multiple @change="onFileChange")
			p Or click to upload
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

        mounted() {
            // Listen for file drops on the whole page
            const app = document.getElementById('app');
            app.addEventListener('dragover', this.onDragOver);
            app.addEventListener('drop', (e) => {
                e.preventDefault();
                this.onFileChange(e);
            });
        },

        methods: {
            uploadAll() {
                const uploads = this.$refs.images.map(image => image.upload());
                return Promise.all(uploads);
            },

            onDragOver(e) {
                e.preventDefault();
            },

            onFileChange(event) {
                var images = event.target.files || event.dataTransfer.files;
                for (var i = 0; i < images.length; i++) {
                    images[i].dataURL = window.URL.createObjectURL(images[i]);
                    this.images.push(images[i]);
                }
                this.$emit('file-change', this.images.length);
            },

            removeImage(index) {
                this.images.splice(index, 1);
                this.$emit('file-change', this.images.length);
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
        padding: 1em;
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