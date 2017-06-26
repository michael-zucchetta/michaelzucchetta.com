import NativePackagerHelper._
import com.typesafe.sbt.packager.archetypes.JavaAppPackaging
import com.typesafe.sbt.packager.docker._

enablePlugins(JavaAppPackaging)

inThisBuild(
  List(
    scalaVersion := "2.12.2",
    organization := "com.michaelzucchetta",
    scalacOptions ++= Seq(
      "-deprecation",
      "-feature",
      "-language:existentials",
      "-language:higherKinds",
      "-language:implicitConversions",
      "-language:postfixOps",
      "-unchecked",
      "-Xlint",
      "-Yno-adapted-args",
      "-Ywarn-dead-code",
      "-Ywarn-numeric-widen",
      "-Ywarn-value-discard",
      "-Xfuture"
    )
  ))

val circeVersion = "0.8.0"
val doobieVersion = "0.4.1"
val http4sVersion = "0.17.0-M3"


lazy val root = project
  .in(file("./backend/"))
  .enablePlugins(JavaAppPackaging, GitVersioning, DockerPlugin)
  .settings(
    git.useGitDescribe := true,
    name := "michaelzucchetta.com",
    libraryDependencies ++= Seq(
      "co.fs2"                     %% "fs2-core"                       % "0.9.6",
      "co.fs2"                     %% "fs2-cats"                       % "0.3.0",
      "com.typesafe"               %  "config"                         % "1.3.1",
      "com.nulab-inc"              %% "scala-oauth2-core"              % "1.3.0",
      "io.circe"                   %% "circe-core"                     % circeVersion,
      "io.circe"                   %% "circe-generic"                  % circeVersion,
      "io.circe"                   %% "circe-parser"                   % circeVersion,
      "io.circe"                   %% "circe-generic-extras"           % circeVersion,
      "org.http4s"                 %% "http4s-dsl"                     % http4sVersion,
      "org.http4s"                 %% "http4s-blaze-server"            % http4sVersion,
      "org.http4s"                 %% "http4s-blaze-client"            % http4sVersion,
      "org.http4s"                 %% "http4s-circe"                   % http4sVersion,
      "ch.qos.logback"             %  "logback-classic"                % "1.2.3",
      "ch.qos.logback"             %  "logback-core"                   % "1.2.3",
      "net.logstash.logback"       %  "logstash-logback-encoder"       % "4.9",
      "org.log4s"                  %% "log4s"                          % "1.3.4",
      "org.typelevel"              %% "cats-effect"                    % "0.3",

      "org.tpolecat"               %% "doobie-hikari-cats"             % doobieVersion,
      "org.tpolecat"               %% "doobie-postgres-cats"           % doobieVersion,
      "org.tpolecat"               %% "doobie-core-cats"               % doobieVersion,

      "org.tpolecat"               %% "doobie-scalatest-cats"          % doobieVersion  % "test",
      "org.scalatest"              %% "scalatest"                      % "3.0.0"        % "test",
      "org.mockito"                %  "mockito-all"                    % "1.10.19"      % "test"
    ),
    dockerBaseImage := "arch_final",
    dockerExposedPorts := Seq(8080, 80),
    javaOptions in Universal ++= Seq(
      "-J-Xms500m",
      "-J-Xmx500m"
    ),
    mappings in Universal ++= directory("./dist"),
    mappings in Universal += file("./server.js") -> "server.js",
    mappings in Universal += file("./docker-run.sh") -> "docker-run.sh",
    dockerCommands ++= Seq(
    	// setting the run script executable
      Cmd("RUN", "ls -tr"),
      Cmd("RUN", "chmod +x docker-run.sh"),
      Cmd("RUN", "npm link request"),
      Cmd("RUN", "npm link fs"),
      Cmd("RUN", "npm link http"),
      Cmd("RUN", "npm link express"),
      Cmd("RUN", "npm link mime"),
      Cmd("RUN", "npm link compression")
    ),
    dockerEntrypoint := Seq("/opt/docker/docker-run.sh")
)

lazy val client = project
  .in(file("./frontend/"))
  .enablePlugins(ScalaJSPlugin)
  .settings(
    name := "michaelzucchetta.com-client",
    libraryDependencies ++= Seq(
      "org.scala-js"     %%% "scalajs-dom"     % "0.9.1",
      "com.greencatsoft" %%% "scalajs-angular" % "0.7"
    )
  )
