document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const searchInput = document.getElementById('searchInput');
    const booksGrid = document.getElementById('booksGrid');
    const bookCards = document.querySelectorAll('.book-card');
    const statsToggle = document.getElementById('statsToggle');
    const statsPanel = document.getElementById('statsPanel');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    
    // === FUNCIONALIDAD DE BÚSQUEDA ===
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            let visibleCount = 0;
            
            bookCards.forEach(card => {
                const title = card.getAttribute('data-title');
                const author = card.getAttribute('data-author');
                const isVisible = title.includes(searchTerm) || author.includes(searchTerm);
                
                if (isVisible) {
                    card.style.display = 'block';
                    card.classList.add('book-card-animate');
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                    card.classList.remove('book-card-animate');
                }
            });
            
            // Mostrar mensaje si no hay resultados
            updateEmptyState(visibleCount, searchTerm);
        });
        
        // Efecto de pulso cuando el input está vacío
        searchInput.addEventListener('focus', function() {
            if (!this.value) {
                this.classList.add('search-input-pulse');
            }
        });
        
        searchInput.addEventListener('blur', function() {
            this.classList.remove('search-input-pulse');
        });
        
        searchInput.addEventListener('input', function() {
            this.classList.remove('search-input-pulse');
        });
    }
    
    // === PANEL DE ESTADÍSTICAS ===
    if (statsToggle && statsPanel) {
        statsToggle.addEventListener('click', function() {
            toggleStats();
        });
    }
    
    function toggleStats() {
        if (statsPanel.classList.contains('hidden')) {
            statsPanel.classList.remove('hidden');
            statsPanel.classList.add('animate-fade-in-up');
            calculateStats();
        } else {
            statsPanel.classList.add('hidden');
            statsPanel.classList.remove('animate-fade-in-up');
        }
    }
    
    // === CALCULAR ESTADÍSTICAS DINÁMICAS ===
    function calculateStats() {
        const books = document.querySelectorAll('.book-card');
        const authors = new Set();
        let totalTitleLength = 0;
        
        books.forEach(book => {
            const author = book.getAttribute('data-author');
            if (author && author !== 'autor desconocido') {
                authors.add(author);
            }
            
            const title = book.getAttribute('data-title');
            if (title) {
                totalTitleLength += title.length;
            }
        });
        
        // Actualizar elementos del DOM
        const authorsCountEl = document.getElementById('authorsCount');
        const avgTitleLengthEl = document.getElementById('avgTitleLength');
        
        if (authorsCountEl) {
            authorsCountEl.textContent = authors.size;
        }
        
        if (avgTitleLengthEl) {
            avgTitleLengthEl.textContent = books.length > 0 ? Math.round(totalTitleLength / books.length) : 0;
        }
    }
    
    // === CONFIRMACIÓN DE ELIMINACIÓN ===
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const bookTitle = this.getAttribute('data-book-title');
            const href = this.getAttribute('href');
            
            if (confirmDelete(bookTitle)) {
                window.location.href = href;
            }
        });
    });
    
    function confirmDelete(bookTitle) {
        return confirm(`¿Estás seguro de que quieres eliminar "${bookTitle}"?\n\nEsta acción no se puede deshacer.`);
    }
    
    // === ANIMACIÓN DE ENTRADA PARA LAS TARJETAS ===
    function animateCards() {
        bookCards.forEach((card, index) => {
            card.style.setProperty('--index', index);
            setTimeout(() => {
                card.classList.add('book-card-animate');
            }, index * 100);
        });
    }
    
    // === MANEJO DEL ESTADO VACÍO DURANTE LA BÚSQUEDA ===
    function updateEmptyState(visibleCount, searchTerm) {
        const existingEmptyState = document.querySelector('.search-empty-state');
        
        if (visibleCount === 0 && searchTerm && booksGrid) {
            if (!existingEmptyState) {
                const emptyStateDiv = document.createElement('div');
                emptyStateDiv.className = 'search-empty-state text-center py-16 px-5 text-gray-500 col-span-full';
                emptyStateDiv.innerHTML = `
                    <div class="text-6xl mb-4">🔍</div>
                    <h3 class="text-2xl font-medium mb-3 text-gray-400">No se encontraron resultados</h3>
                    <p class="text-lg">No hay libros que coincidan con "${searchTerm}"</p>
                    <button class="clear-search-btn mt-4 px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors">
                        Limpiar búsqueda
                    </button>
                `;
                booksGrid.appendChild(emptyStateDiv);
                
                // Agregar event listener al botón de limpiar búsqueda
                const clearBtn = emptyStateDiv.querySelector('.clear-search-btn');
                clearBtn.addEventListener('click', clearSearch);
            }
        } else if (existingEmptyState) {
            existingEmptyState.remove();
        }
    }
    
    // === FUNCIÓN PARA LIMPIAR BÚSQUEDA ===
    function clearSearch() {
        if (searchInput) {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.focus();
        }
    }
    
    // === ATAJOS DE TECLADO ===
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K para enfocar la búsqueda
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }
        
        // Escape para limpiar búsqueda
        if (e.key === 'Escape' && searchInput && searchInput.value) {
            clearSearch();
        }
        
        // Alt + S para abrir/cerrar estadísticas
        if (e.altKey && e.key === 's') {
            e.preventDefault();
            toggleStats();
        }
    });
    
    // === TOOLTIPS PARA BOTONES ===
    function setupTooltips() {
        const buttonsWithTitle = document.querySelectorAll('[title]');
        buttonsWithTitle.forEach(button => {
            let tooltip = null;
            
            button.addEventListener('mouseenter', function() {
                // Crear tooltip si no existe
                if (!tooltip) {
                    tooltip = document.createElement('div');
                    tooltip.className = 'tooltip';
                    tooltip.textContent = this.getAttribute('title');
                    this.style.position = 'relative';
                    this.appendChild(tooltip);
                }
                
                setTimeout(() => {
                    if (tooltip) {
                        tooltip.style.opacity = '1';
                    }
                }, 100);
            });
            
            button.addEventListener('mouseleave', function() {
                if (tooltip) {
                    tooltip.style.opacity = '0';
                }
            });
        });
    }
    
    // === EFECTOS DE HOVER MEJORADOS ===
    function setupHoverEffects() {
        bookCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // === PERFORMANCE: DEBOUNCE PARA LA BÚSQUEDA ===
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Aplicar debounce a la búsqueda si hay muchos libros
    if (bookCards.length > 50 && searchInput) {
        const originalHandler = searchInput.oninput;
        searchInput.removeEventListener('input', originalHandler);
        
        const debouncedSearch = debounce(function(e) {
            // Re-ejecutar la lógica de búsqueda
            const event = new Event('input');
            searchInput.dispatchEvent(event);
        }, 300);
        
        searchInput.addEventListener('input', debouncedSearch);
    }
    
    // === MOSTRAR INFORMACIÓN EN CONSOLA ===
    function logLibraryInfo() {
        console.log(`📚 Biblioteca Digital cargada`);
        console.log(`📖 Total de libros: ${bookCards.length}`);
        console.log(`👤 Usuario: johiortiz`);
        console.log(`📅 Fecha: 12/07/2025 10:16`);
        console.log(`💡 Atajos de teclado:`);
        console.log(`   • Ctrl+K: Buscar libros`);
        console.log(`   • Esc: Limpiar búsqueda`);
        console.log(`   • Alt+S: Ver estadísticas`);
    }
    
    // === INICIALIZACIÓN ===
    function init() {
        animateCards();
        setupTooltips();
        setupHoverEffects();
        logLibraryInfo();
        
        // Mensaje de bienvenida después de 2 segundos
        if (bookCards.length > 0) {
            setTimeout(() => {
                console.log('🎉 ¡Bienvenido a tu biblioteca digital!');
            }, 2000);
        }
    }
    
    // Ejecutar inicialización
    init();
    
    // === EXPONER FUNCIONES GLOBALES (si es necesario) ===
    window.bibliotecaDigital = {
        clearSearch: clearSearch,
        toggleStats: toggleStats,
        calculateStats: calculateStats
    };
});

// === SERVICE WORKER PARA CACHE (OPCIONAL) ===
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
            console.log('🔧 Service Worker registrado:', registration.scope);
        })
        .catch(function(registrationError) {
            console.log('❌ Service Worker falló:', registrationError);
        });
    });
}