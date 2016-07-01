name := """core-app"""

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
    "org.mongodb" %% "casbah" % "3.1.1",
    "org.slf4j" % "slf4j-simple" % "1.6.4"
)

lazy val root = project.in(file(".")).enablePlugins(PlayScala)
