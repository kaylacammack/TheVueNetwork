import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostService {
    async getPosts() {
        const res = await api.get('api/posts')
        logger.log('[Got Posts]', res.data)
        AppState.posts = res.data.posts
    }
}
export const postService = new PostService()