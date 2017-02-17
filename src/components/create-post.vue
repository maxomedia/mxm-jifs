<template lang="pug">
    div.create-post(:class="creatingClass" v-bind:style="placeholderStyle")
        form
            div.create-post--popout(:style="popOutStyle")
                image-dropper(ref="uploader" @file-change="fileChanged")
                input(placeholder="title" v-model="title")
                button(@click="submitPost" v-bind:disabled="uploadingFiles") submit it.
        p.error(v-if="error") {{error}}
</template>

<script>
    import cuid from 'cuid';
    import Post from 'models/post';
    import firebase from 'config/firebase';
    import ImageDropper from 'components/image-dropper';

    function getOffset(el) {
        var _x = 0;
        var _y = 0;
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return {
            top: _y,
            left: _x
        };
    }

    export default {
        data() {
            return {
                title: '',
                error: false,
                uploadingFiles: false,
                hasFiles: false,
            };
        },

        computed: {
            user() {
                return this.$store.state.auth.user;
            },
            creatingClass() {
                return this.hasFiles ? 'creating' : '';
            },
            popOutStyle() {
                if (!this.hasFiles) return '';
                const placeholder = document.querySelector('.create-post');
                const offset = getOffset(placeholder);
                const width = placeholder.clientWidth;
                const height = placeholder.clientHeight;
                return `top: ${offset.x + 15}px;
                        left: ${offset.y + 15}px;
                        width: ${width}px;
                        height: ${height}px;`;
            },
            placeholderStyle() {
                if (!this.hasFiles) return '';
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
            fileChanged(e) {
                this.hasFiles = e > 0;
            },
        },

        components: {
            ImageDropper,
        }
    };
</script>

<style lang="scss">
    @import '../styles/_variables';
    .posts {
        .auth-guard {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: percentage(1/3);
            padding: 15px;
            text-align: center;
        }
    }
    
    .create-post--popout {
        background: $anthracite;
        .creating & {
            position: fixed;
            transition: all 5s;
            top: 50px;
        }
    }
</style>