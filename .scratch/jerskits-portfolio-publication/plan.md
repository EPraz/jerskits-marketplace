# Walkthrough y publicación de Jerskits

Estado: video, reproductor, README, repositorio público y demo de Vercel publicados y verificados. Pendiente únicamente el permiso de la integración de GitHub para desplegar automáticamente desde `main`.

## Objetivo confirmado

- Crear un video walkthrough para el README siguiendo el estilo de los proyectos hermanos.
- Publicar Jerskits en Vercel con una dirección pública para portafolio.
- Mantener su carácter de demo: compra simulada, sin cuentas ni pagos reales.

## Referentes comprobados en los repositorios hermanos

- `coffee-shop-app`: video de 72 segundos, silencioso, H.264 a 1080p y 25 fps, textos explicativos en inglés, compra real en viewport móvil y cierre de escritorio. README con portada clicable y enlaces a demo, `/walkthrough` y MP4. Documentado en su README, `docs/walkthrough.md` y `docs/publication-and-walkthrough.md`.
- `projectManagement` y `dashboard`: misma presentación con portada, reproductor público, subtítulos/transcripción y material de escritorio/móvil; videos de unos tres minutos según el alcance de cada aplicación.
- Los ejemplos públicos examinados usan subdominios generados `.vercel.app`, sin una convención de dominio propio.
- Las herramientas reutilizables de grabación y montaje están en `coffee-shop-app/scripts/walkthrough/` y `ER-LandigPage/scripts/walkthrough/`. Se revisarán para adaptar el guion a Jerskits, sin modificar esos repositorios.

## Situación actual de Jerskits

- README en inglés; no contiene aún video ni enlace a demo pública.
- Repositorio Git local sin remotos configurados.
- No hay proyecto local vinculado ni configuración de Vercel.
- Grabación de navegador disponible con Playwright; la entrega MP4 necesita herramientas de conversión adicionales.
- Vercel necesita configuración para que las rutas del catálogo, camiseta y checkout funcionen al abrirlas directamente.

## Decisiones confirmadas

- MP4, portada clicable en README y página pública `/walkthrough` con controles, subtítulos, transcripción y descarga.
- README, interfaz grabada y textos en inglés; sin narración de voz.
- Video más corto que los 80–90 segundos propuestos inicialmente, centrado en apreciar el diseño y el producto, con poca explicación. No se necesita narrar una compra completa.
- Subdominio de Vercel, intentando `jerskits-marketplace.vercel.app` si está disponible.
- Crear repositorio público en GitHub y conectar la rama `main` con Vercel para futuras actualizaciones.

## Formato final aceptado

- Unos 35 segundos de muestra visual: portada y alternancia de camisetas, catálogo y detalle, recorrido móvil breve y cierre con marca/dirección pública.
- Sin música, voz ni textos explicativos superpuestos. Mantener el protagonismo de la interfaz y las camisetas.
- Subtítulos y transcripción como descripciones breves de escenas disponibles en el reproductor; no convertir el video en tutorial.
- Guion: 12 segundos de portada, 9 de catálogo y detalle, 9 de móvil y 5 de cierre. El usuario confirmó este formato y la publicación.

No se han identificado nuevos términos del dominio comercial ni una decisión arquitectónica que requiera ADR.
