drop database if exists BiteRight;

create database BiteRight;
use BiteRight;


create table Producer(
	producer_id int not null,
    producer_name varchar(255),
    primary key(producer_id)
);

create table Food(
	food_id int not null auto_increment,
	food_name varchar(255),
    barcode_data varchar(255),
    producer_id int,
    estimated_price float,
    net_weight float,
    
	primary key(food_id),
    foreign key(producer_id) references Producer(producer_id)
);


create table Nutrition(
	nutrition_id int not null auto_increment,
    nutrition_name varchar(255),
    primary key(nutrition_id)
);


create table Ingredient(
	ingredient_id int not null auto_increment,
    ingredient_name varchar(255),
    lifestyle enum('Normal', 'Vegetarian', 'Vegan'),
    ingredient_category enum('Fruit', 'Vegetable', 'Dairy', 'Meat', 'Fish'),
    primary key(ingredient_id)
);

create table Substitute_Ingredient(
	substitute_ingredient_id int not null auto_increment,
    to_be_substituted_id int,
    substituent_id int,
    primary key(substitute_ingredient_id),
    foreign key(to_be_substituted_id) references Ingredient(ingredient_id),
    foreign key(substituent_id) references Ingredient(ingredient_id)
);


create table Food_Nutrition(
	food_id int,
    nutrition_id int,
	amount float,
	primary key(food_id, nutrition_id),
    foreign key(food_id) references Food(food_id),
    foreign key(nutrition_id) references Nutrition(nutrition_id)
);


create table Food_Ingredient(
	food_id int,
    ingredient_id int,
    amount float,
    primary key(food_id, ingredient_id),
	foreign key(food_id) references Food(food_id),
    foreign key(ingredient_id) references Ingredient(ingredient_id)
);


create table User(
	user_id int not null auto_increment,
    first_name varchar(255),
    last_name varchar(255),
    height float,
    weight float,
    age int,
    gender varchar(255),
    email varchar(255),
    lifestyle enum('Normal', 'Vegetarian', 'Vegan'),
    
    allergy_id int,
    
    
    
    primary key(user_id)
);

create table Allergy(
	allergy_id int not null auto_increment,
    user_id int,
    ingredient_id int,
    primary key(allergy_id),
    foreign key(user_id) references User(user_id),
    foreign key(ingredient_id) references ingredient(ingredient_id)
);

create table Consumption_History(
	consumption_history_id int not null auto_increment,
    user_id int,
    food_id int,
    time_of_consumption datetime,
    
    primary key(consumption_history_id),
    foreign key(user_id) references User(user_id),
    foreign key(food_id) references Food(food_id)
);

create table Illness(
	illness_id int not null auto_increment,
    illness_name varchar(255),
    primary key(illness_id)
);

create table User_Illness(
	user_illness_id int not null auto_increment,
    user_id int,
    illness_id int,
    primary key(user_illness_id),
    foreign key(user_id) references User(user_id),
	foreign key(illness_id) references Illness(illness_id)
);

create table Illness_Ingredient_Limitation(
	illness_ingredient_id int not null auto_increment,
    illness_id int,
    ingredient_id int,
    primary key(illness_ingredient_id),
	foreign key(illness_id) references Illness(illness_id),
	foreign key(ingredient_id) references Ingredient(ingredient_id)
);



-- create table UserAuthentication(
-- 	user_id int,
--     username varchar(255),
--     password varchar(255),
--     
--     primary key(user_id, username),
--     foreign key(user_id) references user(user_id)
-- );