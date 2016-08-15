name := """core-app"""

version := "1.0-SNAPSHOT"

lazy val apidoc = project.settings(
  scalaVersion := "2.11.8",
  libraryDependencies += ws
)

libraryDependencies ++= Seq(
    "org.mongodb" %% "casbah" % "3.1.1",
    "org.slf4j" % "slf4j-simple" % "1.6.4",
    "javax.inject" % "javax.inject" % "1",
    "org.postgresql" % "postgresql" % "9.4.1209"
)



lazy val root = project.in(file(".")).enablePlugins(PlayScala)
