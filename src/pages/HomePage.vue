<template>
    <div class="row">
        <div class="col-2">
            <ProfileSnapshot :user="user"/>
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
import ProfileSnapshot from "../components/ProfileSnapshot.vue";
import { logger } from "../utils/Logger";

export default {
    setup() {
        return {
            user: computed(() => AppState.user),
        };
    },
    methods: {
        isNotInConfig() {
            logger.log('user',this.user)
            return this.$router.currentRoute.value.name
        }
    },
    components: { Login, AccountPage, PostCard, ProfileSnapshot }
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
