# Nombre del equipo en la portada

Estado: acuerdo completo aceptado por el usuario; implementado y verificado.

## Decisiones confirmadas

- El nombre real del equipo debe poder leerse completo en todas las camisetas destacadas.
- En la composición con dos bloques, cada bloque queda a un lado de la camiseta: `LIVER [camiseta] POOL`. Tras ver la primera versión completa, el usuario pidió acercar los bloques hasta que los bordes de la R y la P pasen apenas detrás de la camiseta, con el mismo criterio para los otros equipos.
- En el último refinamiento, el usuario aprobó esa dirección y pidió mover ambos bloques un poco más hacia dentro, como si las letras centrales salieran de detrás de las mangas, conservando el espaciado entre letras.
- En la composición lateral, mantener el tamaño y la posición actuales de la camiseta.
- El espaciado se adapta al tamaño de pantalla. El usuario delega el ajuste visual al agente; no se ha acordado una distancia fija.
- Abrir ligeramente el espacio entre letras dentro de cada bloque, sin distribuirlas a todo el ancho ni deformarlas. Reducir el hueco central hasta el contorno de la camiseta.
- Divisiones aprobadas: `LIVER [camiseta] POOL`, `BARCE [camiseta] LONA` y `BRA [camiseta] ZIL`.
- Cuando no quepan los bloques laterales completos y legibles, mostrar el nombre completo en una línea encima de la camiseta. Se permite ajustar la composición móvil, incluida la posición de la camiseta, para lograrlo.

## Criterios de aceptación

- El nombre sigue siendo reconocible y solo se permite un leve solapamiento en el borde de las letras centrales. Esta petición posterior sustituye al requisito anterior de no ocultar ninguna parte de las letras.
- El hueco central sigue la escala de la camiseta, permitiendo ese pequeño solapamiento. No se resuelve simplemente añadiendo un hueco fijo al texto centrado.
- El nombre no tiene que llegar hasta las esquinas ni llenar el ancho de la pantalla.
- En móvil, el nombre completo queda separado de la camiseta y de los demás textos, sin recortes ni desbordamiento horizontal.
- La composición conserva la portada en el primer viewport, con las flechas y el enlace a la camiseta visibles, y mantiene el menú transparente.
- Revisar las tres camisetas en escritorio, tamaños intermedios y móvil antes de entregar.

## Verificación acordada

- Usar el límite ya acordado para las pruebas: la interfaz completa en un navegador real, sin nuevas pruebas de componentes ni acceso al estado interno.
- Verificar la posición visible de las letras respecto a los píxeles opacos de la camiseta, además del nombre accesible, el ajuste al viewport y los controles existentes.
- Comparar la implementación con el estado inicial `1220215` y revisar por separado Standards y Spec.

## Resultado

- En escritorio, los bloques se acercan a la silueta con un leve solapamiento de las letras centrales y un poco más de espacio entre letras. En pantallas estrechas, el nombre sigue entero encima de la camiseta.
- En móvil horizontal de poca altura, nombre completo arriba y camiseta y enlace de compra en columnas separadas, con cabecera y controles compactos.
- Tipos y build correctos; suite completa de 34 pruebas aprobadas, incluyendo regresiones de distribución en las tres camisetas y controles dentro del viewport.
- [Revisión y evidencia](hero-title-review.md).

## Problema de las versiones anteriores

Distribuir letras a todo el ancho produjo demasiado espacio entre ellas. Agruparlas con un hueco central fijo ocultó demasiadas letras. Reservar después la silueta completa con un margen adicional dejó los bloques demasiado separados; la petición más reciente permite acercar solo sus bordes centrales ligeramente detrás de la camiseta.

Esta es una decisión visual reversible; no requiere un ADR ni introduce términos nuevos del dominio comercial en el glosario.
