<template>
<div v-if="routeParams()" class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-8">
            <div class="card">
                <div class="card-body">
                    <form @submit.prevent="createPost">
                        <div class="mb-3">
                            <textarea name="body" v-model="state.newPost.body" class="form-control" id="body" rows="3" required placeholder="Share whats happening"></textarea>
                        </div>
                        <div class="mb-3">
                            <input name="imgUrl" v-model="state.newPost.imgUrl" type="text" required placeholder="imgUrl" class="form-control" id="imgUrl">
                        </div>
                        <button class="btn btn-success" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-12" v-for="post in routeParams() ? posts : filteredPosts">
        <div class="card text-center">
            <div class="row">
                <div class="col-10">
                    <router-link v-if="post.creatorId" :to="{ name: 'UserProfile', params: { profileId: post.creatorId } }">
                        <img class="col-6" :src="post.creator.picture" />
                    </router-link>
                    <h5>{{ post.creator.name}}</h5>
                </div>
                <div class="col">
                    <button v-if="post.creatorId === account.id" @click="deletePost(post.id)" class="btn"><i class="mdi mdi-delete"></i></button>
                </div>
            </div>
            <div>
                <span>{{ post.createdAt }}</span>
                <span>{{ post.creator.graduated }}</span>
            </div>
            <div class="card-body">
                <p>{{ post.body }}</p>
            </div>
            <div class="d-flex justify-content-end">
                {{post.likes.length}}
                <button v-if="!checkId(post.likeIds) || post.likeIds.length == 0" @click="toggleLikePost(post.id)" class="btn"><i class="mdi mdi-heart-outline"></i></button>
                <button v-else="checkId(post.likeIds)" @click="toggleLikePost(post.id)" class="btn"><i class="mdi mdi-heart"></i></button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    postService
} from "../services/PostService.js"
import {
    onMounted,
    computed,
    reactive
} from "vue";
import {
    logger
} from "../utils/Logger";
import Pop from "../utils/Pop";
import {
    AppState
} from "../AppState";

export default {
    setup() {
        const state = reactive({
            newPost: {
                body: '',
                imgUrl: ''
            }
        });
        onMounted(() => {
            getPosts()
        })
        async function getPosts() {
            try {
                await postService.getPosts()
            } catch (error) {
                logger.error(error)
                Pop.error(error)
            }
        }
        return {
            posts: computed(() => AppState.posts),
            filteredPosts: computed(() => AppState.posts.filter(post => post.creatorId === AppState.activeProfile.id)),
            account: computed(() => AppState.account),
            activeProfile: computed(() => AppState.activeProfile),
            state,
            cancelForm() {
                AppState.showForm = false
                state.newPost = {
                    body: '',
                    imgUrl: ''
                }
            }
        };
    },
    methods: {
        async toggleLikePost(postId) {
            try {
                await postService.toggleLikePost(postId)
            } catch (error) {
                logger.error(error)
                Pop.error(error)
            }
        },

        async createPost() {
            try {
                await postService.createPost(this.state.newPost)
                Pop.toast('created Post', 'success')
                this.cancelForm()
            } catch (error) {
                logger.error(error)
                Pop.error(error)
            }
        },

        async deletePost(creatorId) {
            try {
                await postService.deletePost(creatorId)
            } catch (error) {
                logger.error(error)
                Pop.error(error)
            }
        },

        checkId(likeIds) {
            return likeIds.find(like => {
                return (like == this.account.id) ? true : false
            })
        },

        routeParams() {
            return this.$route.fullPath.endsWith('/') ? true : false
        }
    },
    components: {
    }
}
</script>

<style lang="scss" scoped>
img {
    max-height: 20rem;
}
</style>
