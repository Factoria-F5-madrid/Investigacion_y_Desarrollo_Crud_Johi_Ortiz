// eliminar_libro.js - Funcionalidades para la página de eliminación
// Desarrollado por johiortiz - 2025-07-12 23:25

document.addEventListener('DOMContentLoaded', function() {
    // Botón de eliminación con confirmación adicional
    const deleteForm = document.querySelector('.delete-form');
    const deleteButton = document.getElementById('confirmDeleteBtn');
    
    if (deleteForm && deleteButton) {
        deleteForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Efecto visual en el botón
            deleteButton.classList.add('confirming');
            
            // Cambia el texto del botón para indicar la necesidad de confirmación
            const originalText = deleteButton.innerHTML;
            deleteButton.innerHTML = `
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5C2.57 17.333 3.532 19 5.072 19z"></path>
                </svg>
                ¿Estás completamente seguro?
            `;
            
            // Establecer temporizador para restablecer el botón si no se confirma
            const resetTimer = setTimeout(() => {
                deleteButton.innerHTML = originalText;
                deleteButton.classList.remove('confirming');
            }, 3000);
            
            // Configurar confirmación al hacer clic nuevamente
            const confirmHandler = function() {
                clearTimeout(resetTimer);
                deleteButton.removeEventListener('click', confirmHandler);
                
                // Mostrar animación de carga
                deleteButton.innerHTML = `
                    <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Eliminando...
                `;
                
                // Enviar el formulario después de una breve pausa para mostrar la animación
                setTimeout(() => {
                    deleteForm.submit();
                }, 500);
            };
            
            deleteButton.addEventListener('click', confirmHandler);
        });
    }
    
    // Efecto para la tarjeta de información del libro
    const bookInfoCard = document.querySelector('.book-info-card');
    if (bookInfoCard) {
        bookInfoCard.addEventListener('mouseenter', function() {
            this.style.borderColor = '#ef4444';
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'all 0.3s ease';
        });
        
        bookInfoCard.addEventListener('mouseleave', function() {
            this.style.borderColor = '#e5e7eb';
            this.style.transform = 'scale(1)';
        });
    }
    
    // Añadir estilos para el efecto de pulso en el icono de advertencia
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
        }
        .warning-icon svg {
            animation: pulse 2s infinite;
        }
        .confirming {
            background-color: #b91c1c !important;
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);
});