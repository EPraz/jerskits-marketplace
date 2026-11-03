# Jerskits — MVP de portfolio

Status: ready-for-agent

Alcance y frontera de pruebas aceptados explícitamente por el usuario.

## Problem Statement

El propietario del portfolio quiere demostrar que puede construir una tienda de camisetas de fútbol cuidada, responsive y funcional, inspirada en las pantallas de Jerskits que aparecen en una captura de un UI kit. Solo dispone de esa captura, cuyas miniaturas no permiten leer todos los detalles.

Necesita que quien evalúe el portfolio pueda explorar productos y completar una compra de demostración sin registrarse, introducir una tarjeta ni realizar una transacción real. La experiencia debe ser suficientemente completa para mostrar navegación, estado, validación, internacionalización y atención al diseño, con un alcance limitado a frontend.

## Solution

Construir Jerskits como una sola tienda de camisetas de fútbol, con catálogo y carrito comunes y un recorrido de seis pantallas: inicio, catálogo, detalle de camiseta, carrito, checkout simulado y confirmación.

El invitado podrá explorar entre 12 y 16 camisetas, buscar y filtrar, seleccionar talla y cantidad, gestionar su carrito y confirmar un pedido simulado mediante un formulario validado que también se puede rellenar con datos de ejemplo. La interfaz funcionará en inglés, portugués de Brasil y español neutro, tanto en móvil como en escritorio.

El diseño reproducirá lo más fielmente posible las pantallas de la tienda que se distinguen en la referencia. Las vistas poco legibles se completarán de forma coherente con ese estilo. Se entrega una aplicación lista para publicar, con datos locales y sin backend, autenticación ni cobros reales.

## User Stories

