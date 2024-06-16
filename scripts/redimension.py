import os
from PIL import Image

# Rutas de las carpetas con las imágenes
carpetas_imagenes = ['./public/assets/stories']

# Nueva resolución
nueva_resolucion = (896, 512)

for carpeta in carpetas_imagenes:
    # Recorrer todas las imágenes en la carpeta
    for nombre_imagen in os.listdir(carpeta):
        if nombre_imagen.endswith(('jpg', 'jpeg', 'png', 'bmp', 'gif')):
            ruta_imagen = os.path.join(carpeta, nombre_imagen)
            
            # Abrir la imagen
            with Image.open(ruta_imagen) as img:
                # Redimensionar la imagen
                img_redimensionada = img.resize(nueva_resolucion, Image.Resampling.LANCZOS)
                
                # Guardar la imagen redimensionada, reemplazando la original
                img_redimensionada.save(ruta_imagen)

    print(f'Todas las imágenes de {carpeta} han sido redimensionadas y reemplazadas.')
