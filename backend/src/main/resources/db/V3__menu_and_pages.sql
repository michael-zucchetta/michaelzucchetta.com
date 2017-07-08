create table menu (
	menu_uuid uuid not null primary key,
	title varchar(200) not null,
	component_name varchar(200) not null,
	order_in_menu smallint not null,
	active boolean not null,
	url varchar(200) not null,
	parent_uuid uuid references menu(menu_uuid),
	page_post uuid references blog_posts(post_uuid)
);

grant select, insert, update, delete on menu to michaelzucchetta;

insert into menu (menu_uuid, title, component_name, order_in_menu, active, url, parent_uuid, page_post) values ('e1ba125a-d64f-4af8-a2e2-df0546a530e7', 'Home', 'home', true, 'home.html', null, null);
insert into menu (menu_uuid, title, component_name, order_in_menu, active, url, parent_uuid, page_post) values ('a336d487-ee71-4bca-8536-c0c1c2f221ba', 'About Me', 'about-me', true, 'about-me.html', null, null);
insert into menu (menu_uuid, title, component_name, order_in_menu, active, url, parent_uuid, page_post) values ('4965713b-d9f6-4dd3-834a-9766d6994cd3', 'Blog', 'blog', true, 'blog.html', null, null);
