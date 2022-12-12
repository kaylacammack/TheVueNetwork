<template>
    <div class="row">
        <div class="col-2">
            <div class="text-center">
                <router-link :to="{ name: 'Profile' }">
                    <img :src="user.picture" class="picture"/>
                </router-link>
            </div>
            <div>
                <p>{{ user.class }}</p>
                <p>{{ user.graduated }}</p>
            </div>
            <div>
                <p>{{ user.name }}</p>
            </div>
            <div>
                <button type="button" class="btn"><i class="mdi mdi-github">{{ user.github }}</i></button>
            </div>
            <div>
                <button class="btn"><i class="mdi mdi-linkedin">{{ user.linkedin }}</i></button>
            </div>
            <div>
                <button class="btn"><i class="mdi mdi-file-document-outline">{{ user.resume }}</i></button>
            </div>
        </div>
        <div class="col-8">
            <router-view />
            <PostCard v-if="isNotInConfig() === 'Home'"/>
        </div>
        <div class="col-2">
            <AdCard/>
        </div>
    </div>
</template>

<script>
import Login from "../components/Login.vue";
import PostCard from "../components/PostCard.vue";
import AccountPage from "./AccountPage.vue";
import { computed } from 'vue'
import { AppState } from '../AppState'

export default {
    setup() {
        return {
            user: computed(() => AppState.user),
        };
    },
    methods: {
        isNotInConfig() {
            return this.$router.currentRoute.value.name
        }
    },
    components: { Login, AccountPage, PostCard }
}
</script>

<style lang="scss" scoped>
    .picture {
        height: 100px;
        border-radius: 50%;
    }
    .btn {
        // height: 20px
    }
    
</style>
