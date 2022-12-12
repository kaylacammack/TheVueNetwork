export class Post {
    constructor(data) {
        this.body = data.body
        this.createdAt = data.createdAt
        this.creator = data.creator
        this.creatorId = data.creatorId
        this.imgUrl = data.imgUrl
        this.likeIds = data.likeIds
        this.likes = data.likes
        this.updatedAt = data.updatedAt
        this.__v = data.__v
    }
}