# Sistema de Gestión de Libros

![Banner del Proyecto](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjB4N3RidGM5a3pod2tyaGd0aXJiYTB2eWF6d2kxcDl2aXp6ZTQ3YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dB6ogWRDUsMKuAWrqi/giphy.gif)

## 📚 Descripción

Un sistema completo de gestión de biblioteca digital que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para administrar un catálogo de libros. Desarrollado con Django y diseñado con Tailwind CSS para ofrecer una experiencia de usuario moderna e intuitiva.

## ✨ Características principales

- **Crear libros**: Formulario interactivo con validación de datos y barra de progreso
- **Ver libros**: Listado de libros con opciones de filtrado y búsqueda
- **Detalles de libro**: Vista detallada de cada libro con toda su información
- **Actualizar libros**: Edición completa de la información de libros existentes
- **Eliminar libros**: Eliminación segura con confirmación
- **Interfaz responsiva**: Diseño adaptable a diferentes dispositivos

## 🛠️ Tecnologías utilizadas

- **Backend**: Django 4.2.11
- **Frontend**: HTML5, CSS3, JavaScript
- **Diseño**: Tailwind CSS
- **Base de datos**: SQLite
- **Validación**: Django Forms

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/johiortiz/sistema-gestion-libros.git
cd sistema-gestion-libros
```

2. Crea y activa un entorno virtual:
```bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
```

3. Instala las dependencias:
```bash
pip install -r requirements.txt
```

4. Realiza las migraciones:
```bash
python manage.py migrate
```

5. Inicia el servidor:
```bash
python manage.py runserver
```

6. Accede a la aplicación en tu navegador:
```
http://127.0.0.1:8000/libros/
```

## 📝 Uso del sistema

### Crear un nuevo libro

1. Accede a "Crear Libro" desde la barra de navegación
2. Completa todos los campos del formulario
3. Usa el botón "Vista Previa" para revisar la información
4. Haz clic en "Guardar Libro" para crear el registro

### Ver y gestionar libros

1. La página principal muestra el listado de todos los libros
2. Utiliza las opciones de filtrado para encontrar libros específicos
3. Haz clic en un libro para ver sus detalles
4. Usa los botones de acción para editar o eliminar

## 📂 Estructura del proyecto

```
sistema_libros/
├── libros/
│   ├── static/
│   │   ├── css/
│   │   └── js/
│   ├── templates/
│   │   └── libros/
│   │       ├── crear_libro.html
│   │       ├── detalle_libro.html
│   │       ├── editar_libro.html
│   │       ├── eliminar_libro.html
│   │       └── lista_libros.html
│   ├── models.py
│   ├── forms.py
│   ├── urls.py
│   └── views.py
├── sistema_libros/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
└── db.sqlite3
```

## 📸 Capturas de pantalla

### Página principal - Lista de libros
![Lista de libros](https://via.placeholder.com/800x450/e0e0e0/333333?text=Lista+de+Libros)

### Formulario de creación de libros
![Crear libro](https://via.placeholder.com/800x450/e0e0e0/333333?text=Crear+Libro)

### Vista detallada de libro
![Detalle libro](https://via.placeholder.com/800x450/e0e0e0/333333?text=Detalle+Libro)

## 🌟 Características destacadas

- **Barra de progreso interactiva**: Indica el porcentaje de completitud del formulario
- **Panel de consejos**: Ayuda al usuario con recomendaciones para crear registros
- **Vista previa**: Permite visualizar cómo quedará el libro antes de guardarlo
- **Validación en tiempo real**: Feedback inmediato al usuario sobre errores
- **Diseño moderno**: Interfaz atractiva con animaciones y transiciones suaves
- **Mensajes de confirmación**: Notificaciones para acciones exitosas y errores

## 👨‍💻 Autor

**Johi Ortiz** - Desarrollado como parte del curso de Desarrollo Web Avanzado.

📆 Fecha: 12 de julio de 2025

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

---

### 📊 Estado del proyecto

✅ Versión 1.0 completada con todas las funcionalidades CRUD implementadas.

### 🔜 Próximas mejoras

- Implementación de autenticación de usuarios
- Categorización de libros por géneros
- Sistema de reseñas y valoraciones
- Exportación de datos a PDF/CSV
- Modo oscuro