import os
from PIL import Image

# Rutas de las carpetas con las imágenes
carpetas_imagenes = ['../src/assets/stories', '../src/assets/sagas']

# Nueva resolución
nueva_resolucion = (896, 512)

for carpeta in carpetas_imagenes:
    # Crear una carpeta para guardar las imágenes redimensionadas
    carpeta_redimensionadas = os.path.join(carpeta, 'redimensionadas')
    os.makedirs(carpeta_redimensionadas, exist_ok=True)

    # Recorrer todas las imágenes en la carpeta
    for nombre_imagen in os.listdir(carpeta):
        if nombre_imagen.endswith(('jpg', 'jpeg', 'png', 'bmp', 'gif')):
            ruta_imagen = os.path.join(carpeta, nombre_imagen)
            
            # Abrir la imagen
            with Image.open(ruta_imagen) as img:
                # Redimensionar la imagen
                img_redimensionada = img.resize(nueva_resolucion, Image.ANTIALIAS)
                
                # Guardar la imagen redimensionada en la nueva carpeta
                ruta_guardado = os.path.join(carpeta_redimensionadas, nombre_imagen)
                img_redimensionada.save(ruta_guardado)

    print(f'Todas las imágenes de {carpeta} han sido redimensionadas y guardadas en {carpeta_redimensionadas}')
