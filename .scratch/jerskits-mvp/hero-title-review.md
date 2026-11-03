# Revisión del nombre del equipo en la portada

Base de comparación: `1220215`. Acuerdo: [diseño aceptado](hero-title-design.md). Alcance: composición del nombre y la camiseta, con adaptación a pantallas estrechas.

## Standards

Sin hallazgos materiales. La revisión independiente confirmó que se conserva un único encabezado accesible, se ocultan sus representaciones visuales duplicadas a las tecnologías de asistencia y se mantienen los controles y enlaces del carrusel.

Las pruebas verifican la interfaz renderizada: fuentes cargadas, texto visible y silueta opaca de las imágenes con su rotación. No reutilizan las constantes de distribución de producción ni inspeccionan el estado de React. No se identificaron incumplimientos documentados ni olores de código que requieran cambios.

La revisión posterior de la corrección horizontal tampoco encontró problemas materiales nuevos.

## Spec

La revisión independiente confirmó los bloques compactos completos a ambos lados de la camiseta en escritorio y el nombre entero encima en pantallas estrechas. La posición y las dimensiones de la camiseta de escritorio se conservan.

Se encontró un **P2** en móvil horizontal: los márgenes verticales podían dejar sin altura a la fila de la camiseta a 568×320. Se corrigió con una composición compacta que mantiene el nombre arriba y separa la camiseta del enlace de compra en dos columnas, reduciendo la altura de cabecera y controles y omitiendo textos secundarios. La prueba añadió 568×320 y 844×390 y comprueba que la camiseta conserva altura visible. El revisor confirmó el cierre del P2; no quedan desviaciones materiales de la especificación.

Resumen por eje: Standards, cero hallazgos; Spec, un P2 resuelto y cero pendientes.

## Evidencia

- Comprobación de tipos y generación de producción correctas; suite completa de **34 pruebas aprobadas** en Chromium de escritorio y móvil, incluida la compra con teclado, la auditoría de accesibilidad y los tres idiomas.
- Las pruebas nuevas fallaron antes de las correcciones por letras ocultas, ausencia del nombre completo superior y camiseta sin altura en horizontal.
- Capturas revisadas de Liverpool, Barcelona y Brasil a 1440×900, 2048×1050, 1024×768, 1001×900, 1000×900, 768×900, 768×600, 844×390, 568×320, 390×844, 390×667 y 320×568. La captura terminó sin errores de ejecución.
- [Escritorio](preview-desktop.png) y [móvil](preview-mobile.png).
