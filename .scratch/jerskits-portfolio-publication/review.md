# Revisión y publicación del showcase

Base: `c3471c4`. Implementación: `9497dd6`. Acuerdo: [plan aceptado](plan.md).

## Standards

La revisión independiente no encontró defectos accionables de corrección o accesibilidad, incumplimientos documentados ni olores de código que requieran cambios. Confirmó controles nativos, ausencia de reproducción automática, subtítulos, transcripción identificada en inglés, descarga independiente y foco al saltar de escena. Las herramientas registran interacciones reales, procedencia, errores del navegador y validación completa del MP4; sus dependencias y tomas permanecen locales.

## Spec

La revisión independiente no encontró funcionalidad ausente, implementación incorrecta ni ampliación de alcance. Confirmó el video silencioso de 35 segundos con estructura 12/9/9/5, móvil real, cierre con marca/dirección y presentación en README y reproductor. La revisión dejó la publicación como paso por verificar; esa verificación pública ya está completada salvo la integración automática con GitHub.

Resumen por eje: Standards, cero hallazgos; Spec, cero hallazgos de código. Queda una dependencia externa: conceder a la aplicación de GitHub de Vercel acceso al nuevo repositorio para enlazar los despliegues automáticos.

## Verificación

- Tipos y build correctos; suite completa de **38 pruebas aprobadas**.
- Revisión visual de toda la secuencia, poster y reproductor en escritorio/móvil; decodificación completa del MP4 sin errores.
- Repositorio público: https://github.com/EPraz/jerskits-marketplace.
- Demo pública: https://jerskits-marketplace.vercel.app.
- Video y reproductor: https://jerskits-marketplace.vercel.app/walkthrough.
- Navegadores nuevos sin sesión reproducen, saltan de escena, cargan subtítulos y descargan el video en 1440 y 390 píxeles; cero errores de ejecución.
- Las rutas interiores responden 200; los rangos del MP4 responden 206. Ambas descargas completas coinciden con el archivo local, de 2.801.789 bytes y SHA-256 `33a045b8bc5f89ce972a9d69633b4183328b20945286c1637647b7950ad8b986`.
- Vercel rechazó el enlace Git con: “To link a GitHub repository, you need to install the GitHub integration first.” La publicación manual de producción ya está completada.
