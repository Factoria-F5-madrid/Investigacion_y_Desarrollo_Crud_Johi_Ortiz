from django import forms
from .models import Libro
from datetime import datetime

class LibroForm(forms.ModelForm):
    class Meta:
        model = Libro
        fields = ['titulo', 'autor', 'descripcion', 'fecha_publicacion', 'isbn']
        widgets = {
            'fecha_publicación': forms.DateInput(
                attrs={'type': 'date'},
                format='%Y-%m-%d'
                ),
            'isbn': forms.TextInput(attrs={'maxlength': '14'}),          
            'descripcion': forms.Textarea(attrs={'rows': 4}),
        }
        
    def clean_fecha_publicaciones(self):
        fecha = self.cleaned_data.get('fecha_publicacion')
        if fecha:
            # Asegurase de que es una fecha válida
            try:
                if isnstance(fecha, str):
                    fecha = datetime.strptime(fecha, '%Y-%m-%d').date()
            except ValueError:
                raise forms.ValidationError('Formato de fecha inválido. Usa YYYY-MM-DD')
        return fecha
    
    def clean_isbn(self):
        isbn = self.cleaned_data.get('isbn')
        if isbn:
            # Limpiar el ISBN
            isbn = isbn.replace('-', '').replace(' ', '')
            
            # Validar longitud
            if len(isbn) != 13:
                raise forms.ValidationError('El ISBN debe tener 13 dígitos')
            
            # Validar que sean solo números
            if not isbn.isdigit():
                raise forms.ValidationError('El ISBN debe contener solo números')
            
            # Verificar unicidad
            qs = Libro.objects.filter(isbn=isbn)
            if self.instance.pk:
                qs = qs.exclude(pk=self.instance.pk)
            if qs.exists():
                raise forms.ValidationError('Ya existe un libro con este ISBN')
        
        return isbn