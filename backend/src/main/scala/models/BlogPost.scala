package models

import java.util.UUID
import java.time.Instant

import models.BlogPostType.BlogPostType

object BlogPostType extends Enumeration {
  type BlogPostType = Value
  val PAGE = Value("Page")
  val BLOG_POST = Value("BlogPost")
}

object BlogPostStatus extends Enumeration {
  type BlogPostStatus = Value
  val DRAFT = Value("Draft")
  val PUBLISHED = Value("Published")
  val DELETED = Value("Deleted")
}

case class BlogPostRequest(
                            postUuid: Option[UUID],
                            postTitle: String,
                            postText: String,
                            postType: Option[BlogPostType]
                          )
import BlogPostStatus._
import BlogPostType._
case class BlogPost(
                    postUuid: UUID = UUID.randomUUID(),
                    authorUuid: UUID,
                    username: String,
                    postTitle: String,
                    postText: String,
                    postDate: Instant = Instant.now(),
                    comments: Vector[BlogPostComment] = Vector.empty[BlogPostComment],
                    postStatus: BlogPostStatus = BlogPostStatus.DRAFT,
                    postType: BlogPostType
                  )

case class BlogPostComment(
                    commentUuid: UUID = UUID.randomUUID(),
                    author: Option[String] = None,
                    commentText: String,
                    commentDate: Instant = Instant.now(),
                    trackingAction: TrackingAction,
                    postUuid: UUID
                  )
