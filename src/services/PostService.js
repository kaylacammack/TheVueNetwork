import { AppState } from "../AppState"
import { Post } from "../models/Post"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class PostService {
    async getPosts() {
        const res = await api.get('api/posts')
        logger.log('[Got Posts]', res.data)
        AppState.posts = res.data.posts
    }

    async toggleLikePost(postId) {
        const res = await api.post(`api/posts/${postId}/like`, AppState.account)
        const postIndex = AppState.posts.findIndex(post => post.id === postId)
        AppState.posts.splice(postIndex, 1, res.data)
    }

    async createPost(postData) {
        const res = await api.post('api/posts', postData)
        logger.log('[Create Posts]', res.data)
        AppState.posts.unshift(res.data)
    }

    async deletePost(creatorId) {
        const res = await api.delete('api/posts/' + creatorId)
        logger.log('[Delete Post]', res.data)
        const postIndex = AppState.posts.findIndex(post => post.id === creatorId)
        AppState.posts.splice(postIndex, 1)
    }

    async searchPosts(search) {
        
        const res = await api.get('api/posts', { params: search })
        logger.log('[Search Posts]', res.data)
        AppState.posts = res.data.posts.map(p => new Post(p))
        
    }
}
export const postService = new PostService()