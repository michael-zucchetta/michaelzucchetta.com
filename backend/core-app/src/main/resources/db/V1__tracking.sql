create table tracking_actions (
  tracking_uuid uuid not null primary key,
  action_date timestamp not null,
  action_type varchar(200) not null,
  site_referer varchar(200),
  provenience varchar(200),
  ip_address varchar(50) not null,
  country varchar(50),
  city varchar(50)
)