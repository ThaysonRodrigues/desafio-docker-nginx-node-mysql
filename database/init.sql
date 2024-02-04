use nodedb;

create table people(
    id int not null auto_increment,
    name varchar(255),
    primary key (id)
);

insert into people (name) values ('João'), ('Carla'), ('Jose');