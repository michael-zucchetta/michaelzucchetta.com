name := """core-app"""

version := "1.0-SNAPSHOT"

scalaVersion := "2.11.8"

lazy val commonSettings = Seq(
    scalaVersion := "2.11.8"
)

val reactiveMongoVer = "0.11.14"

libraryDependencies ++= Seq(
    "org.mongodb" %% "casbah" % "3.1.1",
    "org.slf4j" % "slf4j-simple" % "1.6.4",
    "javax.inject" % "javax.inject" % "1",
    "org.mindrot" % "jbcrypt" % "0.3m",
    "be.objectify" %% "deadbolt-scala" % "2.5.0",
    "org.reactivemongo" %% "play2-reactivemongo" % reactiveMongoVer
)


lazy val root = project.in(file("."))
  .enablePlugins(PlayScala)
