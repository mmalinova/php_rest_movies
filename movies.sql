/*
Дадена е база данни за филми и артисти: movies.sql
съдържаща таблиците: artists, movies и movies_artists.

1.	Да се създаде базата данни и да се покажат всички артисти в HTML таблица. (оценка 3)
	a.	В рутера на сървъра добавете [GET] /artists, 
		който да листва артистите в JSON.
	b.	В клиента  при стартиране на приложението прочетете горния URL 
		и рендерирайте данните за артистите в HTML. 
		Получения HTML монтирайте в горната лява клетка на интерфейса.

2.	Да се покажат всички филми за избран артист, при клик върху името му. (оценка 4)
	a.	В рутера на сървъра добавете [GET] /artists/{ID}/movies, 
		който да листва филмите за избрания артист, 
		както и данните на самия артист в JSON.
	b.	В клиента при клик на името на артиста прочетете горния URL с 
		коректното ID на артиста и изобразете HTML таблица с филмите долу вляво.

3.	Да се направи форма за редактиране на данните за избран артист. (оценка 5)
	a.	В рутера на сървъра добавете [GET] /artists/{ID} и [POST] /artists/{ID}. 
		През тях ще четете и записвате конкретен артист по зададено ID. 
		При записване проверете за празни имена на артист.
	b.	В клиента добавете EDIT линк в таблицата от точка 1. 
		При натискане на линка прочетете от сървъра данните за конкретния артист 
		и изобразете формата в интерфейса горе вдясно. 
		Формата се изпраща (submit) по POST на горното URL. 
		При успешен ъпдейт на артист презаредете таблицата от точка 1.

4.	Да се покажат всички артисти за избран филм от таблицата с филми. (оценка 6)
	a.	В рутера на сървъра добавете [GET] /movies/{ID}/artists, 
		който да листва артистите във филма със зададено ID.
	b.	В клиента името на филма нека е линк, който при натискане 
		да извиква горния URL и да визуализира таблицата с артистите в 
		клетката долу-вдясно. Над таблицата покажете името на филма и годината.
*/

# CREATE DATABASE movies;
# USE movies;

CREATE TABLE artists
(
id INTEGER NOT NULL AUTO_INCREMENT,
first_name VARCHAR(12),
last_name  VARCHAR(15),
PRIMARY KEY(ID)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10;

CREATE TABLE movies
(
id INTEGER NOT NULL AUTO_INCREMENT,
title VARCHAR(50),
yr INTEGER,
PRIMARY KEY(ID)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10;

CREATE TABLE movies_artists
(
id INTEGER NOT NULL AUTO_INCREMENT,
artist_id INTEGER,
movie_id INTEGER,
PRIMARY KEY(ID)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10;

INSERT INTO artists (id, first_name, last_name) VALUES
(1, 'Clint', 'Eastwood'),
(2, 'Sandra', 'Bullock'),
(3, 'Brad', 'Pitt'),
(4, 'Eli', 'Wallach'),
(5, 'Edward', 'Norton'),
(6, 'Morgan', 'Freeman');

INSERT INTO movies (id, title, yr) VALUES
(1, 'The Good the Bad and the Ugly', 1966),
(2, 'Gravity', 2013),
(3, 'Fight Club', 1999),
(4, 'Unforgiven', 1992);

INSERT INTO movies_artists (artist_id, movie_id) VALUES
(1, 1),
(4, 1),

(2, 2),

(3, 3),
(5, 3),

(1, 4),
(6, 4);
