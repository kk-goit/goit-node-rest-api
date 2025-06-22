# goit-node-rest-api
Домашні завдання курсу Fullstack. Back End Development: Node.js. 

# Домашнє завдання. Тема 4. REST API

## GET /api/contacts 

![listContacts](imgs/01.jpg)

## GET /api/contacts/ 

### Повернення об'єкта контакту за id в json-форматі зі статусом 200 .
![getContactById](imgs/02-01.jpg)
### Повернення json з повідомленням {"message": "Not found"} зі статусом 404, якщо контакт за id не знайдено .
![id not found](imgs/02-02.jpg)

## POST /api/contacts

### Повернення json з повідомленням {"message": error.message} зі статусом 400, якщо відсутні обов'язкові поля або передані поля мають не валідне значення .
![No Name field](imgs/03-01a.jpg)
![Empty body](imgs/03-01b.jpg)
![Bad phone number](imgs/03-01c.jpg)
### Повернення новоствореного об'єкта з полями {id, name, email, phone} і статусом 201.
![addContact](imgs/03-02.jpg)

## DELETE /api/contacts/

### Повернення об'єкта видаленого контакту в json-форматі зі статусом 200 .
![removeContact](imgs/04-01.jpg)
### Повернення json з повідомленням {"message": "Not found"} зі статусом 404, якщо контакт за id не знайдено .
![id not found](imgs/04-02.jpg)

## PUT /api/contacts/ — 25 балів

### Повернення json з повідомленням {"message": "Body must have at least one field"} зі статусом 400, якщо запит на оновлення здійснено без передачі в body хоча б одного поля .
![Empty body](imgs/05-01.jpg)
### Повернення json з повідомленням {"message": error.message} зі статусом 400, якщо передані поля мають не валідне значення .
![Bad phone number](imgs/05-02.jpg)
### Повернення оновленого об'єкта контакту зі статусом 200 .
![updateContactById](imgs/05-03.jpg)
### Повернення json з повідомленням {"message": "Not found"} зі статусом 404, якщо контакт за id не знайдено .
![id not found](imgs/05-04.jpg)