# FrontIncidents

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.21.

# Front Incidents

Aplicación web desarrollada con **Angular 18** para la gestión y administración de incidencias. La aplicación consume una API REST desarrollada en el backend y permite realizar operaciones de consulta, creación, actualización y visualización de incidencias.

El proyecto utiliza una arquitectura basada en componentes y servicios de Angular, permitiendo separar la lógica de presentación de la lógica encargada de la comunicación con el backend.

---

## 📋 Tabla de contenidos

* [Descripción](#-descripción)
* [Tecnologías utilizadas](#-tecnologías-utilizadas)
* [Requisitos previos](#-requisitos-previos)
* [Instalación](#-instalación)
* [Estructura del proyecto](#-estructura-del-proyecto)
* [Configuración del backend](#-configuración-del-backend)
* [Comunicación con el backend](#-comunicación-con-el-backend)
* [Endpoints utilizados](#-endpoints-utilizados)
* [Funcionalidades](#-funcionalidades)
* [Ejecución del proyecto](#-ejecución-del-proyecto)
* [Compilación para producción](#-compilación-para-producción)
* [Servidor SSR](#-servidor-ssr)
* [Bootstrap](#-bootstrap)
* [SweetAlert2](#-sweetalert2)
* [Solución de problemas](#-solución-de-problemas)
* [Autor](#-autor)

---

# 📌 Descripción

**Front Incidents** es una aplicación frontend desarrollada con Angular 18 que permite gestionar incidencias mediante una interfaz web.

La aplicación se comunica con un backend mediante una API REST utilizando `HttpClient` de Angular.

El sistema permite trabajar con las siguientes operaciones:

* 📋 Consultar listado de incidencias.
* 🔎 Consultar una incidencia por su identificador.
* ➕ Registrar nuevas incidencias.
* ✏️ Editar incidencias existentes.
* 👁️ Visualizar información de una incidencia.
* 🔔 Mostrar mensajes de confirmación y error mediante SweetAlert2.
* 📱 Utilizar una interfaz responsive mediante Bootstrap 5.

La arquitectura general de comunicación es:

```text
┌─────────────────────────┐
│                         │
│       Angular 18        │
│      Front Incidents    │
│                         │
│  Componentes / Forms    │
│           │             │
│           ▼             │
│       Services          │
│           │             │
│           ▼             │
│      HttpClient         │
│                         │
└────────────┬────────────┘
             │
             │ HTTP / REST
             │
             ▼
┌─────────────────────────┐
│                         │
│       Backend API       │
│     Spring Boot         │
│                         │
│       Controller        │
│           │             │
│           ▼             │
│        Service          │
│           │             │
│           ▼             │
│       Repository        │
│           │             │
│           ▼             │
│        MySQL            │
│                         │
└─────────────────────────┘
```

---

# 🛠️ Tecnologías utilizadas

## Frontend

* Angular 18
* TypeScript
* HTML5
* CSS3
* Bootstrap 5.3.8
* RxJS
* SweetAlert2

# 💻 Requisitos previos

Antes de ejecutar el proyecto es necesario tener instalado:

* Node.js
* npm
* Angular CLI 18
* Git

Se recomienda utilizar una versión compatible de Node.js con Angular 18.

Para comprobar las versiones instaladas:

```bash
node -v
```

```bash
npm -v
```

```bash
ng version
```

---

# 📥 Instalación

## 1. Clonar el repositorio

Clonar el proyecto desde Git:

```bash
git clone URL_DEL_REPOSITORIO
```

Entrar al directorio:

```bash
cd front-incidents
```

---

## 2. Instalar dependencias

Ejecutar:

```bash
npm install
```

Este comando instalará todas las dependencias definidas en el archivo:

```text
package.json
```

# ▶️ Ejecución del proyecto

Para iniciar el servidor de desarrollo:

```bash
npm start
```

O:

```bash
ng serve
```

La aplicación estará disponible normalmente en:

```text
http://localhost:4200
```

El frontend debe estar ejecutándose junto con el backend.

Ejemplo:

```text
Frontend Angular
http://localhost:4200

Backend Spring Boot
http://localhost:8080

API
http://localhost:8080/api/incidents
```

---

# 📁 Estructura del proyecto

Una estructura recomendada para el proyecto es:

```text
front-incidents/
│
├── src/
│   │
│   ├── app/
│   │   │
│   │   ├── components/
│   │   │   │
│   │   │   ├── incident-list/
│   │   │   │   ├── incident-list.component.ts
│   │   │   │   ├── incident-list.component.html
│   │   │   │   └── incident-list.component.css
│   │   │   │
│   │   │   ├── incident-create/
│   │   │   │   ├── incident-create.component.ts
│   │   │   │   ├── incident-create.component.html
│   │   │   │   └── incident-create.component.css
│   │   │   │
│   │   │   ├── incident-edit/
│   │   │   │   ├── incident-edit.component.ts
│   │   │   │   ├── incident-edit.component.html
│   │   │   │   └── incident-edit.component.css
│   │   │   │
│   │   │   └── incident-detail/
│   │   │       ├── incident-detail.component.ts
│   │   │       ├── incident-detail.component.html
│   │   │       └── incident-detail.component.css
│   │   │
│   │   ├── models/
│   │   │   └── incident.model.ts
│   │   │
│   │   ├── services/
│   │   │   └── incident.service.ts
│   │   │
│   │   ├── app.routes.ts
│   │   ├── app.config.ts
│   │   └── app.component.ts
│   │
│   ├── assets/
│   │
│   ├── styles.css
│   └── index.html
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```
La interfaz debe coincidir con la estructura JSON que devuelve el backend.

Por ejemplo:

```json
{
  "id": 1,
  "title": "Error en sistema",
  "description": "El sistema presenta un error al iniciar sesión",
  "status": "OPEN",
  "priority": "HIGH",
  "createdAt": "2026-07-30T10:30:00"
}
```


# 🌐 Endpoints utilizados

Ejemplo de API REST:

| Método | Endpoint              | Descripción                   |
| ------ | --------------------- | ----------------------------- |
| GET    | `/api/incidents`      | Obtener todas las incidencias |
| GET    | `/api/incidents/{id}` | Obtener una incidencia        |
| POST   | `/api/incidents`      | Crear una incidencia          |
| PUT    | `/api/incidents/{id}` | Actualizar una incidencia     |

Ejemplo de petición:

```http
GET http://localhost:8080/api/incidents
```

Respuesta:

```json
[
  {
    "id": 1,
    "title": "Error de conexión",
    "description": "No se puede conectar al servidor",
    "status": "OPEN",
    "priority": "HIGH"
  }
]
```

---





