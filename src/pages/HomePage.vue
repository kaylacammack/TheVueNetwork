<template>
    <div class="row">
        <div class="col-2">
            
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

</style>
