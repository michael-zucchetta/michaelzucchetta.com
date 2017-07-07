create table menu (
	menu_uuid uuid not null primary key,
	title not null varchar(200),
	component_name not null varchar(200),
	order not null integer,
	active not null boolean,
	url not null varchar(200),
	parent_uuid not null references(menu_uuid),
	page_post uuid references blog_posts(post_uuid)
);
