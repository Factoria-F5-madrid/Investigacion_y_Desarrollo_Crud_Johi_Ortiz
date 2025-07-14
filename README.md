# 🔎 Investigación y Desarrollo de un CRUD con Django

---

## Índice

- [¿Qué es un CRUD y cuál es su propósito en el desarrollo de aplicaciones web](#-1-qué-es-un-crud-y-cuál-es-su-propósito-en-el-desarrollo-de-aplicaciones-web)
- [¿Qué son los patrones de arquitectura en desarrollo de software](#%EF%B8%8F-2-qué-son-los-patrones-de-arquitectura-en-desarrollo-de-software)
- [¿Cómo se estructura un proyecto en Django](#-3-cómo-se-estructura-un-proyecto-en-django)
- [¿Cuál es el flujo de datos entre un formulario html y la base de datos en django](#-4-cuál-es-el-flujo-de-datos-entre-un-formulario-html-y-la-base-de-datos-en-django)
- [¿Qué herramientas o comandos ofrece django para facilitar el desarrollo de un crud](#%EF%B8%8F-5-qué-herramientas-o-comandos-ofrece-django-para-facilitar-el-desarrollo-de-un-crud)
- [¿Cómo funciona el admin de django](#-6-cómo-funciona-el-admin-de-django)
- [Instalación](#-instalación)
- [Activar modo administrador en Django](#-activar-modo-administrador-en-django)
- [Proyecto Monolítico en Django: Sistema de Gestión de Libros](./Sistema_de_Gestión_de_Libros)
---

## 🧮 1. ¿Qué es un CRUD y cuál es su propósito en el desarrollo de aplicaciones web?

<p align="center">
  <img src="https://files.realpython.com/media/What-Are-CRUD-Operations_Watermarked.b243ab2b79cb.jpg" alt="Diagrama CRUD" width="400" />
</p>

**CRUD** significa 📝 **Crear, 📖 Leer, 🔃 Actualizar y 🗑️ Eliminar** datos.  
Su propósito es facilitar la gestión de la información dentro de una app web.

> 📝 **Ejemplo:**  
> 🛒 Inventario de productos
> -  📝 **Crear:** Registrar nuevos productos en el almacén.
> -  📖 **Leer:** Ver el listado de productos y sus cantidades.
> -  🔃 **Actualizar:** Modificar datos como precio, descripción o cantidad.
> -  🗑️ **Eliminar:** Quitar productos que ya no se venden.

---

## ⛓️ 2. ¿Qué son los patrones de arquitectura en desarrollo de software?

<p align="center">
  <img src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*M22DR3WPqbWXWidYIq2GwA.png" alt="Diagrama CRUD" width="400" />
</p>

Un patrón arquitectónico es una solución general y reutilizable a un problema común en la arquitectura de software dentro de un contexto dado. Los patrones arquitectónicos son similares al patrón de diseño de software pero tienen un alcance más amplio. Es decir, son modelos que organizan cómo se estructuran y comunican las partes de una aplicación.	

---

### 🧩 ¿Qué es el patrón MVC (Modelo–Vista–Controlador)?
<p align="center">
  <img src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*OP0CS6O5Sb66jpc-H-IuRQ.png" alt="Diagrama CRUD" width="400" />
</p>
Este patrón, también conocido como patrón MVC, divide una aplicación interactiva en 3 partes, como

- **Modelo:** Gestiona los datos y la lógica.
- **Vista:** Presenta la información al usuario.
- **Controlador:** Recibe las acciones del usuario y decide qué mostrar.

Esto se hace para separar las representaciones internas de información de las formas en que se presenta y acepta la información del usuario. Desacopla los componentes y permite la reutilización eficiente del código

### 📌 Uso

• Arquitectura para aplicaciones World Wide Web en los principales lenguajes de programación.

• Marcos web como Django y Rails .

---

### 🧩 ¿Qué es el patrón MVT (Modelo–Vista–Template)?
<p align="center">
  <img src="https://hektorprofe.github.io/cdn/django/46.png" alt="Diagrama CRUD" width="400" />
</p>
Este patrón, una ligera variación del MVC, divide una aplicación web en 3 partes interconectadas:

- **Modelo:** Estructura y gestiona los datos.
- **Vista:** Procesa la lógica y responde a las peticiones.
- **Template:** Define cómo se muestra la información (HTML).
  
El objetivo es separar la lógica de negocio de la presentación, lo que facilita el desarrollo y mantenimiento al desacoplar los componentes.

### 📌 Uso
• Arquitectura principal del framework web Django.

• Ideal para aplicaciones web donde la presentación (HTML) y la lógica (Python) están claramente separadas.


---

### 🔄 Diferencias entre MVC y MVT
<p align="center">
  <img src="https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F2vv6hsfnl3uj1dpqfrsd.png" alt="Diagrama CRUD" width="400" />
</p>

<div align="center">

| MVC               | MVT                  |
|-------------------|---------------------|
| Vista = HTML      | Template = HTML     |
| Controlador       | Vista (lógica)      |
| Modelo            | Modelo              |

</div>



• En MVC, la Vista es responsable de la presentación y el Controlador del flujo de la app.

• En MVT, la lógica de flujo la lleva la Vista y la presentación la lleva el Template.


---

### 💡 ¿Cuál de estos dos patrones se usa en Django?

**Django utiliza el patrón MVT.**

- El framework gestiona los Templates (HTML), Modelos (datos), y Vistas (lógica).
---

## 📚 3. ¿Cómo se estructura un proyecto en Django?

<p align="center">
  <img src="https://parzibyte.me/blog/wp-content/uploads/2019/06/Estructura-del-proyecto-de-Django.png" alt="Diagrama CRUD" width="200" />
</p>

- **Modelos (`models.py`):** Definen la estructura de los datos.
- **Vistas (`views.py`):** Procesan las solicitudes y preparan la respuesta (normalmente renderizando templates).
- **Templates (`templates/`):** Son archivos HTML con variables dinámicas que muestran la información al usuario.
- **URLs (`urls.py`):** Enrutamiento de peticiones hacia las vistas, es decir, conectan las URLs a las vistas correspondientes.
- **Static files (`static/`):** Archivos estáticos como CSS, JavaScript e imágenes que no cambian con frecuencia.

#### 🏷️ ¿Para qué se usa el signo `{{ }}` en los templates?

Se utiliza para mostrar variables y datos en el HTML generado por Django.

### 🖼️ Archivos estáticos en Django (Static Files)

Los archivos estáticos son aquellos que no cambian dinámicamente, como CSS, JavaScript e imágenes.

#### Configuración de archivos estáticos

En tu archivo `settings.py` encontrarás:

```python
# Ruta base donde Django busca archivos estáticos
STATIC_URL = '/static/'

# Directorios adicionales donde Django busca archivos estáticos
STATICFILES_DIRS = [
    BASE_DIR / "static",
]

# Directorio donde se recolectan todos los archivos estáticos en producción
STATIC_ROOT = BASE_DIR / 'staticfiles'
```

#### Uso de archivos estáticos en templates

Para usar archivos estáticos en tus templates, primero carga la etiqueta `static`:

```html
{% load static %}

<!DOCTYPE html>
<html>
<head>
    <title>Mi Página</title>
    <link rel="stylesheet" href="{% static 'css/style.css' %}">
    <script src="{% static 'js/script.js' %}"></script>
</head>
<body>
    <img src="{% static 'images/logo.png' %}" alt="Logo">
    <!-- Contenido de la página -->
</body>
</html>
```

### 🎨 Implementación de CSS y HTML en Django

#### Estructura de templates

Los templates en Django siguen un sistema de herencia que permite reutilizar código HTML:

```
templates/
    base.html           # Template base con estructura común
    app_name/           # Templates específicos de cada aplicación
        home.html
        detail.html
```

#### Herencia de templates

**base.html**:
```html
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}Mi Sitio{% endblock %}</title>
    {% load static %}
    <link rel="stylesheet" href="{% static 'css/main.css' %}">
    {% block extra_css %}{% endblock %}
</head>
<body>
    <header>
        <!-- Contenido del encabezado -->
    </header>
    
    <main>
        {% block content %}
        <!-- El contenido específico irá aquí -->
        {% endblock %}
    </main>
    
    <footer>
        <!-- Contenido del pie de página -->
    </footer>
    
    {% block scripts %}{% endblock %}
</body>
</html>
```

**home.html**:
```html
{% extends "base.html" %}

{% block title %}Inicio - Mi Sitio{% endblock %}

{% block content %}
    <h1>Bienvenido a mi sitio</h1>
    <p>Este es el contenido específico de la página de inicio</p>
{% endblock %}
```

### 🚀 Frameworks de Frontend para Django

Django se integra fácilmente con varios frameworks de frontend:

#### 1. Bootstrap
- **Integración:** Fácil mediante archivos estáticos o CDN
- **Ventajas:** Rápido desarrollo, componentes predefinidos, responsive
- **Uso:**
```html
{% load static %}
<link href="{% static 'bootstrap/css/bootstrap.min.css' %}" rel="stylesheet">
<!-- O usando CDN -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```

#### 2. Tailwind CSS
- **Integración:** Requiere configuración con herramientas de build como webpack
- **Ventajas:** Altamente personalizable, enfoque utility-first
- **Uso:** Se configura con Node.js y se compila para producción

#### 3. React/Vue.js/Angular
- **Enfoque 1: Frontend separado**
  - Django como API REST (Django REST Framework)
  - Frontend completamente separado que consume la API
  
- **Enfoque 2: Integración en templates**
  - Montar componentes React/Vue en templates específicos de Django
  - Ejemplo (Vue.js):
  ```html
  {% extends 'base.html' %}
  {% load static %}
  
  {% block content %}
  <div id="app">
    <vue-component></vue-component>
  </div>
  {% endblock %}
  
  {% block scripts %}
  <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
  <script src="{% static 'js/vue-components.js' %}"></script>
  <script>
    new Vue({
      el: '#app'
    })
  </script>
  {% endblock %}
  ```

#### 4. HTMX
- **Integración:** Perfecta con Django, sin necesidad de APIs
- **Ventajas:** Permite interactividad tipo SPA sin escribir JavaScript
- **Uso:**
```html
{% extends 'base.html' %}
{% load static %}

{% block extra_css %}
<script src="https://unpkg.com/htmx.org"></script>
{% endblock %}

{% block content %}
<button hx-get="/api/datos/" hx-target="#resultado">
  Cargar Datos
</button>
<div id="resultado"></div>
{% endblock %}
```

### Recomendaciones para proyectos Django

1. Para proyectos pequeños o de complejidad media:
   - Bootstrap o Tailwind CSS + HTMX

2. Para aplicaciones de gran escala o alta interactividad:
   - Django REST Framework + React/Vue.js/Angular

---

## 🔃 4. ¿Cuál es el flujo de datos entre un formulario HTML y la base de datos en Django?

<p align="center">
  <img src="https://perezmartin.es/wp-content/uploads/2014/07/diagrama.png" alt="Diagrama CRUD" width="400" />
</p>

1. El usuario envía el formulario HTML y lo envía.
2. Django recibe la solicitud (POST).
3. La vista procesa los datos, valida el formulario con ModelForm.
4. Si es válido, guarda/modifica/elimina el dato en la base de datos a través del modelo.
5. Django responde redirigiendo o mostrando el resultado un mensaje al usuario.

---

## 🛠️ 5. ¿Qué herramientas o comandos ofrece Django para facilitar el desarrollo de un CRUD?

<p align="center">
  <img src="https://i.ytimg.com/vi/e6PkGDH4wWA/maxresdefault.jpg" alt="Diagrama CRUD" width="400" />
</p>

## Comandos Principales

### Gestión de Proyectos
- `startproject`: Crea un nuevo proyecto Django.
- `startapp`: Crea una nueva aplicación dentro del proyecto.
- `check`: Verifica si hay problemas en el proyecto.
- `version`: Muestra la versión de Django instalada.

### Base de Datos
- `makemigrations`: Crea scripts de migración basados en los cambios en los modelos.
- `migrate`: Aplica migraciones a la base de datos.
- `sqlmigrate`: Muestra el SQL que generará una migración.
- `showmigrations`: Muestra el estado de todas las migraciones.
- `squashmigrations`: Combina múltiples migraciones en una sola.
- `dbshell`: Inicia el cliente de línea de comandos de la base de datos.
- `inspectdb`: Genera modelos Python basados en tablas existentes.

### Administración
- `createsuperuser`: Crea un usuario administrador.
- `changepassword`: Cambia la contraseña de un usuario.
- `shell`: Inicia el shell interactivo de Python con el entorno Django.
- `sendtestemail`: Envía un correo electrónico de prueba.
- `createcachetable`: Crea las tablas de caché en la base de datos.
- `clearsessions`: Limpia las sesiones expiradas.

### Desarrollo y Servidor
- `runserver`: Inicia el servidor de desarrollo.
- `collectstatic`: Recopila archivos estáticos en una sola ubicación.
- `findstatic`: Encuentra la ubicación de un archivo estático.

### Internacionalización
- `makemessages`: Crea o actualiza archivos de mensajes para traducción.
- `compilemessages`: Compila archivos de mensajes .po a .mo.

### Pruebas
- `test`: Ejecuta las pruebas para todas las aplicaciones instaladas.
- `testserver`: Ejecuta un servidor de desarrollo con datos de prueba.

### Seguridad
- `check --deploy`: Comprueba la configuración de seguridad para despliegue.
- `diffsettings`: Muestra diferencias entre settings actuales y por defecto.

### Mantenimiento
- `flush`: Elimina todos los datos de la base de datos.
- `dumpdata`: Exporta el contenido de la base de datos en formato JSON/YAML/XML.
- `loaddata`: Carga datos desde un archivo fixture.

## Opciones Comunes

La mayoría de comandos aceptan estas opciones:
- `--settings`: Especifica el módulo de configuración.
- `--pythonpath`: Agrega directorios al path de Python.
- `--traceback`: Muestra tracebacks completos en caso de error.
- `--verbosity`: Establece el nivel de detalle de la salida (0, 1, 2, 3).
- `--no-color`: No colorear la salida.

## Uso Básico

```bash
python manage.py <comando> [opciones]
```

## ❔ 6. ¿Cómo funciona el Admin de Django?

<p align="center">
  <img src="https://miro.medium.com/v2/resize:fit:1400/0*XZT1Na65YX5mexhH.jpg" alt="Diagrama CRUD" width="400" />
</p>

- 📁 Ver, agregar, editar y eliminar registros de cualquier modelo.
- 📋 Administrar usuarios, grupos y permisos.
- 🔍 Buscar y filtrar registros.
- ✒️ Personalizar la visualización de modelos.
- 📃 Solo necesitas registrar tus modelos en `admin.py` para gestionarlos desde la interfaz.

  ## 🚀 Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tuusuario/tu-repo.git
   cd tu-repo
   ```

2. **Crea un entorno virtual y actívalo:**
   ```bash
   python -m venv venv
   source venv/bin/activate   # En Windows: venv\Scripts\activate
   ```

3. **Instala las dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Realiza migraciones:**
   ```bash
   python manage.py migrate
   ```

---

## 🛂 Activar modo administrador en Django

1. **Crea el superusuario:**
   ```bash
   python manage.py createsuperuser
   ```
   (Ingresa usuario, correo y contraseña cuando se te solicite)

2. **Ejecuta el servidor:**
   ```bash
   python manage.py runserver
   ```

3. **Accede al panel de administración:**  
   Ve a [http://localhost:8000/admin](http://localhost:8000/admin) e ingresa tus credenciales.


---
> ⭐ **¡Con Django es fácil crear aplicaciones CRUD robustas y escalables!**  

¡Hey! Espero que esta guía te haya sido útil en tu viaje con Django. Recuerda que todos pasamos por esa fase de aprendizaje, así que no te desanimes si algo no funciona a la primera.

Si te quedas atascado, tienes dudas o simplemente quieres charlar sobre algún aspecto de Django, escríbeme sin pensarlo dos veces. Me encanta ayudar y compartir experiencias con otros desarrolladores.

¡Mucho ánimo con tus proyectos y feliz código! 😊

P.D.: No olvides tomar descansos y celebrar tus pequeñas victorias en el camino.
<p align="center">
  <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3hwcjltZWRtOWQyNTY0NHZsMWRzejc0bHVhbjJzM3c1aHA4d3FxdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/VekcnHOwOI5So/giphy.gif" alt="Happy coding gif" width="300" />
</p>

