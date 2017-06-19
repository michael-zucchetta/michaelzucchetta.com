create table tags (
	tag_uuid uuid not null primary key
);

grant select, insert, update, delete on tags to michaelzucchetta;

create table blog_posts (
	post_uuid uuid not null primary key,
	author varchar(300) not null,
	post_title varchar(300) not null,
	post_text text not null,
	post_date timestamp not null,
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

create extension pgcrypto;

/* PW hash stored with SELECT crypt('YourPasswordGoesHere', gen_salt('bf', 10));*/
create table users (
	user_uuid uuid not null primary key,
	email varchar(200) not null,
	user varchar(200) not null,
	password_hash varchar(300) not null
);

grant select, insert, update, delete on users to michaelzucchetta;
