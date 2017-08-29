package services

import java.util.UUID

import dao.BlogPostsDb
import models.{BlogPost, BlogPostRequest, BlogPostType}
import org.log4s.getLogger

case class PostsService(blogPostsDb: BlogPostsDb) {
  private[this] val logger = getLogger

  def insertBlogPost(blogPostRequest: BlogPostRequest, userUuid: UUID, username: String) = {
    val blogPost = BlogPost(
      postUuid = blogPostRequest.postUuid.getOrElse(UUID.randomUUID()),
      postTitle = blogPostRequest.postTitle,
      postText = blogPostRequest.postText,
      authorUuid = userUuid,
      username = username,
      postType = BlogPostType.fromString(blogPostRequest.postType)
    )
    logger.info(s"Blog post being inserted is $blogPost")
    /* TODO
        should return timestamp and post uuid
     */
    blogPostsDb.insertBlogPost(blogPost)
  }

  def readPage(postUuid: UUID) = {
    blogPostsDb.readPage(postUuid)
  }
}
