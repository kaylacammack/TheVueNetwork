<template>
    <div class="row">
        <div class="col-12">
            <div class="text-center">
                <router-link v-if="account.id" :to="{ name: 'AccountProfile', params: { profileId: account.id }}">
                    <img :src="account.picture" class="picture" />
                </router-link>
            </div>
            <div>
                <p>{{ account.class }}</p>
                <p v-if="account.graduated == true"><i class=mdi mdi-account-school></i> </p>
            </div>
            <div>
                <p>{{ account.name }}</p>
            </div>
            <div>
                <button type="button" class="btn"><i class="mdi mdi-github">{{ account.github }}</i></button>
            </div>
            <div>
                <button class="btn"><i class="mdi mdi-linkedin">{{ account.linkedin }}</i></button>
            </div>
            <div>
                <button class="btn"><i class="mdi mdi-file-document-outline">{{ account.resume }}</i></button>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
    export default {
        setup() {
            return {
                account: computed(() => AppState.account)
            };
        },

    }
</script>

<style lang="scss" scoped>
    .picture {
        height: 100px;
        border-radius: 50%
    }
</style>