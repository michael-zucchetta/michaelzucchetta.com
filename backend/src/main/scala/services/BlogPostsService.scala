package services

import java.util.UUID

import dao.BlogPostsDb
import models.{BlogPost, BlogPostRequest}

case class BlogPostsService(blogPostsDb: BlogPostsDb) {

  def insertBlogPost(blogPostRequest: BlogPostRequest, userUuid: UUID, username: String) = {
    val blogPost = BlogPost(
      postUuid = blogPostRequest.postUuid.getOrElse(UUID.randomUUID()),
      postTitle = blogPostRequest.postTitle,
      postText = blogPostRequest.postText,
      authorUuid = userUuid,
      username = username
    )
    blogPostsDb.insertBlogPost(blogPost)
  }
}
