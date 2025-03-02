# Fabricantes

El servicio de gestión de fabricantes permite crear fabricantes para el modulo de proveedores.

## Índice
1. [Ejecución](#ejecución)

## Ejecución
1. Manual
	- Ubicarse en la raiz de trayectos /Fabricantes
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
```

	- Ubicarse en la raiz del proyecto donde se encuentra el archivo ```docker-compose.yml```
	- Ejecutar <docker-compose up -d>

## Autor

* [Wilsón Alarcón]
