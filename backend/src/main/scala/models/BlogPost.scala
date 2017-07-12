package models

import java.util.UUID
import java.time.Instant

import io.circe.Encoder
import io.circe.generic.extras.auto._

trait BlogPostType

object BlogPostType {

  case object PAGE extends EnumVal

  case object BLOG_POST extends EnumVal

  sealed trait EnumVal extends BlogPostType {
    override def toString: String = {
      this match {
        case PAGE => "page"
        case BLOG_POST => "blog_post"
      }
    }
  }

  def fromString(string: String): BlogPostType = {
    string match {
      case "page" =>
        PAGE
      case "blog_post" =>
        BLOG_POST
      case _ =>
        throw new IllegalArgumentException(s"string $string not recognized")
    }
  }
}

trait BlogPostStatus

object BlogPostStatus {

  case object DRAFT extends EnumVal

  case object PUBLISHED extends EnumVal

  case object DELETED extends EnumVal

  sealed trait EnumVal extends BlogPostStatus {
    override def toString: String = {
      this match {
        case DRAFT => "draft"
        case PUBLISHED => "published"
        case DELETED => "deleted"
      }
    }
  }

  def fromString(string: String): BlogPostStatus = {
    string match {
      case "draft" =>
        DRAFT
      case "published" =>
        PUBLISHED
      case "deleted" =>
        DELETED
      case _ =>
        throw new IllegalArgumentException(s"string $string not recognized")
    }
  }

}

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
                    postStatus: BlogPostStatus = BlogPostStatus.DRAFT,
                    postType: BlogPostType
                  )

object BlogPost {
  implicit val encodeBlogPost: Encoder[BlogPost] =
    Encoder.forProduct8("postUuid", "authorUuid", "username", "postTitle", "postText", "comments", "postStatus", "postType") { bp =>
      (bp.postUuid.toString, bp.authorUuid.toString, bp.username, bp.postTitle, bp.postText, bp.comments, bp.postStatus.toString, bp.postType.toString)
    }
}

case class BlogPostComment(
                    commentUuid: UUID = UUID.randomUUID(),
                    author: Option[String] = None,
                    commentText: String,
                    commentDate: Instant = Instant.now(),
                    trackingAction: TrackingAction,
                    postUuid: UUID
                  )


object BlogPostComment {
  implicit val encodeBlogPost: Encoder[BlogPostComment] =
    Encoder.forProduct5("commentUuid", "author", "commentText", "commentDate", "postUuid") { c =>
      (c.commentUuid.toString, c.author.getOrElse(""), c.commentText, c.commentDate.toString, c.postUuid.toString)
    }
}
