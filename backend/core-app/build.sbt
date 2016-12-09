name := """core-app"""

version := "1.0-SNAPSHOT"

scalaVersion := "2.11.8"

lazy val commonSettings = Seq(
    scalaVersion := "2.11.8"
)
lazy val http4sVersion = "0.14.6"

val reactiveMongoVer = "0.11.14"

// add tests to classpath
scalaSource in Test := baseDirectory.value / "tests"

libraryDependencies ++= Seq(
    "org.mongodb" %% "casbah" % "3.1.1",
    "javax.inject" % "javax.inject" % "1",
    "org.mindrot" % "jbcrypt" % "0.3m",
    "be.objectify" %% "deadbolt-scala" % "2.5.0",
    "org.reactivemongo" %% "play2-reactivemongo" % reactiveMongoVer,
    "com.typesafe.scala-logging" %% "scala-logging" % "3.4.0",
    "ch.qos.logback" % "logback-classic" % "1.1.3",
    "org.http4s" %% "http4s-dsl" % http4sVersion,
    "org.http4s" %% "http4s-blaze-server" % http4sVersion,
    "org.http4s" %% "http4s-blaze-client" % http4sVersion,
    "org.scalatest" %% "scalatest" % "3.0.0" % "test",
    "org.mockito" % "mockito-all" % "1.10.19" % "test"
  )


lazy val root = project.in(file("."))
  .settings()
  .enablePlugins(PlayScala)
