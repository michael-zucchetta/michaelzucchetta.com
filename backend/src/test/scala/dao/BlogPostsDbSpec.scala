package dao

import java.util.UUID

import doobie.scalatest.QueryChecker
import doobie.util.iolite.IOLite
import doobie.util.transactor.DriverManagerTransactor
import fs2.Task
import org.scalatest.{Matchers, WordSpec}
import java.time.Instant

import config.WebConfig
import models.{BlogPost, BlogPostComment, TrackingAction}

class BlogPostsDbSpec extends WordSpec with Matchers with QueryChecker {

  val transactor = DriverManagerTransactor[IOLite](
    "org.postgresql.Driver", "jdbc:postgresql:michaelzucchetta", "michaelzucchetta", ""
  )

  val blogPostsDb = WebConfig.blogPostsServiceStream.runLog.unsafeRun()(0).blogPostsDb

  "BlogSpot insert blog post query " should {
    "compile" in {
      check(blogPostsDb.sql.insertBlogPost(BlogPost(UUID.randomUUID(), "author", "title", "text", Instant.now(), Vector.empty[BlogPostComment])))
    }
  }

  "BlogSpot read blog post query " should {
    "compile" in {
      check(blogPostsDb.sql.readLastBlogPosts)
    }
  }

  "BlogSpot insert blog post comment query " should {
    "compile" in {
      val trackingAction = TrackingAction(UUID.randomUUID(), Instant.now(), "action", Some("referer"), Some("provenience"), "ipAddress", Some("country"), Some("city"))
      val blogPostComment = BlogPostComment(UUID.randomUUID(),Some("author"), "text", Instant.now(), trackingAction, UUID.randomUUID())
      check(blogPostsDb.sql.insertBlogComment(blogPostComment))
    }
  }
}
