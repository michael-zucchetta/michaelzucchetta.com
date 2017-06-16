package models

import java.util.UUID
import java.time.Instant

case class BlogPost(
                    postUuid: UUID = UUID.randomUUID(),
                    author: String,
                    postTitle: String,
                    postText: String,
                    postDate: Instant = Instant.now(),
                    comments: Vector[BlogPostComment]
                  )

case class BlogPostComment(
                    commentUuid: UUID = UUID.randomUUID(),
                    author: Option[String] = None,
                    commentText: String,
                    commentDate: Instant = Instant.now(),
                    trackingAction: TrackingAction,
                    postUuid: UUID
                  )
