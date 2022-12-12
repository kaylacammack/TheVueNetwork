<template>
    <div class="row">
        <div class="col-10" v-for="ad in ads">
            <div class="card">
                <img :src="ad.square"/>
            </div>
        </div>
    </div>
</template>

<script>
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop.js";
import { onMounted, computed } from "vue";
import { adService } from "../services/AdService.js";
import { AppState } from "../AppState";

export default {
    setup() {
        onMounted(() => {
            getAds()
        })
        async function getAds() {
            try {
                await adService.getAds()
            } catch (error) {
                logger.error(error)
                Pop.error(error)
            }
        }
        return{
            ads: computed(() => AppState.ads)
        };
    },
    methods: {
        // async getAds() {
        //     logger.log('made it');
        //     try {
        //         await adService.getAds()
        //     } catch (error) {
        //         logger.error(error)
        //         Pop.error(error)
        //     }
        // }
    }
}
</script>

<style lang="scss" scoped>
    
</style>
