rently.go
Hice esta página para practicar HTML, CSS y JavaScript armando algo parecido a un sitio de alquiler de fincas y cabañas para fines de semana. Es un proyecto personal de práctica, así que todos los datos son inventados.
Qué hace
Puedes buscar alojamientos por destino, filtrar por tipo (finca, cabaña, glamping o villa), por número de huéspedes y por precio, y ordenarlos como prefieras. Los que te gusten los puedes guardar con el corazón, y si le das a "Reservar" te calcula cuánto sale según las noches que elijas.
También agregué un botón para publicar tu propia finca. Lo que publicas se guarda en tu navegador, o sea que solo lo ves tú, porque todavía no tiene servidor.
Cómo verlo
Descarga el repositorio y abre el archivo `index.html` en tu navegador. No hay que instalar nada.
Si prefieres abrirlo con un servidor local y tienes Python:
```bash
python3 -m http.server 8000
```
y entras a http://localhost:8000
Archivos
`index.html`: la estructura de la página
`style.css`: los estilos
`app.js`: toda la lógica (filtros, favoritos, reservas y el formulario)
Lo que me falta
Quiero conectarlo a una base de datos para que las reservas y las fincas publicadas se guarden de verdad, poner fotos reales en vez de los colores y hacer una página de detalle para cada alojamiento.
