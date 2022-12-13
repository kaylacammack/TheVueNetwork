<template>
    <div class="row">
        <form action="" class="input-group" @submit.prevent="searchPost()">
            <input type="text" class="form-control" v-model="search.query">
            <button class="btn btn-info w-25"><i class="mdi mdi-magnify"></i></button>
        </form>

    </div>
</template>


<script>
import { reactive } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { postService } from '../services/PostService.js';
export default {
    setup() {
        // const search = ref('')
        const search = reactive({
            query: ''
        })
        return {
            search,
            async searchPost() {
                try {
                    await postService.searchPosts(search)
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped>

</style>
