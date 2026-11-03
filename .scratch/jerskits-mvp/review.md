# Jerskits — revisión y cierre del MVP

Resultado: los seis tickets están implementados y resueltos. Las dos revisiones independientes no dejan hallazgos materiales abiertos.

La revisión inicial comparó la base de documentación `6cd44ae` con la implementación `84bc8c7`. Las correcciones posteriores se revisaron de nuevo antes de ejecutar la suite completa final.

## Standards

La revisión no encontró defectos de corrección bloqueantes ni incumplimientos de las reglas del repositorio. Identificó tres mejoras:

1. **Duplicated Code / Shotgun Surgery:** la regla de cinco unidades se repetía entre la selección, las mutaciones del carrito y su interfaz. Resuelto mediante una política compartida de cantidad, utilizada también en la normalización de datos persistidos y en los mensajes traducidos.
2. **Mysterious Name / type erasure:** las tarjetas informativas del inicio utilizaban tuplas heterogéneas y conversiones de tipos. Resuelto con objetos de propiedades nombradas y tipos inferidos.
3. **Consistencia del sistema visual:** había colores y espaciados repetidos fuera de los tokens. Resuelto con colores semánticos y una escala compartida de cuatro píxeles, conservando los efectos gráficos propios de la referencia.

Revisión de las correcciones: los tres hallazgos están resueltos; no se observó una regresión material.

## Spec

La revisión no encontró funcionalidad de compra materialmente ausente, lógica incorrecta de variantes/persistencia ni ampliaciones de alcance. Identificó un hallazgo de verificación:

1. **P2 — Recorrido con teclado insuficientemente verificado:** las pruebas comprobaban el salto al contenido, pero no una compra completa sin ratón. Resuelto con una prueba que navega por inicio, catálogo, detalle, talla, carrito y checkout mediante Tab y Enter; modifica cantidad con teclado, comprueba el foco en el campo inválido, activa el relleno de ejemplo y confirma el pedido.

Revisión de la corrección: hallazgo cerrado; la inspección del foco no lo modifica programáticamente. No quedan hallazgos materiales del eje Spec.

## Verificación final

- Comprobación de tipos y generación de producción correctas.
- Suite completa: **26 pruebas aprobadas**, en Chromium de escritorio y un viewport móvil de Chromium.
- Compra completa en inglés, portugués de Brasil y español neutro.
- Catálogo, búsqueda, filtros combinables, ordenación y recuperación sin resultados.
- Tallas agotadas, líneas por variante, cantidades acumuladas, límite de cinco, subtotales, eliminación y persistencia del carrito.
- Validación, campos opcionales vacíos, relleno de ejemplo, confirmación y vaciado del carrito.
- Cambio de idioma conservando el carrito y traducción de errores ya visibles.
- Datos de envío no restaurados al recargar; reinicio de la demo.
- Compra íntegra con teclado en escritorio y móvil.
- Auditoría automática WCAG A/AA aplicada a las seis pantallas.
- Comprobaciones de ajuste a 320, 768, 1024 y 1440 píxeles; inspección adicional a 320 píxeles en los tres idiomas, con carrito y checkout poblados.
- Cada prueba falla ante errores de ejecución del navegador; la captura final también terminó sin errores.

Resumen por eje: Standards, tres hallazgos no bloqueantes resueltos; Spec, un hallazgo P2 de verificación resuelto. Cero hallazgos materiales pendientes en ambos ejes.

## Evidencia visual y ejecución

- [Portada de escritorio](preview-desktop.png).
- [Portada móvil](preview-mobile.png).
- La captura original sigue junto a la especificación. La fidelidad de los detalles ilegibles se evalúa por coherencia visual, como se acordó.
- Las instrucciones de ejecución y producción están en el README del proyecto.
- La aplicación se entrega localmente, lista para alojamiento estático. No se ha publicado en una cuenta externa.
- El host de navegador visible no estaba disponible; la verificación se realizó mediante las pruebas de navegador y capturas locales de producción.

## Iteración visual solicitada después del MVP

- El usuario pidió reducir el espacio en blanco del catálogo y probar el hero como primera pantalla completa sin la franja blanca del menú.
- La portada ahora ocupa el viewport, con navegación superpuesta sobre el fondo oscuro. Las páginas interiores mantienen su navegación sobre fondo claro; la cabecera del catálogo es más compacta.
- Los controles manuales anterior/siguiente recorren Liverpool, Barcelona y Brasil, actualizando camiseta, título, identificación del equipo y enlace al detalle. No hay rotación automática.
- Las imágenes adicionales de Barcelona y Brasil tienen transparencia real y créditos propios. Se conservaron las otras camisetas y las reglas de compra del MVP.
- Verificación de esta iteración: tipos y build correctos; suite completa de **30 pruebas aprobadas** en escritorio y móvil, incluida la alternancia, el enlace al producto seleccionado y el uso del control con teclado.
- Se revisaron capturas de las tres portadas y del catálogo a 1440, 2048, 390 y 320 píxeles. Las capturas enlazadas arriba muestran la nueva versión.
- Standards: ninguna regresión material; los controles conservan sus nombres accesibles, foco y comportamiento con teclado.
- Spec: se detectó y corrigió un P2 por alturas mínimas que extendían la portada fuera del primer viewport en pantallas bajas. La composición ahora se adapta a la altura; en los móviles más bajos se omite el relato decorativo. Una prueba de regresión verifica que ambas flechas y el enlace de compra estén completamente dentro del viewport a 390×667, 320×568 y 1440×600. Las capturas de esos tamaños se revisaron visualmente.
- Ambas revisiones independientes confirmaron el cierre sin hallazgos materiales pendientes.
