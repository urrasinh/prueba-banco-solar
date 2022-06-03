CREATE DATABASE bancosolar;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    balance FLOAT CHECK (balance >= 0)
);


CREATE TABLE transferencias (
    id SERIAL PRIMARY KEY,
    emisor INT,
    receptor INT,
    monto FLOAT,
    fecha TIMESTAMP,
    FOREIGN KEY (emisor) REFERENCES usuarios(id),
     FOREIGN KEY (receptor) REFERENCES usuarios(id)
);

INSERT INTO usuarios (nombre, balance) VALUES ('Jose' 1000);
INSERT INTO transferencia (emisor, receptor, monto) VALUES (1, 3, 1000);




SELECT * FROM transferencias INNER JOIN usuarios ON transferencias.emisor = usuarios.id;