1. Como invitado, quiero reconocer Jerskits como una tienda de camisetas de fútbol, para entender qué puedo explorar.
2. Como invitado, quiero recorrer la tienda sin crear una cuenta, para probar la demo directamente.
3. Como invitado, quiero encontrar una portada visual inspirada en la referencia, para descubrir la identidad de la tienda.
4. Como invitado, quiero abrir el catálogo desde el inicio, para explorar las camisetas disponibles.
5. Como invitado, quiero abrir camisetas destacadas desde el inicio, para conocer sus detalles con pocos pasos.
6. Como invitado, quiero navegar entre las pantallas desde móvil o escritorio, para usar la tienda en mi dispositivo.
7. Como invitado, quiero explorar un catálogo de entre 12 y 16 camisetas para adultos, para disponer de variedad sin perderme en una demo demasiado extensa.
8. Como invitado, quiero distinguir las camisetas de clubes y selecciones y sus diseños y temporadas, para elegir el producto correcto.
9. Como invitado, quiero ver imágenes y precios de las camisetas, para comparar los productos visualmente.
10. Como invitado, quiero buscar por nombre de camiseta, para localizar un producto concreto.
11. Como invitado, quiero buscar por equipo, para encontrar sus camisetas.
12. Como invitado, quiero filtrar por equipo, para reducir el catálogo a los productos que me interesan.
13. Como invitado, quiero filtrar por talla, para encontrar camisetas de mi talla.
14. Como invitado, quiero filtrar por precio, para explorar productos dentro de un presupuesto.
15. Como invitado, quiero combinar filtros y búsqueda, para precisar los resultados.
16. Como invitado, quiero ordenar por destacados, para explorar las camisetas seleccionadas por la tienda.
17. Como invitado, quiero ordenar por precio ascendente o descendente, para comparar las opciones según su coste.
18. Como invitado, quiero conocer el número de resultados, para entender el efecto de mi búsqueda y filtros.
19. Como invitado, quiero saber cuándo no hay coincidencias, para entender por qué el catálogo no muestra productos.
20. Como invitado, quiero limpiar los filtros, para recuperar el catálogo después de una búsqueda demasiado restrictiva.
21. Como invitado, quiero abrir el detalle de una camiseta y consultar sus imágenes, información y precio, para decidir si añadirla al carrito.
22. Como invitado, quiero elegir entre tallas S, M, L, XL y XXL, para seleccionar mi variante.
23. Como invitado, quiero identificar las tallas agotadas y que no se puedan seleccionar, para evitar añadir una variante no disponible.
24. Como invitado, quiero elegir una cantidad al añadir una variante, para pedir varias unidades de una vez.
25. Como invitado, quiero añadir una variante al carrito, para conservar mi selección mientras sigo explorando.
26. Como invitado, quiero consultar en el carrito la camiseta, talla y cantidad de cada línea, para comprobar lo que he seleccionado.
27. Como invitado, quiero que varias adiciones de la misma variante se acumulen en una sola línea, para entender su cantidad total.
28. Como invitado, quiero que dos tallas de la misma camiseta aparezcan en líneas diferentes, para distinguir ambas selecciones.
29. Como invitado, quiero que el límite de cinco unidades por variante se aplique también a adiciones repetidas, para que la cantidad sea coherente en todo el recorrido.
30. Como invitado, quiero modificar cantidades en el carrito, para ajustar mi selección antes de confirmar.
31. Como invitado, quiero eliminar líneas del carrito, para retirar artículos que ya no quiero.
32. Como invitado, quiero ver los subtotales y el total actualizados, para conocer el importe de mi selección.
33. Como invitado, quiero ver que el envío es gratuito y que los precios son finales, para comprender el total sin cargos adicionales.
34. Como invitado, quiero encontrar un estado de carrito vacío con una forma de continuar explorando, para recuperar el recorrido.
35. Como invitado, quiero conservar el carrito después de recargar, para continuar mi prueba de la tienda.
36. Como invitado, quiero pasar al checkout sin iniciar sesión y revisar los artículos, para completar una compra como invitado.
37. Como invitado, quiero introducir nombre completo, email, país, ciudad y dirección, para completar los datos obligatorios de envío.
38. Como invitado, quiero poder dejar teléfono y código postal vacíos, para completar la demostración sin datos opcionales.
39. Como invitado, quiero ver errores junto a los campos obligatorios que faltan, para saber qué corregir.
40. Como invitado, quiero que un campo con solo espacios no se considere válido, para que la validación refleje datos realmente introducidos.
41. Como invitado, quiero recibir un error cuando el email tenga un formato inválido, para poder corregirlo antes de confirmar.
42. Como invitado, quiero rellenar el formulario con datos de ejemplo mediante un botón, para probar rápidamente una compra válida.
43. Como invitado, quiero confirmar sin introducir datos de tarjeta, para completar la demo sin medios de pago.
44. Como invitado, quiero identificar claramente que la compra es simulada, para comprender que no habrá un cobro ni un envío real.
45. Como invitado, quiero ver un número de pedido y los artículos comprados después de confirmar, para reconocer que el recorrido se ha completado.
46. Como invitado, quiero encontrar el carrito vacío después de confirmar, para distinguir el pedido completado de una nueva selección.
47. Como invitado, quiero que la primera visita se muestre en inglés, para encontrar una presentación inicial consistente del portfolio.
48. Como invitado, quiero cambiar entre inglés, portugués de Brasil y español neutro, para probar la tienda en el idioma que prefiera.
49. Como invitado, quiero que navegación, contenido, formularios y confirmación se traduzcan, para completar el recorrido en el idioma elegido.
50. Como invitado, quiero que los errores de validación se traduzcan, para entender cómo corregir el formulario.
51. Como invitado, quiero que los nombres propios de equipos se conserven, para reconocer los mismos equipos en todos los idiomas.
52. Como invitado, quiero ver precios en USD en los tres idiomas, para mantener una moneda consistente.
53. Como invitado, quiero conservar el idioma al recargar, para continuar con mi preferencia.
54. Como invitado, quiero cambiar de idioma sin perder el carrito, para continuar el mismo recorrido en otra lengua.
55. Como invitado, quiero completar el recorrido con teclado, para poder usar sus controles y formularios sin ratón.
56. Como invitado, quiero que textos, imágenes y controles sean legibles y utilizables en móvil y escritorio, para completar la compra en ambos formatos.
57. Como evaluador del portfolio, quiero reconocer la composición, tipografía y colores de la referencia, para valorar la fidelidad del trabajo visual.
58. Como evaluador del portfolio, quiero reiniciar la demo, para repetir el recorrido desde un estado inicial.
59. Como invitado, quiero que los datos de envío no queden guardados permanentemente, para que el formulario no se convierta en un perfil personal.
60. Como propietario del portfolio, quiero instrucciones para instalar y ejecutar la aplicación, para poder trabajar con la demo localmente.
61. Como propietario del portfolio, quiero generar y previsualizar una versión de producción estática, para preparar su publicación posterior.
62. Como propietario del portfolio, quiero conocer la configuración necesaria para acceder y recargar las rutas de la aplicación en un alojamiento estático, para que los enlaces funcionen cuando la publique.

