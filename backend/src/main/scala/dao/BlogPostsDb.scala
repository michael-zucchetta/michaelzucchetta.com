package dao

import java.sql.Timestamp

import config.DbStrategy
import doobie.imports._
import doobie.postgres.imports._
import fs2.Task
import java.time.Instant
import java.util.UUID

import models.{BlogPost, BlogPostComment}
import org.log4s.getLogger

case class BlogPostsDb(transactor: Transactor[Task])(implicit val dbStrategy: DbStrategy) {
  private[this] val logger = getLogger

  object sql {
    val commentsParameters = fr"""(comment_uuid, author, comment_text, tracking_action_uuid, comment_date, post_uuid)"""

    // timestamp gives problems so the type is a string
    type BlogPostRaw = (UUID, String, String, String, Instant, Vector[UUID], Vector[String], Vector[String], Vector[Option[String]], Vector[UUID])
    def insertBlogPost(bp: BlogPost): Update0 =
      sql"""
          insert into blog_posts
            (post_uuid, author, post_title, post_text, post_date, post_status)
              values
            (${bp.postUuid}, ${bp.author}, ${bp.postTitle}, ${bp.postText}, ${bp.postDate}, 'draft') 
         """.update

    def insertBlogComment(c: BlogPostComment): Update0 = 
      (fr"""
          insert into blog_post_comments """ ++ commentsParameters ++
          fr"""values
            (${c.commentUuid}, ${c.author}, ${c.commentText}, ${c.trackingAction.trackingUuid}, ${c.commentDate}, ${c.postUuid})
         """).update

    val blogParameters = fr"bp.post_uuid, bp.author, bp.post_title, bp.post_text, bp.post_date"

    def readLastBlogPosts(): Query0[BlogPostRaw] =
      (fr"""
          select """ ++ blogParameters ++ fr""",
            array_agg(c.comment_uuid), array_agg(c.comment_text), array_agg(c.comment_date), array_agg(c.author), array_agg(c.post_uuid)
          from blog_posts bp inner join blog_post_comments c on bp.post_uuid = c.post_uuid
          where bp.post_status = 'published'
          group by """ ++ blogParameters ++ fr"""
          order by bp.post_date desc
          limit 5
         """).query[BlogPostRaw]
  }

  object io {
  
  }
}
