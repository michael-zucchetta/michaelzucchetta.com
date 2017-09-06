package services

import java.util.UUID

import dao.PostsDb
import fs2.Task
import models.{Post, PostRequest, PostStatus, PostType}
import org.log4s.getLogger

case class PostsService(postsDb: PostsDb) {
  private[this] val logger = getLogger

  def upsertPost(postRequest: PostRequest, userUuid: UUID, username: String): Task[Map[String, String]] = {
    val postStatus = if (postRequest.postPublished) {
      PostStatus.PUBLISHED
    } else {
      PostStatus.DRAFT
    }

    def buildPost(postUuid: UUID) =
      Post(
        postUuid = postUuid,
        postTitle = postRequest.postTitle,
        postText = postRequest.postText,
        authorUuid = userUuid,
        username = username,
        postType = PostType.fromString(postRequest.postType),
        postStatus = postStatus
      )

    postRequest.postUuid match {
      case Some(postUuid) =>
        val post = buildPost(postUuid)
        logger.info(s"Post being updated: $post")
        postsDb.updatePost(post, postRequest.menuUuid)
      case _ =>
        val post = buildPost(UUID.randomUUID())
        logger.info(s"Post being inserted: $post")
        postsDb.insertPost(post, postRequest.menuUuid)
    }
  }

  def readPage(postUuid: UUID) = {
    postsDb.readPage(postUuid)
  }
}
