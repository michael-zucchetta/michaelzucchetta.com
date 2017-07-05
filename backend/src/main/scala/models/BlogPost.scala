package models

import java.util.UUID
import java.time.Instant

case class BlogPostRequest(
                            postUuid: Option[UUID],
                            postTitle: String,
                            postText: String
                          )

case class BlogPost(
                    postUuid: UUID = UUID.randomUUID(),
                    authorUuid: UUID,
                    username: String,
                    postTitle: String,
                    postText: String,
                    postDate: Instant = Instant.now(),
                    comments: Vector[BlogPostComment] = Vector.empty[BlogPostComment],
                    postStatus: String = "draft"
                  )

case class BlogPostComment(
                    commentUuid: UUID = UUID.randomUUID(),
                    author: Option[String] = None,
                    commentText: String,
                    commentDate: Instant = Instant.now(),
                    trackingAction: TrackingAction,
                    postUuid: UUID
                  )
