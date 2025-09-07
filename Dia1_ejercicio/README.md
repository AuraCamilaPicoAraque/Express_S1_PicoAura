# Documentacion

En este documento presentamos la conversión del proyecto **Campuslands en Python** a **Express.js**.  
Cada comando o función que existía en el sistema original fue transformado en un **endpoint REST**, con su respectivo verbo, URL, cuerpo (si aplica), `req` y `res`.

De esta forma, estructuramos la aplicación en diferentes módulos (`campers`, `trainers`, `coordinador`), y ahora podemos interactuar con ellos mediante peticiones HTTP.

----------

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

## Campers

### 1. Obtener todos los campers

-   **Verbo:** GET
    
-   **URL:** `/campers`
    
-   **Body:** No aplica
    
-   **req:** no recibe parámetros
    
-   **res:** devuelve un arreglo con todos los campers registrados.
    

Este endpoint permite consultar la base de datos actual de campers.

```
curl http://localhost:3000/campers
``` 

----------
<br>

### 2. Crear un nuevo camper

-   **Verbo:** POST
    
-   **URL:** `/campers`
    
-   **Body (JSON):**
    

```
{  "nombres":  "Juan",  "apellidos":  "Pérez",  "direccion":  "Calle 123",  "telefonos":  3123456789,  "acudiente":  "Maria Pérez",  "jornada":  1  }
```

-   **req:** `req.body` con la información del camper
    
-   **res:** confirma la creación y devuelve el camper agregado.
    

Con esta ruta simulamos el proceso de inscripción que en Python se hacía con funciones.

```
curl -X POST http://localhost:3000/campers \
  -H "Content-Type: application/json" \
  -d '{"nombres":"Juan","apellidos":"Pérez","direccion":"Calle 123","telefonos":3123456789,"acudiente":"Maria Pérez","jornada":1}'
```

----------

<br>

### 3. Editar camper por ID

-   **Verbo:** PUT
    
-   **URL:** `/campers/:id`
    
-   **Body (JSON):**
    
```
{  "direccion":  "Nueva Calle 456"  }
```

-   **req:** `req.params.id` identifica al camper y `req.body` trae los datos a modificar
    
-   **res:** devuelve el camper actualizado.
    

De esta manera podemos simular el “Editar Camper” que existía en el menú original.

```
curl -X PUT http://localhost:3000/campers/1 \
  -H "Content-Type: application/json" \
  -d '{"direccion":"Nueva Calle 456"}'
```

----------
<br>

### 4. Eliminar camper por ID

-   **Verbo:** DELETE
    
-   **URL:** `/campers/:id`
    
-   **Body:** No aplica
    
-   **req:** `req.params.id` con el ID del camper
    
-   **res:** confirma la eliminación.
    

Aquí llevamos la opción de “Eliminar Camper” a un endpoint REST.

```
curl -X DELETE http://localhost:3000/campers/1
```

----------
<br>

## Trainers

### 1. Obtener todos los trainers

-   **Verbo:** GET
    
-   **URL:** `/trainers`
    
-   **Body:** No aplica
    
-   **req:** no recibe parámetros
    
-   **res:** devuelve la lista de trainers registrados.
    

Este endpoint permite visualizar los trainers de manera similar a como lo hacía el coordinador en el menú.

```
curl http://localhost:3000/trainers
```

----------
<br>

### 2. Crear trainer

-   **Verbo:** POST
    
-   **URL:** `/trainers`
    
-   **Body (JSON):**
    

```
{  "nombres":  "Carlos",  "jornada":  "Mañana"  }
```

-   **req:** `req.body` con los datos del trainer
    
-   **res:** devuelve el trainer agregado.
    

Simulamos aquí la opción de “Agregar nuevo trainer”.

```
curl -X POST http://localhost:3000/trainers \
  -H "Content-Type: application/json" \
  -d '{"nombres":"Carlos","jornada":"Mañana"}'
```

----------
<br>

### 3. Editar trainer

-   **Verbo:** PUT
    
-   **URL:** `/trainers/:id`
    
-   **Body (JSON):**
    

```
{  "jornada":  "Tarde"  }
``` 

-   **req:** `req.params.id` y `req.body`
    
-   **res:** trainer actualizado.
    

Implementamos la opción de “Editar Trainer” en un endpoint.

```
curl -X PUT http://localhost:3000/trainers/1 \
  -H "Content-Type: application/json" \
  -d '{"jornada":"Tarde"}'
``` 

----------

### 4. Eliminar trainer

-   **Verbo:** DELETE
    
-   **URL:** `/trainers/:id`
    
-   **Body:** No aplica
    
-   **req:** `req.params.id`
    
-   **res:** confirma la eliminación.
    

Representa el proceso de “Eliminar Trainer”.

```
curl -X DELETE http://localhost:3000/trainers/1
```

----------
<br>


## Coordinador

### 1. Ver campers y trainers

-   **Verbo:** GET
    
-   **URL:** `/coordinador`
    
-   **Body:** No aplica
    
-   **req:** no recibe parámetros
    
-   **res:** devuelve campers y trainers registrados.
    

Reproduce la opción del coordinador de visualizar la base de datos de estudiantes y trainers.

```
curl http://localhost:3000/coordinador
```

----------
<br>

### 2. Crear nueva ruta

-   **Verbo:** POST
    
-   **URL:** `/coordinador/rutas`
    
-   **Body (JSON):**
    

```
{  "nombre":  "Ruta FullStack",  "modulos":  ["HTML",  "CSS",  "JavaScript",  "Node.js"]  }
```

-   **req:** `req.body` con el nombre de la ruta y sus módulos
    
-   **res:** confirma creación de la ruta.
    

Es el equivalente a la función de “Agregar nueva ruta” en Python.

```
curl -X POST http://localhost:3000/coordinador/rutas \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Ruta FullStack","modulos":["HTML","CSS","JavaScript","Node.js"]}'
```

----------
<br>

### 3. Asignar camper a grupo

-   **Verbo:** POST
    
-   **URL:** `/coordinador/grupos`
    
-   **Body (JSON):**
    

```
{  "camperId":  1,  "grupo":  "G1"  }
```

-   **req:** `req.body` con el id del camper y el grupo
    
-   **res:** confirma asignación.
    

Simulamos la funcionalidad de “Agregar camper a un grupo disponible”.

----------
<br>

## Notas finales

-   Todas las rutas devuelven JSON ordenado gracias a la configuración:
    
    `app.set("json spaces", 2);` 
    
    <br>
    
-   Los datos se guardan en:
    
    `/data/BaseDatosCampus.json
    /data/notas.json
    /data/grupos.json` 
    
    <br>
    
De esta manera, logramos convertir cada funcionalidad del menú de Python en endpoints REST en Express, manteniendo la lógica original pero adaptada al ecosistema web.