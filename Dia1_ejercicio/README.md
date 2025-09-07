## Cómo ejecutar


Inicia el servidor en modo desarrollo:

```
npm run .
```
<br>

El servidor quedará corriendo en:
```
http://localhost:3000
```

<br>


##  Campers

#### Ver todos los campers

```
curl http://localhost:3000/campers
```


---
<br>

####  Agregar un camper

```
curl -X POST http://localhost:3000/campers \
  -H "Content-Type: application/json" \
  -d '{
    "nombres": "Juan",
    "apellidos": "Pérez",
    "direccion": "Calle 123",
    "telefonos": 3123456789,
    "acudiente": "Maria Pérez",
    "jornada": 1
  }'
```

---
<br>

####  Editar un camper (ejemplo: ID = 1)

```
curl -X PUT http://localhost:3000/campers/1 \
  -H "Content-Type: application/json" \
  -d '{"direccion": "Nueva Calle 456"}'
``` 

---
<br>

####  Eliminar un camper (ejemplo: ID = 1)
```
curl -X DELETE http://localhost:3000/campers/1
```


<br><br>


## Trainers

####  Ver todos los trainers

```
curl http://localhost:3000/trainers
```
----------
<br>

####  Agregar un trainer

```
curl -X POST http://localhost:3000/trainers \
  -H "Content-Type: application/json" \
  -d '{
    "nombres": "Carlos",
    "jornada": "Mañana"
  }'
```
----------
<br>

<br>

## Coordinador

####  Ver campers y trainers

```
curl http://localhost:3000/coordinador
``` 

####  Agregar ruta nueva

```
curl -X POST http://localhost:3000/coordinador/rutas \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ruta FullStack",
    "modulos": ["HTML", "CSS", "JavaScript", "Node.js"]
  }'
```