package dao

import config.DbStrategy
import doobie.imports._
import doobie.postgres.pgtypes._

import fs2.Task
import models.{BlogSpot, BlogPostComment}
import org.log4s.getLogger

case class BlogPostsDb(transactorTask: Task[Transactor[Task]])(implicit val dbStrategy: DbStrategy) {
  private[this] val logger = getLogger

  object sql {
    def insertBlogPost(bp: BlogSpot): Update0 =
      sql"""
          insert into blog_posts
            (post_uuid, author, post_title, post, post_date)
              values
            (${bp.postUuid}, ${bp.author}, ${bp.postTitle}, ${bp.postText}, ${bp.postDate}) 
         """.update

    def insertBlogComment(c: BlogPostComment): Update0 = 
      sql"""
          insert into blog_post_comments
            (comment_uuid, author, comment_text, tracking_action_uuid, comment_date, post_uuid)
              values
            (${c.commentUuid}, ${c.author}, ${c.commentText}, ${c.commentDate}, ${c.trackingAction.trackingUuid}, ${c.postUuid})
            
         """
    def readBlogPosts(): Query0[Vector[BlogSpot]] = 
      sql"""
          
         """
  }

  object io {
  
  }
}