## Implementation Decisions

- **Modelo de tienda:** Jerskits es una sola tienda. El catálogo y el carrito son comunes; no hay vendedores independientes. Se utilizarán los términos invitado, camiseta, variante, línea del carrito y pedido con el significado acordado en el glosario.
- **Base técnica:** React y TypeScript con Vite, React Router para las páginas e i18next para internacionalización. Todo se ejecuta en el navegador, con catálogo local y sin backend ni contratos de API o cambios de base de datos.
- **Responsabilidades:** separar el recorrido de páginas, consulta del catálogo, selección de variantes, gestión del carrito, validación y confirmación del checkout e internacionalización. Estas responsabilidades deben colaborar para ofrecer el recorrido completo sin exponer su organización interna en la interfaz.
- **Pantallas:** inicio con presentación y destacados; catálogo con herramientas de exploración; detalle con imágenes, información, talla y cantidad; carrito editable; checkout con resumen y formulario; confirmación con referencia del pedido y artículos comprados.
- **Fuente de diseño:** usar la captura aportada como referencia de las pantallas de la tienda. La portada promocional del UI kit no forma parte de la aplicación. Mantener composición, tipografía, colores y adaptación a móvil y escritorio de los detalles legibles; completar los demás con el mismo lenguaje visual.
- **Catálogo:** entre 12 y 16 camisetas de fútbol para adultos, de clubes y selecciones. Cada producto representa un diseño y una temporada concretos; otra equipación es otro producto. Los datos locales proporcionan la información, imágenes y textos necesarios para navegar en los tres idiomas.
- **Variantes y disponibilidad:** una variante corresponde a una camiseta y una talla S, M, L, XL o XXL. Algunas tallas estarán agotadas y no se podrán seleccionar. La cantidad máxima es de cinco unidades por variante, tanto al añadir como al editar el carrito.
- **Exploración:** búsqueda por camiseta o equipo; filtros combinables por equipo, talla y precio; orden por destacados o precio ascendente/descendente; contador, estado sin coincidencias y acción para limpiar filtros.
- **Carrito:** una sola línea por variante; las adiciones repetidas acumulan cantidad sin superar cinco y otra talla crea otra línea. Permitir cambiar cantidades y eliminar líneas, recalculando subtotales y total. El carrito persiste al recargar.
- **Precios:** única moneda USD en todos los idiomas; precios finales, envío gratuito y total igual a la suma de artículos. No hay conversión, cupones ni cálculos fiscales adicionales.
- **Checkout:** requiere nombre completo, email, país, ciudad y dirección; teléfono y código postal son opcionales. Rechazar valores obligatorios vacíos o formados solo por espacios y comprobar el formato del email. Los errores aparecen junto a su campo y se traducen. El botón de datos de ejemplo rellena un formulario válido.
- **Confirmación:** confirmar un pedido válido muestra su número y artículos comprados y vacía el carrito. La operación se identifica como simulada y no solicita tarjeta. Los datos de envío no se guardan permanentemente; no se introduce un historial de pedidos.
- **Idiomas:** inglés inicial, portugués de Brasil y español neutro. Selector de idioma, persistencia de la elección al recargar y traducción de navegación, contenido, formularios, errores y confirmación. Los nombres propios de equipos se conservan. Cambiar de idioma mantiene el carrito.
- **Reinicio:** ofrecer una acción para reiniciar la demo y volver a probar el recorrido.
- **Entrega:** aplicación responsive utilizable con teclado, lista para alojamiento estático, con instrucciones para instalar, ejecutar, generar y previsualizar producción. Documentar la configuración del alojamiento para servir la aplicación al acceder directamente o recargar sus rutas. La publicación en una cuenta concreta pertenece a una etapa posterior.

