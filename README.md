# 🌱 Investigación y Desarrollo de un CRUD con Django

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

#### 🏷️ ¿Para qué se usa el signo `{{ }}` en los templates?

Se utiliza para mostrar variables y datos en el HTML generado por Django.

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

- `startapp`: Crea una nueva aplicación dentro del proyecto.
- `makemigrations`: Crea scripts de migración para actualizar la base de datos según los modelos.
- `migrate`: Aplica las migraciones a la base de datos.
- `runserver`: Inicia el servidor de desarrollo local.
- `ModelForm`: Clase que facilita la creación de formularios basados en modelos.
- `admin`: Panel de administración automático para gestionar modelos.

---

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
