document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const form = document.getElementById('bookForm');
    const tipsToggle = document.getElementById('tipsToggle');
    const tipsPanel = document.getElementById('tipsPanel');
    const previewBtn = document.getElementById('previewBtn');
    const previewModal = document.getElementById('previewModal');
    const closeModal = document.getElementById('closeModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    // Campos del formulario
    const formFields = form.querySelectorAll('input, textarea, select');
    
    // === FUNCIONALIDAD DEL PANEL DE CONSEJOS ===
    if (tipsToggle && tipsPanel) {
        tipsToggle.addEventListener('click', function() {
            toggleTips();
        });
    }
    
    function toggleTips() {
        if (tipsPanel.classList.contains('hidden')) {
            tipsPanel.classList.remove('hidden');
            tipsPanel.classList.add('animate-fade-in-up');
        } else {
            tipsPanel.classList.add('hidden');
            tipsPanel.classList.remove('animate-fade-in-up');
        }
    }
    
    // === BARRA DE PROGRESO ===
    function updateProgress() {
        let filledFields = 0;
        let totalFields = formFields.length;
        
        formFields.forEach(field => {
            if (field.value.trim() !== '') {
                filledFields++;
            }
        });
        
        const percentage = Math.round((filledFields / totalFields) * 100);
        progressFill.style.width = percentage + '%';
        progressText.textContent = percentage + '% completado';
        
        // Cambiar color según el progreso
        if (percentage < 30) {
            progressFill.className = 'h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500 ease-out';
        } else if (percentage < 70) {
            progressFill.className = 'h-full bg-gradient-to-r from-yellow-500 to-orange-600 transition-all duration-500 ease-out';
        } else {
            progressFill.className = 'h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500 ease-out';
        }
    }
    
    // === VALIDACIÓN EN TIEMPO REAL ===
    formFields.forEach(field => {
        field.addEventListener('input', function() {
            validateField(this);
            updateProgress();
        });
        
        field.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    function validateField(field) {
        const formGroup = field.closest('.form-group');
        
        // Añadir verificación para evitar errores si no existe formGroup
        if (!formGroup) {
            console.error('Error: No se encontró un elemento con clase .form-group para:', field);
            return true; // Permitir continuar para evitar bloqueo
        }
        
        const value = field.value.trim();
        
        // Remover clases anteriores
        formGroup.classList.remove('valid', 'invalid');
        
        // Validaciones específicas
        if (field.hasAttribute('required') && value === '') {
            formGroup.classList.add('invalid');
            return false;
        }
        
        if (field.type === 'email' && value && !isValidEmail(value)) {
            formGroup.classList.add('invalid');
            return false;
        }
        
        if (field.name === 'titulo' && value.length < 2) {
            formGroup.classList.add('invalid');
            return false;
        }
        
        if (field.name === 'autor' && value.length < 2) {
            formGroup.classList.add('invalid');
            return false;
        }
        
        if (value !== '') {
            formGroup.classList.add('valid');
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // === VISTA PREVIA ===
    if (previewBtn && previewModal) {
        previewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showPreview();
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', hidePreview);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hidePreview);
    }
    
    // Cerrar modal al hacer clic fuera
    if (previewModal) {
        previewModal.addEventListener('click', function(e) {
            if (e.target === this) {
                hidePreview();
            }
        });
    }
    
    function showPreview() {
        // Obtener valores del formulario
        const titulo = form.querySelector('[name="titulo"]').value || 'Sin título';
        const autor = form.querySelector('[name="autor"]').value || 'Autor desconocido';
        const descripcion = form.querySelector('[name="descripcion"]').value || 'Sin descripción disponible';
        const fechaPublicacion = form.querySelector('[name="fecha_publicacion"]').value || 'Fecha no especificada';
        
        // Actualizar vista previa
        document.getElementById('previewTitle').textContent = titulo;
        document.getElementById('previewAuthor').textContent = autor;
        document.getElementById('previewDescription').textContent = descripcion;
        document.getElementById('previewDate').textContent = fechaPublicacion;
        
        // Mostrar modal
        previewModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    function hidePreview() {
        previewModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
    
    // === VALIDACIÓN DEL FORMULARIO ===
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir el envío normal del formulario
            
            let isValid = true;
            let firstInvalidField = null;
            
            formFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                    if (!firstInvalidField) {
                        firstInvalidField = field;
                    }
                }
            });
            
            if (isValid) {
                // Mostrar indicador de carga
                showLoadingState();
                
                // Obtener el token CSRF para Django
                const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
                
                // Recopilar todos los datos del formulario
                const formData = new FormData(form);
                
                // Enviar datos a Django usando fetch
                fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                    credentials: 'same-origin'
                })
                .then(response => {
                    if (response.redirected) {
                        window.location.href = response.url;
                    } else if (response.ok) {
                        window.location.href = `/libros/detalle/${window.location.pathname.split('/').filter(Boolean).pop()}/`;
                    } else {
                        throw new Error('Error del servidor: ' + response.status);
                    }
                })
                .catch(error => {
                    console.error('Error al guardar:', error);
                    resetSubmitButton();
                    showErrorMessage('Error al actualizar el libro. Por favor, inténtalo de nuevo.');
                });
            } else {
                // Si hay campos inválidos
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
                showErrorMessage('Por favor, completa todos los campos requeridos correctamente.');
            }
        });
    }
    
    function showLoadingState() {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Guardando...
        `;
    }
    
    function resetSubmitButton() {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Guardar Cambios
        `;
    }
    
    function showErrorMessage(message) {
        // Crear y mostrar notificación de error
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
        notification.innerHTML = `
            <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                ${message}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    // === ATAJOS DE TECLADO ===
    document.addEventListener('keydown', function(e) {
        // Ctrl+S para guardar
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
        
        // Escape para cerrar modal
        if (e.key === 'Escape' && !previewModal.classList.contains('hidden')) {
            hidePreview();
        }
        
        // Alt+T para mostrar/ocultar consejos
        if (e.altKey && e.key === 't') {
            e.preventDefault();
            toggleTips();
        }
        
        // Alt+P para vista previa
        if (e.altKey && e.key === 'p') {
            e.preventDefault();
            showPreview();
        }
    });
    
    // === INICIALIZACIÓN ===
    function init() {
        // Inicializar progreso
        updateProgress();
        
        // Validar campos iniciales
        formFields.forEach(field => {
            validateField(field);
        });
        
        // Log de inicialización
        console.log('📚 Formulario de editar libro inicializado');
        console.log('⌨️ Atajos disponibles:');
        console.log('💾 • Ctrl+S: Guardar cambios');
        console.log('📎 • Alt+T: Consejos');
        console.log('👁️‍🗨️ • Alt+P: Vista previa');
        console.log('❌ • Esc: Cerrar modal');
    }
    
    // Ejecutar inicialización
    init();
});