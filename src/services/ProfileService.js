import { AppState } from "../AppState"
import { Account } from "../models/Account"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProfileService {
    async getProfileByProfileId(profileId) {
        const res = await api.get('api/profiles/' + profileId)
        logger.log('[get profile]', res.data)
        AppState.activeProfile = new Account(res.data)
    }
}
export const profileService = new ProfileService()