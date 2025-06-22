# goit-node-rest-api
Домашні завдання курсу Fullstack. Back End Development: Node.js. 

# Тема 6. PostgresSQL та Sequelize. Домашня робота

## Підключеня до БД та створеня таблиці 
```sql
CREATE TABLE public.contacts (
	"id" varchar NOT NULL,
	"name" varchar NOT NULL,
	email varchar NOT NULL,
	phone varchar NOT NULL,
	favorite boolean DEFAULT false,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
	CONSTRAINT contacts_pk PRIMARY KEY (id)
);
```
### наповнення таблиці первинними значеннями
```sql
INSERT INTO public.contacts VALUES
 ('AeHIrLTr6JkxGE6SN-0Rw', 'Allen Raymond', 'nulla.ante@vestibul.co.uk', '(992) 914-3792', false, now(), now()),
 ('qdggE76Jtbfd9eWJHrssH', 'Chaim Lewis', 'dui.in@egetlacus.ca', '(294) 840-6685', false, now(), now()),
 ('drsAJ4SHPYqZeG-83QTVW', 'Kennedy Lane', 'mattis.Cras@nonenimMauris.net', '(542) 451-7038', false, now(), now());
```

![Table contacts in DB](imgs/01.jpg)

## Створення маршруту PATCH /api/contacts/favorite
![Add to favorits](imgs/02a.jpg)
![id not found](imgs/02b.jpg)


