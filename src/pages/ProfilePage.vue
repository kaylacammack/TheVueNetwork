<template>
    <div v-if="profile">
        <div class="row cover-img" :style="`background-image: url('${profile.coverImg}')`">
            <div class="col-12 position-relative">
                <div class="position-absolute bottom-0 start-0">
                    <img :src="profile.picture" class="img-fluid profile-picture rounded-circle">
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <i class="mdi mdi-github">{{profile.github}}</i>
            <i class="mdi mdi-linkedin">{{profile.linkedin}}</i>
            <i class="mdi mdi-file-document-outline">{{profile.resume}}</i>
        </div>
        <h3>{{profile.class}} <span v-if="profile.graduated == true"><i class="mdi mdi-account-school"></i></span></h3>
        <h1>{{profile.name}}</h1>
        <p>{{profile.bio}}</p>
        <div v-if="account.id == profile.id" class="d-flex justify-content-end">
            <button class="btn btn-primary-outline">Edit</button>
        </div>
    </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { profileService } from "../services/ProfileService.js";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from '../AppState.js'

export default {
    setup() {
        const route = useRoute();
        async function getProfileByProfileId() {
            try {
                await profileService.getProfileByProfileId(route.params.profileId);
            } catch (error) {
                logger.error(error)
                Pop.error(error.message)
            }
        }
        onMounted(() => {
            getProfileByProfileId();
        })
        return {
            profile: computed(() => AppState.activeProfile),
            account: computed(() => AppState.account)
        }
    }
}
</script>

<style lang="scss" scoped>
    .cover-img {
        height: 30vh;
        background-size: cover;
        background-position: center;
    }
    .profile-picture {
        height: 15vh;
        width: 15vh;
    }

</style>
