# Nombre del Proyecto

El servicio de gestión de trayectos permite crear trayectos (rutas) para ser usados por las publicaciones.

## Índice

1. [Estructura](#estructura)
2. [Servicios Externos](#Servicios Externos)
3. [Ejecución](#ejecución)
4. [Pruebas](#pruebas)
5. [Autor](#autor)

## Estructura

```
└── 📁 trayectos
    └── 📁 crud                 
        └── route.py             # Operaciones CRUD (Create, Read, Update, Delete) para los modelos.
	└── 📁 models                
        └── route.py         	 # Modelos de la aplicación.
	└── 📁 tests                 # Carpeta de tests unitaros
        ├── __init__.py
        ├── conftest.py
        └── test_endpoints.py.py
    ├── .python-version          # Versión de Python utilizada en el proyecto.
    ├── config.py                # Configuración general de la aplicación, incluyendo variables de entorno.   
    ├── database.py              # Configuración y conexión a la base de datos.
    ├── Dockerfile               # Instrucciones para crear la imagen Docker de la aplicación.
    ├── main.py                  # Punto de entrada principal de la aplicación FastAPI.
    ├── Pipfile                  # Lista de dependencias gestionadas por Pipenv.
    ├── Pipfile.lock             # Versión bloqueada de las dependencias para asegurar reproducibilidad.
    ├── README.md                # Documentación principal del proyecto (Usted está aquí).    
    └── schemas.py               # Esquemas de la aplicación utilizados para validación y serialización de datos.

```

## Servicios Externos

Esta api consume un servicio externo para la gestion de usuarios y autenticacion, para mayor informacion puede visitar https://github.com/MISW-4301-Desarrollo-Apps-en-la-Nube/proyecto-202414/wiki/Gesti%C3%B3n-de-Usuarios

## Ejecución
1. Manual
	- Ubicarse en la raiz de trayectos /trayectos
	- Ejecutar ```pipenv shell``` para crear un entorno virtual
	- Ejecutar ```pipenv install``` para instalar las dependencias
	- Ejecutar ```uvicorn main:app --reload``` para subir la aplicación
	- Puede visitar http://127.0.0.1:8000/
2. Docker
    Las siguinetes variables de entorno deben estar configuradas en los contenedores.
```bash
    DB_USER: Usuario de la base de datos de Postgres
    DB_PASSWORD: Contraseña de la base de datos de Postgres
    DB_HOST: Host de la base de datos de Postgres
    DB_PORT: Puerto de la base de datos de Postgres
    DB_NAME: Nombre de la base de datos de Postgres
    USERS_PATH: Host donde se esta ejecutando el microservicio de usuarios en formato <PROTOCOL>://<HOST>:<PORT>, Ej: http://   localhost:3000, http://users (PORT es opcional)
```

	- Ubicarse en la raiz del proyecto donde se encuentra el archivo ```docker-compose.yml```
	- Ejecutar <docker-compose up -d>

## Pruebas

Para ejecutar las pruebas ejecuta los siguientes pasos

1. Instalar pytest:  ```pip install pytest```
2. Verificar la instalación: ```pip show pytest```
3. Ejecutar pytest ```pytest tests/```

si quieres ejecutar la cobertura de las pruebas usa el comando ```pytest --cov=. tests/```

## Autor

* [Wilsón Alarcón]
