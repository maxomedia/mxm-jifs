import Vue from 'vue';
import CommentView from 'components/comment';
import Comment from 'models/comment';
import Promise from 'es6-promise';

describe('comment.vue', () => {
    it('should render correct contents', () => {
        const CommentInstance = Vue.extend(CommentView);
        const propsData = new Comment({ text: 'This be a comment, mon!' })
        const vm = new CommentInstance({
            propsData,
            $store: {
                state: {
                    user: {
                        displayName: "",
                        email: "philipp.gfeller@maxomedia.ch",
                        emailVerified: true,
                        isAnonymous: false,
                        photoURL: null,
                        refreshToken: "ADDl5SGgOff0x44Dz5UGF_3XfUOXoxnkRbmPQCwIUqhlwvrv4csZueUOtG17k3HnJ315Eph3SmbRoCmcnXuEIuoCZYMvCwl6FcfRQVyrHCwzkEWqMLfXZQCZsphtBFQ4aAXUMViqNpz0yChyzW4za6H97GjZMaLrFWvJsWkVY9TIHi80iBc2g2eq86qoPLigbgMfannbJ96gJklIE1AkzJk4jvI5cU11v__GKgirDxkswFOk6MEL2Ce6LFbkovJ0sLYOWC-6IdRprE8U120gzTb7D54bKXy_D1mMdBG2TrjZ1zBaB4Vr2psekYvzX6MDqx1n8RjNl01tv11SqC3xGUxCtvBt5P-G_d4Hf_rQTg0_XTCkZZP8WTQ",

                        uid: "AGOnPPIREIUtqhmVqYgtun4836A3"
                    }
                }
            }
        }).$mount();

        expect(vm.$el.querySelector('.comment--text').textContent)
            .to.equal('This be a comment, mon!');
    });
})