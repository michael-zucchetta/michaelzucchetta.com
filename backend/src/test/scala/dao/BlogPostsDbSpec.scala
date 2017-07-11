package dao

import java.util.UUID

import doobie.scalatest.QueryChecker
import doobie.util.iolite.IOLite
import doobie.util.transactor.DriverManagerTransactor
import org.scalatest.{Matchers, WordSpec}
import java.time.Instant

import cats.data.NonEmptyVector
import config.WebConfig
import models._

class BlogPostsDbSpec extends WordSpec with Matchers with QueryChecker {

  val transactor = DriverManagerTransactor[IOLite](
    "org.postgresql.Driver", "jdbc:postgresql:michaelzucchetta", "michaelzucchetta", ""
  )

  val blogPostsDb = WebConfig.blogPostsServiceStream.runLog.unsafeRun()(0).blogPostsDb

  val blogPost = BlogPost(UUID.randomUUID(), UUID.randomUUID(), "username", "title", "text", Instant.now(), Vector.empty[BlogPostComment], BlogPostStatus.DRAFT, BlogPostType.PAGE)

  "BlogPostsDb insert blog post query " should {
    "compile" in {
      check(blogPostsDb.sql.insertBlogPost(blogPost))
    }
  }

  "BlogPostsDb read blog post query " should {
    "compile" in {
      check(blogPostsDb.sql.readBlogPosts(Some(NonEmptyVector(UUID.randomUUID(), Vector(UUID.randomUUID())))))
    }
  }

  "BlogPostsDb query for updating a blog post" should {
    "compile" in {
      check(blogPostsDb.sql.updateBlogPost(blogPost))
    }
  }

  "BlogPostsDb query for reading a single post" should {
    "compile" in {
      check(blogPostsDb.sql.readPage(UUID.randomUUID()))
    }
  }


  "BlogPostsDb insert blog post comment query " should {
    "compile" in {
      val trackingAction = TrackingAction(UUID.randomUUID(), Instant.now(), "action", Some("referer"), Some("provenience"), "ipAddress", Some("country"), Some("city"))
      val blogPostComment = BlogPostComment(UUID.randomUUID(),Some("author"), "text", Instant.now(), trackingAction, UUID.randomUUID())
      check(blogPostsDb.sql.insertBlogComment(blogPostComment))
    }
  }
}
