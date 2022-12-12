import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class AdService {
    async getAds() {
        const res = await api.get('api/ads')
        logger.log('[Got Ads]', res.data)
        AppState.ads = res.data
    }
}

export const adService = new AdService()