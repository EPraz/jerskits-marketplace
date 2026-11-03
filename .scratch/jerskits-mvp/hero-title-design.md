# Nombre del equipo en la portada

Estado: acuerdo completo aceptado por el usuario; implementación autorizada.

## Decisiones confirmadas

- El nombre real del equipo debe poder leerse completo en todas las camisetas destacadas.
- En la composición con dos bloques, cada bloque queda visible a un lado de la camiseta: `LIVER [camiseta] POOL`. La camiseta no puede ocultar ninguna letra.
- En la composición lateral, mantener el tamaño y la posición actuales de la camiseta.
- El espaciado se adapta al tamaño de pantalla. El usuario delega el ajuste visual al agente; no se ha acordado una distancia fija.
- Mantener las letras compactas dentro de cada bloque, sin distribuirlas a todo el ancho ni deformarlas. Dejar un pequeño margen entre cada bloque y la camiseta.
- Divisiones aprobadas: `LIVER [camiseta] POOL`, `BARCE [camiseta] LONA` y `BRA [camiseta] ZIL`.
- Cuando no quepan los bloques laterales completos y legibles, mostrar el nombre completo en una línea encima de la camiseta. Se permite ajustar la composición móvil, incluida la posición de la camiseta, para lograrlo.

## Criterios de aceptación

- Las letras de ambos bloques son visibles íntegramente; estar detrás de la camiseta como capa no autoriza a ocultar ninguna letra.
- El hueco central reserva el espacio visual que ocupa la camiseta a la altura del nombre, más un pequeño margen. No se resuelve simplemente añadiendo un hueco fijo al texto centrado.
- El nombre no tiene que llegar hasta las esquinas ni llenar el ancho de la pantalla.
- En móvil, el nombre completo queda separado de la camiseta y de los demás textos, sin recortes ni desbordamiento horizontal.
- La composición conserva la portada en el primer viewport, con las flechas y el enlace a la camiseta visibles, y mantiene el menú transparente.
- Revisar las tres camisetas en escritorio, tamaños intermedios y móvil antes de entregar.

## Verificación acordada

- Usar el límite ya acordado para las pruebas: la interfaz completa en un navegador real, sin nuevas pruebas de componentes ni acceso al estado interno.
- Verificar la posición visible de las letras respecto a los píxeles opacos de la camiseta, además del nombre accesible, el ajuste al viewport y los controles existentes.
- Comparar la implementación con el estado inicial `1220215` y revisar por separado Standards y Spec.

## Problema de las versiones anteriores

Distribuir letras a todo el ancho produjo demasiado espacio entre ellas. Agruparlas con un hueco central fijo tampoco resolvió el objetivo: la camiseta siguió ocultando letras. La siguiente implementación debe reservar espacio para la camiseta y los bloques completos, en lugar de aceptar su superposición visual.

Esta es una decisión visual reversible; no requiere un ADR ni introduce términos nuevos del dominio comercial en el glosario.
