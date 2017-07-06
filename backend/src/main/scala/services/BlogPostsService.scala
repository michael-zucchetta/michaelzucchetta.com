package services

import java.util.UUID

import dao.BlogPostsDb
import models.{BlogPost, BlogPostRequest}
import org.log4s.getLogger

case class BlogPostsService(blogPostsDb: BlogPostsDb) {
  private[this] val logger = getLogger

  def insertBlogPost(blogPostRequest: BlogPostRequest, userUuid: UUID, username: String) = {
    val blogPost = BlogPost(
      postUuid = blogPostRequest.postUuid.getOrElse(UUID.randomUUID()),
      postTitle = blogPostRequest.postTitle,
      postText = blogPostRequest.postText,
      authorUuid = userUuid,
      username = username
    )
    logger.info(s"Blog post being inserted is $blogPost")
    blogPostsDb.insertBlogPost(blogPost)
  }
}
