create table tracking_users (
  tracking_uuid uuid not null primary key,
  site_referer varchar(200),
  provenience varchar(200),
  ip_address varchar(50) not null,
  country varchar(50),
  city varchar(50)
)