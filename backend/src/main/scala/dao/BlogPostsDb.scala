package dao

import cats.implicits._
import config.DbStrategy
import doobie.imports._
import doobie.postgres.imports._
import fs2.Task
import java.time.Instant
import java.util.UUID

import cats.data.NonEmptyVector
import models.{BlogPost, BlogPostComment}
import org.log4s.getLogger

case class BlogPostsDb(transactor: Transactor[Task])(implicit val dbStrategy: DbStrategy) {
  private[this] val logger = getLogger
  implicit val strategy = dbStrategy.strategy

  object sql {
    val commentsParameters = fr"""(comment_uuid, author, comment_text, tracking_action_uuid, comment_date, post_uuid)"""

    // timestamp gives problems so the type is a string
    type BlogPostRaw = (UUID, UUID, String, String, Instant, Vector[UUID], Vector[String], Vector[String], Vector[Option[String]], Vector[UUID])
    def insertBlogPost(bp: BlogPost): Update0 =
      sql"""
          insert into blog_posts
            (post_uuid, user_uuid, post_title, post_text, post_date, post_status, post_type)
              values
            (${bp.postUuid}, ${bp.authorUuid}, ${bp.postTitle}, ${bp.postText}, ${bp.postDate}, ${bp.postStatus.toString}::post_status, ${bp.postType.toString}::post_type)
         """.update

    def insertBlogComment(c: BlogPostComment): Update0 =
      (fr"""
          insert into blog_post_comments """ ++ commentsParameters ++
          fr"""values
            (${c.commentUuid}, ${c.author}, ${c.commentText}, ${c.trackingAction.trackingUuid}, ${c.commentDate}, ${c.postUuid})
         """).update

    def updateBlogPost(bp: BlogPost): Update0 =
      (fr"""
          update blog_posts
            set
                user_uuid = ${bp.authorUuid}, post_title = ${bp.postTitle}, post_text = ${bp.postText}, post_date = ${bp.postDate}, post_status = ${bp.postStatus.toString}::post_status
              where post_uuid = ${bp.postUuid}
         """).update

    val blogParameters = fr"bp.post_uuid, bp.user_uuid, bp.post_title, bp.post_text, bp.post_date"

    def readBlogPosts(blogPostUuidsOpt: Option[NonEmptyVector[UUID]]): Query0[BlogPostRaw] =
      (fr"""
          select """ ++ blogParameters ++ fr""",
            array_agg(c.comment_uuid), array_agg(c.comment_text), array_agg(c.comment_date), array_agg(c.author), array_agg(c.post_uuid)
          from blog_posts bp inner join blog_post_comments c on bp.post_uuid = c.post_uuid
          where bp.post_status = 'published'""" ++
            Fragments.andOpt(blogPostUuidsOpt.map(uuids => Fragments.in(fr"post_uuid", uuids))) ++
          fr"""group by """ ++ blogParameters ++ fr"""
          order by bp.post_date desc""" ++ {
              if (blogPostUuidsOpt.isEmpty) {
                fr"limit 5"
              } else {
                fr""
              }
          }
        ).query[BlogPostRaw]
  }

  object io {
    def insertBlogPost(bp: BlogPost) = {
      logger.info(s"query is ${sql.insertBlogPost(bp).sql}")
      for {
        insertTask <- Task.start(sql.insertBlogPost(bp).run.transact(transactor))
        insertResult <- insertTask
      } yield {
        logger.info(s"Number of rows inserted are $insertResult")
        insertResult
      }
    }

    def readBlogPosts(blogPostUuidsOpt: Option[NonEmptyVector[UUID]]): Task[Vector[sql.BlogPostRaw]] = {
      for {
        readBlogPostsTask <- Task.start(sql.readBlogPosts(blogPostUuidsOpt).vector.transact(transactor))
        readBlogPosts <- readBlogPostsTask
      } yield readBlogPosts
    }
  }

  def insertBlogPost(blogPost: BlogPost) =
    io.insertBlogPost(blogPost)

  def readBlogPosts(blogPostUuidsOpt: Option[List[UUID]]) = {
    val blogPostNonEmptyOpt = blogPostUuidsOpt.flatMap {
      case blogPostUuidHead :: blogPostUuidTail =>
        NonEmptyVector(blogPostUuidHead, blogPostUuidTail.toVector).some
      case _ =>
        None
    }
    io.readBlogPosts(blogPostNonEmptyOpt)
  }
}
