# mascotasPerdidas



###  
 
# Mascotas perdidas - Programación Avanzada

El proyecto tiene 2 carpetas

mascotas_react-master: Frontend desarrollado en react.

mascotas_node-master: Node para backend.

## Guía de Instalación

### Node con npm versión 13+

Seguir la guía de instalación desde el sitio oficial [nodejs.org](https://nodejs.org/)

### Mongo

Podemos usar docker

```bash
docker run -d --name mascotas-mongo -d -p 27017:27017 mongo:4.0.18-xenial
```


### Redis

Podemos usar docker

```bash
docker run -d --name mascotas-redis -d -p 6379:6379 redis:5.0.9-buster
```

## Ejecución

### Backend

Abrir ventana de comandos en la carpeta mascotas_node-master y ejecutar :

```bash
npm install
npm start
```


### Frontend

Abrir ventana de comandos en la carpeta mascotas_react-master y ejecutar:

```bash
npm install
npm start
```

Desde un browser debemos abrir [localhost:4200](http://localhost:4200/)
