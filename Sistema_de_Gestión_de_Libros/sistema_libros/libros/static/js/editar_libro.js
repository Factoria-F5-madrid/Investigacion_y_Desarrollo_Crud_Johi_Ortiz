// editar_libro.js - Funcionalidades para la página de edición
// Desarrollado por johiortiz - 2025-07-12 23:22

document.addEventListener('DOMContentLoaded', function() {
    // Mejora estética para los campos de formulario
    const formInputs = document.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        // Añade clases al enfocar
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        // Elimina clases al perder foco
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focused');
        });
        
        // Marca campos que ya tienen valor
        if (input.value) {
            input.classList.add('has-value');
        }
        
        // Actualiza clase cuando cambia el valor
        input.addEventListener('input', function() {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
    
    // Confirmación antes de abandonar si hay cambios sin guardar
    const form = document.querySelector('form');
    let formChanged = false;
    
    formInputs.forEach(input => {
        input.addEventListener('change', function() {
            formChanged = true;
        });
    });
    
    // Alerta al usuario si intenta salir con cambios sin guardar
    const cancelButton = document.querySelector('.cancel-button');
    
    if (cancelButton) {
        cancelButton.addEventListener('click', function(event) {
            if (formChanged) {
                const confirmLeave = confirm('Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?');
                if (!confirmLeave) {
                    event.preventDefault();
                }
            }
        });
    }
    
    // Validación básica del formulario
    if (form) {
        form.addEventListener('submit', function(event) {
            let isValid = true;
            const requiredInputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('input-error');
                } else {
                    input.classList.remove('input-error');
                }
            });
            
            if (!isValid) {
                event.preventDefault();
                alert('Por favor, completa todos los campos requeridos.');
            }
        });
    }
    
    // Formatea automáticamente el ISBN
    const isbnInput = document.getElementById('id_isbn');
    if (isbnInput) {
        isbnInput.addEventListener('blur', function() {
            let isbn = this.value.replace(/[^0-9X]/g, '');
            if (isbn.length === 13) {
                // Formato ISBN-13
                this.value = isbn.replace(/(.{3})(.{1})(.{5})(.{3})(.{1})/, '$1-$2-$3-$4-$5');
            } else if (isbn.length === 10) {
                // Formato ISBN-10
                this.value = isbn.replace(/(.{1})(.{3})(.{5})(.{1})/, '$1-$2-$3-$4');
            }
        });
    }
});

// Función para mostrar un mensaje flotante
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animación de entrada
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}