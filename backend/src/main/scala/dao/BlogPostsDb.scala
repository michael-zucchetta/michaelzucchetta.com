package dao

import config.DbStrategy
import doobie.imports._
import doobie.postgres.imports._

import fs2.Task
import java.time.Instant
import java.util.UUID
import models.{BlogPost, BlogPostComment}
import org.log4s.getLogger
import java.sql.Timestamp

case class BlogPostsDb(transactorTask: Task[Transactor[Task]])(implicit val dbStrategy: DbStrategy) {
  private[this] val logger = getLogger

  object sql {
    val commentsParameters = fr"""(comment_uuid, author, comment_text, tracking_action_uuid, comment_date, post_uuid)"""
    implicit val (unliftedUUIDArrayType,    liftedUUIDArrayType)    = boxedPair[java.util.Instant]   ("instant", "_instant")
    // does not work
    type BlogPostRaw = (UUID, Seq[Instant]) //(UUID, String, String, String, Instant, Vector[UUID], Vector[String], Vector[Instant])//, Vector[Option[String]])
    def insertBlogPost(bp: BlogPost): Update0 =
      sql"""
          insert into blog_posts
            (post_uuid, author, post_title, post, post_date)
              values
            (${bp.postUuid}, ${bp.author}, ${bp.postTitle}, ${bp.postText}, ${bp.postDate}) 
         """.update

    def insertBlogComment(c: BlogPostComment): Update0 = 
      (fr"""
          insert into blog_post_comments """ ++ commentsParameters ++
          fr"""values
            (${c.commentUuid}, ${c.author}, ${c.commentText}, ${c.commentDate}, ${c.trackingAction.trackingUuid}, ${c.postUuid})
         """).update

    def readLastBlogPosts(): Query0[BlogPostRaw] =
      sql"""
          select (bp.post_uuid, bp.author, bp.post_title, bp.post_text, bp.post_date, array_agg(comment_uuid), array_agg(author), array_agg(comment_text), array_agg(comment_date))
              from blog_posts bp, blog_post_comments c on bp.post_uuid = c.post_uuid
              order by bp.post_date > desc, c.comment_date desc
            limit 5
         """.query[BlogPostRaw]
  }

  object io {
  
  }
}
