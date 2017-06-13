create table tags (
	tag_uuid uuid not null primary key
);

grant select, insert, update, delete on tags to michaelzucchetta;

create table blog_posts (
	post_uuid uuid not null primary key,
	author varchar(200) not null,
	post_title varchar(200) not null,
	post text not null,
	post_date timestamp not null,
	tags uuid references tags(tag_uuid)
);

grant select, insert, update, delete on blog_posts to michaelzucchetta;


create table blog_post_comment (
	comment_uuid uuid not null primary key,
	comment_text text not null,
	tracking_action uuid not null references tracking_actions(tracking_uuid),
	post_uuid uuid not null references blog_posts(post_uuid)
);

grant select, insert, update, delete on blog_post_comment to michaelzucchetta;
