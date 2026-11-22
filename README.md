# Campo Libre

Catálogo sencillo de fincas, cabañas, glamping y villas para alquilar, hecho con HTML, CSS y JavaScript puro (sin dependencias).

Es un proyecto de ejemplo con datos ficticios.

## Qué incluye

- Listado de alojamientos con tarjetas
- Filtros por categoría, destino, huéspedes y precio máximo
- Orden por calificación, precio o capacidad
- Favoritos guardados en el navegador (localStorage)
- Formulario de reserva con cálculo del total por noches
- Modo claro y oscuro automático

## Cómo usarlo

Abre `index.html` en el navegador, o levanta un servidor local:

```bash
python3 -m http.server 8000
# luego visita http://localhost:8000
```

## Estructura

```
campo-libre/
├── index.html
├── style.css
├── app.js
└── README.md
```

## Ideas para seguir

- Conectar a un backend (Node/Express, Django, Supabase) para propiedades y reservas reales
- Páginas de detalle con galería de fotos
- Calendario de disponibilidad
- Login para anfitriones y huéspedes
- Pagos (Wompi, Stripe, etc.)

## Licencia

MIT
