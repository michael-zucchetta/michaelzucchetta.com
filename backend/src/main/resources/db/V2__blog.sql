create table tags (
	tag_uuid uuid not null primary key
);

grant select, insert, update, delete on tags to michaelzucchetta;

/*create extension pgcrypto;*/

/* PW hash stored with SELECT crypt('YourPasswordGoesHere', gen_salt('bf', 10), 1);*/
/*insert into users (user_uuid, email, username, password_hash) values ('808b3093-9865-460a-a094-a3ecc8b6d062', '', '', crypt('pw', gen_salt('bf', 10)));*/
create table users (
	user_uuid uuid not null primary key,
	email varchar(200) not null,
	username varchar(200) not null,
	password_hash varchar(300) not null,
	client_id varchar(300) not null
);

grant select, insert, update, delete on users to michaelzucchetta;


create type post_status as enum ('draft', 'published', 'deleted');

create table blog_posts (
	post_uuid uuid not null primary key,
	author varchar(300) not null,
	post_title varchar(300) not null,
	post_text text not null,
	post_date timestamp not null,
	post_status post_status not null,	
	tags uuid references tags(tag_uuid),
	user_uuid uuid not null references users(user_uuid)
);

grant select, insert, update, delete on blog_posts to michaelzucchetta;


create table blog_post_comments (
	comment_uuid uuid not null primary key,
	author varchar(200),
	comment_text text not null,
	tracking_action_uuid uuid not null references tracking_actions(tracking_uuid),
	comment_date timestamp not null,
	post_uuid uuid not null references blog_posts(post_uuid),
	user_uuid uuid references users(user_uuid)
);

grant select, insert, update, delete on blog_post_comments to michaelzucchetta;

/* such as about me */
create table page_posts (
	page_post uuid not null primary key,
	post_title varchar(300),
	post_text text not null,
	post_date text not null,
	user_uuid uuid not null references users(user_uuid)
);

grant select, insert, update, delete on page_posts to michaelzucchetta;

create table auth_codes (
	user_uuid uuid not null references users(user_uuid),
	timestamp_inserted timestamp not null default now(),
	expired boolean not null default false,
	redirect_url varchar(200) not null,
	auth_code varchar(200) not null
);

grant select, insert, update, delete on auth_codes to michaelzucchetta;