## Testing Decisions

- **Frontera acordada:** una única frontera de prueba, la aplicación completa desde el navegador. El usuario aceptó explícitamente este enfoque antes de publicar la especificación.
- **Qué hace buena una prueba:** realizar acciones disponibles para el invitado y comprobar resultados observables: contenido, navegación, estados de controles, errores, líneas, cantidades y totales. Evitar acoplar las pruebas a componentes, hooks, estructuras internas o detalles del almacenamiento.
- **Estado previo:** el repositorio contiene documentación de configuración, glosario y definición del MVP; todavía no tiene aplicación ni suite de pruebas. No hay pruebas existentes que reutilizar ni código que prefactorizar.
- **Recorrido integrado:** comprobar inicio, catálogo, detalle, carrito, checkout y confirmación con datos locales deterministas, en móvil y escritorio y en los tres idiomas. Verificar referencia del pedido, artículos comprados y vaciado del carrito tras confirmar.
- **Catálogo:** comprobar búsqueda, filtros combinados, ordenación, contador, estado sin resultados y recuperación al limpiar los filtros.
- **Variantes y carrito:** comprobar tallas agotadas, separación de tallas, acumulación de la misma variante, edición, eliminación, subtotales y total. Incluir el intento de añadir tres unidades y otras tres de la misma variante y verificar que no supera cinco. Cubrir carrito vacío.
- **Formulario:** comprobar campos obligatorios vacíos o con espacios, email inválido, campos opcionales vacíos, errores junto a sus campos en los tres idiomas y relleno con datos de ejemplo que permite confirmar.
- **Persistencia y reinicio:** comprobar desde la interfaz que carrito e idioma sobreviven a la recarga y que se puede reiniciar la demo. Verificar que los datos de envío no se restauran como un perfil persistente.
- **Navegación y accesibilidad:** comprobar el recorrido con teclado, foco visible, etiquetas de campos y controles utilizables en móvil y escritorio; comprobar las rutas y su recarga en el entorno de previsualización que corresponda.
- **Fidelidad visual:** revisar las pantallas móvil y escritorio frente a las partes legibles de la captura y la coherencia de las vistas completadas. La captura de baja resolución no permite exigir una coincidencia exacta de las partes ilegibles.
- **Distribución del trabajo:** cada entrega amplía las pruebas en esta misma frontera para demostrar el comportamiento que añade. La revisión final verifica el recorrido integrado; no sustituye las comprobaciones de cada entrega.

## Out of Scope

- Backend, base de datos, autenticación, registro y cuentas de usuario.
- Vendedores independientes y administración de una tienda.
- Ventas, cobros, datos de tarjeta, integraciones de pago y operaciones logísticas reales.
- Favoritos, reseñas e historial de pedidos.
- Prendas distintas de camisetas para adultos y categorías infantiles.
- Personalización de nombre o dorsal.
- Cupones, impuestos adicionales, conversión de moneda y monedas distintas de USD.
- Página promocional del UI kit, generación de un archivo Figma y reproducción de sus más de 55 pantallas.
- Publicación en una cuenta o proveedor concreto durante este alcance.
- Ampliaciones futuras: se definirán como un alcance separado.

## Further Notes

- El usuario aceptó el alcance consolidado y posteriormente aceptó la propuesta de pruebas desde el navegador.
- La [captura de referencia](reference.png) se conserva junto a esta especificación para que las siguientes entregas puedan consultarla sin depender de un archivo temporal.
- No se dispone del enlace de Figma ni de capturas de mayor resolución. Se acepta completar con criterio propio lo que no se distingue, manteniendo el estilo visible.
- Esta especificación se publica en el tracker de markdown local con el estado ready-for-agent. No implica que la aplicación esté implementada ni que las pruebas se hayan ejecutado.
- Los tickets de implementación se publicarán por separado, uno por archivo, después de que el usuario apruebe su desglose y dependencias.
