# prueba-banco-solar

## Persistencia de datos
>
> Creación bd  
> ` CREATE DATABASE bancosolar;`
>
> Creación tabla usuarios  
> `CREATE TABLE usuarios (id SERIAL PRIMARY KEY, nombre VARCHAR(50),
 balance FLOAT CHECK (balance >= 0));`
>
> Creación tabla transferencia  
>`CREATE TABLE transferencias (id SERIAL PRIMARY KEY, emisor INT, receptor
INT, monto FLOAT, fecha TIMESTAMP, FOREIGN KEY (emisor) REFERENCES
usuarios(id), FOREIGN KEY (receptor) REFERENCES usuarios(id));
`
>
>

## Requerimientos
● / GET: Devuelve la aplicación cliente disponible en el apoyo de la prueba.

● /usuario POST: Recibe los datos de un nuevo usuario y los almacena en PostgreSQL.

● /usuarios GET: Devuelve todos los usuarios registrados con sus balances.

● /usuario PUT: Recibe los datos modificados de un usuario registrado y los actualiza.

● /usuario DELETE: Recibe el id de un usuario registrado y lo elimina .

● /transferencia POST: Recibe los datos para realizar una nueva transferencia. Se debe
ocupar una transacción SQL en la consulta a la base de datos.

● /transferencias GET: Devuelve todas las transferencias almacenadas en la base de
datos en formato de arreglo
