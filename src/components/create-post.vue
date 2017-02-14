<template lang="pug">
	div
		h1 new post
		p
			span Type a
			input(placeholder="title" v-model="title")
			span  and some
			image-dropper(ref="uploader")
			span  and
			button(@click="submitPost" v-bind:disabled="uploadingFiles") submit it.
		p.error(v-if="error") {{error}}
</template>

<script>
    import cuid from 'cuid';
    import Post from 'models/post';
    import firebase from 'config/firebase';
    import ImageDropper from 'components/image-dropper';

    export default {
        data() {
            return {
                title: '',
                error: false,
                uploadingFiles: false,
            };
        },

        computed: {
            user() {
                return this.$store.state.auth.user;
            },
        },

        methods: {
            submitPost() {
                this.uploadingFiles = true;

                this.$refs.uploader
                    .uploadAll()
                    .then((data) => {
                        this.uploadingFiles = false;
                        this.error = false;

                        var post = new Post({
                            title: this.title,
                            images: data,
                            user: this.user.uid,
                        });

                        return firebase
                            .database()
                            .ref(`/posts/${post.id}`)
                            .set(post.getData());
                    })
                    .catch(err => {
                        this.error = err.message;
                    });
            },
        },

        components: {
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