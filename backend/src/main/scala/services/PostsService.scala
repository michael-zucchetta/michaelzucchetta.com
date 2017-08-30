package services

import java.util.UUID

import dao.PostsDb
import models.{Post, PostRequest, PostStatus, PostType}
import org.log4s.getLogger

case class PostsService(postsDb: PostsDb) {
  private[this] val logger = getLogger

  def insertPost(postRequest: PostRequest, userUuid: UUID, username: String) = {
    val postStatus = if (postRequest.postPublished) {
      PostStatus.PUBLISHED
    } else {
      PostStatus.DRAFT
    }
    val post = Post(
      postUuid = postRequest.postUuid.getOrElse(UUID.randomUUID()),
      postTitle = postRequest.postTitle,
      postText = postRequest.postText,
      authorUuid = userUuid,
      username = username,
      postType = PostType.fromString(postRequest.postType),
      postStatus = postStatus
    )
    logger.info(s"Blog post being inserted is $post")
    /* TODO
        should return timestamp and post uuid
     */
    postsDb.insertPost(post, postRequest.menuUuid)
  }

  def readPage(postUuid: UUID) = {
    postsDb.readPage(postUuid)
  }
}
