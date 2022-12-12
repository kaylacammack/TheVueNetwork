<template>
    <div class="row">
        <div class="col-12" v-for="post in posts">
            <div class="card">
                <div>
                    <img :src="post.creator.picture"/>
                    <h5>{{ post.creator.name}}</h5>
                </div>
                <div>
                    <span>{{ post.createdAt }}</span>
                    <span>{{ post.creator.graduated }}</span>
                </div>
                <div class="card-body">
                    <p>{{ post.body }}</p>
                </div>
                <div>
                    <button class="btn"><i class="mdi mdi-heart-outline"></i></button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { postService } from "../services/PostService.js"
import { onMounted, computed } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import ProfilePage from "../pages/ProfilePage.vue";

    export default {
        setup() {
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
                posts: computed(() => AppState.posts)
            };
    },
    components: { ProfilePage }
    }
</script>

<style lang="scss" scoped>

</style>