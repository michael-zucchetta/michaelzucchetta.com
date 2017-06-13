package models

import io.circe.{Decoder, Encoder}

case class GeoData(
                    city: Option[String],
                    region: Option[String],
                    countryCode: Option[String],
                    countryName: Option[String]
                  )

object GeoData {
  implicit val decodeGeoData: Decoder[GeoData] =
    Decoder.forProduct4("geoplugin_city", "geoplugin_region", "geoplugin_countryCode", "geoplugin_countryName")(GeoData.apply)

  implicit val encodeGeoData: Encoder[GeoData] =
    Encoder.forProduct4("city", "region", "country_code", "country_name") { geoData =>
      (geoData.city, geoData.region, geoData.countryCode, geoData.countryName)
    }
}
