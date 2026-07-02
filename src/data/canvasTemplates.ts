/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BusinessModelCanvas } from '../types';

export const templates: BusinessModelCanvas[] = [
  {
    id: 'cafe_libros',
    title: 'Café Literario (Negocio Local)',
    description: 'Una cafetería de especialidad combinada con una librería independiente, ofreciendo un refugio acogedor para la comunidad del barrio.',
    notes: [
      { id: 'cl_vp_1', blockId: 'propuestas_valor', text: 'Café de especialidad premium y repostería artesanal local.', color: 'yellow' },
      { id: 'cl_vp_2', blockId: 'propuestas_valor', text: 'Ambiente tranquilo y acogedor, óptimo para lectura, estudio o trabajo remoto.', color: 'blue' },
      { id: 'cl_vp_3', blockId: 'propuestas_valor', text: 'Selección curada de libros de editoriales independientes y talleres culturales.', color: 'pink' },
      
      { id: 'cl_cs_1', blockId: 'segmentos_clientes', text: 'Lectores apasionados y coleccionistas de libros.', color: 'yellow' },
      { id: 'cl_cs_2', blockId: 'segmentos_clientes', text: 'Estudiantes universitarios y profesionales independientes (freelancers).', color: 'blue' },
      { id: 'cl_cs_3', blockId: 'segmentos_clientes', text: 'Vecinos del barrio que buscan un café de alta calidad.', color: 'green' },
      
      { id: 'cl_ch_1', blockId: 'canales', text: 'Local físico estratégicamente decorado.', color: 'yellow' },
      { id: 'cl_ch_2', blockId: 'canales', text: 'Redes sociales visuales (Instagram/TikTok) para mostrar eventos y novedades.', color: 'pink' },
      { id: 'cl_ch_3', blockId: 'canales', text: 'Club de lectura por correo electrónico semanal.', color: 'blue' },
      
      { id: 'cl_cr_1', blockId: 'relaciones_clientes', text: 'Atención personalizada y familiar por parte de los baristas.', color: 'yellow' },
      { id: 'cl_cr_2', blockId: 'relaciones_clientes', text: 'Fidelización a través de tarjetas de sello (10º café gratis).', color: 'green' },
      { id: 'cl_cr_3', blockId: 'relaciones_clientes', text: 'Comunidad activa a través de los clubes de lectura presenciales.', color: 'pink' },
      
      { id: 'cl_rs_1', blockId: 'fuentes_ingresos', text: 'Venta directa de bebidas calientes, frías y alimentos.', color: 'yellow' },
      { id: 'cl_rs_2', blockId: 'fuentes_ingresos', text: 'Venta de libros físicos nuevos y usados de colección.', color: 'blue' },
      { id: 'cl_rs_3', blockId: 'fuentes_ingresos', text: 'Suscripciones mensuales al Club de Libros (Libro sorpresa + Café de cortesía).', color: 'pink' },
      { id: 'cl_rs_4', blockId: 'fuentes_ingresos', text: 'Boletos para talleres de escritura o clubes de debate literario.', color: 'green' },
      
      { id: 'cl_kr_1', blockId: 'recursos_clave', text: 'Ubicación céntrica con buen flujo peatonal.', color: 'yellow' },
      { id: 'cl_kr_2', blockId: 'recursos_clave', text: 'Máquina espresso profesional e inventario de café de origen.', color: 'blue' },
      { id: 'cl_kr_3', blockId: 'recursos_clave', text: 'Catálogo de libros atractivos y personal con conocimiento literario.', color: 'pink' },
      
      { id: 'cl_ka_1', blockId: 'actividades_clave', text: 'Preparación de café de especialidad y control de calidad de alimentos.', color: 'yellow' },
      { id: 'cl_ka_2', blockId: 'actividades_clave', text: 'Organización de agenda cultural (presentaciones, talleres).', color: 'pink' },
      { id: 'cl_ka_3', blockId: 'actividades_clave', text: 'Gestión de compras y curación de títulos literarios.', color: 'blue' },
      
      { id: 'cl_kp_1', blockId: 'socios_clave', text: 'Tostadores locales de café de especialidad.', color: 'yellow' },
      { id: 'cl_kp_2', blockId: 'socios_clave', text: 'Editoriales independientes y distribuidoras de libros.', color: 'blue' },
      { id: 'cl_kp_3', blockId: 'socios_clave', text: 'Panaderías locales asociadas para postres artesanales frescos.', color: 'green' },
      
      { id: 'cl_cs_c1', blockId: 'estructura_costos', text: 'Alquiler mensual del local comercial.', color: 'yellow' },
      { id: 'cl_cs_c2', blockId: 'estructura_costos', text: 'Costo de adquisición de mercancías (granos de café, libros, leche).', color: 'blue' },
      { id: 'cl_cs_c3', blockId: 'estructura_costos', text: 'Sueldos de baristas y personal de librería.', color: 'pink' },
      { id: 'cl_cs_c4', blockId: 'estructura_costos', text: 'Gastos de mercadeo y servicios públicos (agua, luz, internet de alta velocidad).', color: 'green' }
    ]
  },
  {
    id: 'uber',
    title: 'Uber (Plataforma Bilateral)',
    description: 'La revolucionaria aplicación móvil que conecta de manera eficiente a pasajeros con conductores particulares para servicios de transporte.',
    notes: [
      { id: 'ub_vp_1', blockId: 'propuestas_valor', text: 'Para Pasajeros: Tiempos de espera mínimos, conveniencia de pago digital y tarifas transparentes.', color: 'yellow' },
      { id: 'ub_vp_2', blockId: 'propuestas_valor', text: 'Para Conductores: Flexibilidad de horarios, ingresos adicionales a demanda y facilidad para conseguir clientes.', color: 'blue' },
      
      { id: 'ub_cs_1', blockId: 'segmentos_clientes', text: 'Pasajeros urbanos sin auto propio o que prefieren no conducir en tráfico.', color: 'yellow' },
      { id: 'ub_cs_2', blockId: 'segmentos_clientes', text: 'Conductores particulares con auto propio buscando monetizar su tiempo libre.', color: 'blue' },
      { id: 'ub_cs_3', blockId: 'segmentos_clientes', text: 'Viajeros habituales de negocios o turistas.', color: 'green' },
      
      { id: 'ub_ch_1', blockId: 'canales', text: 'Aplicación nativa móvil de Uber (iOS y Android).', color: 'yellow' },
      { id: 'ub_ch_2', blockId: 'canales', text: 'Redes sociales, campañas digitales y referidos boca a boca.', color: 'pink' },
      { id: 'ub_ch_3', blockId: 'canales', text: 'Sitio web oficial.', color: 'blue' },
      
      { id: 'ub_cr_1', blockId: 'relaciones_clientes', text: 'Autoservicio automatizado guiado por la app.', color: 'yellow' },
      { id: 'ub_cr_2', blockId: 'relaciones_clientes', text: 'Sistema bilateral de calificaciones de 1 a 5 estrellas para garantizar calidad.', color: 'green' },
      { id: 'ub_cr_3', blockId: 'relaciones_clientes', text: 'Soporte de resolución de problemas desde la aplicación.', color: 'pink' },
      
      { id: 'ub_rs_1', blockId: 'fuentes_ingresos', text: 'Cobro por kilómetro y minuto del viaje (comisión promedio del 25% por trayecto).', color: 'yellow' },
      { id: 'ub_rs_2', blockId: 'fuentes_ingresos', text: 'Tarifa dinámica (precios aumentan en zonas/horas de alta demanda).', color: 'blue' },
      { id: 'ub_rs_3', blockId: 'fuentes_ingresos', text: 'Suscripción mensual premium (Uber One) para envíos y viajes sin costo adicional.', color: 'pink' },
      
      { id: 'ub_kr_1', blockId: 'recursos_clave', text: 'Plataforma y servidores tecnológicos escalables.', color: 'yellow' },
      { id: 'ub_kr_2', blockId: 'recursos_clave', text: 'Algoritmo patentado de emparejamiento inteligente y precios dinámicos.', color: 'blue' },
      { id: 'ub_kr_3', blockId: 'recursos_clave', text: 'La red masiva de conductores y la reputación de marca.', color: 'pink' },
      
      { id: 'ub_ka_1', blockId: 'actividades_clave', text: 'Desarrollo, optimización y mantenimiento continuo de la aplicación.', color: 'yellow' },
      { id: 'ub_ka_2', blockId: 'actividades_clave', text: 'Adquisición de clientes (marketing digital agresivo).', color: 'pink' },
      { id: 'ub_ka_3', blockId: 'actividades_clave', text: 'Atención al cliente y resolución de disputas de seguridad.', color: 'blue' },
      
      { id: 'ub_kp_1', blockId: 'socios_clave', text: 'Conductores registrados (proveedores clave del servicio).', color: 'yellow' },
      { id: 'ub_kp_2', blockId: 'socios_clave', text: 'Proveedores de mapas (Google Maps, Mapbox) para geolocalización precisa.', color: 'blue' },
      { id: 'ub_kp_3', blockId: 'socios_clave', text: 'Pasarelas de procesamiento de pago integrado (Stripe, Braintree, PayPal).', color: 'green' },
      
      { id: 'ub_co_1', blockId: 'estructura_costos', text: 'Mantenimiento de infraestructura tecnológica y servidores.', color: 'yellow' },
      { id: 'ub_co_2', blockId: 'estructura_costos', text: 'Inversión en marketing para captar pasajeros y conductores.', color: 'blue' },
      { id: 'ub_co_3', blockId: 'estructura_costos', text: 'Salarios del personal corporativo, ingenieros de software y científicos de datos.', color: 'pink' },
      { id: 'ub_co_4', blockId: 'estructura_costos', text: 'Gastos legales, seguros y cumplimiento normativo regional.', color: 'green' }
    ]
  },
  {
    id: 'netflix',
    title: 'Netflix (Suscripción Directa)',
    description: 'La plataforma líder mundial de entretenimiento por streaming que ofrece acceso ilimitado a miles de películas, series y documentales originales.',
    notes: [
      { id: 'nx_vp_1', blockId: 'propuestas_valor', text: 'Acceso ilimitado a películas y series bajo demanda y libre de publicidad molesta.', color: 'yellow' },
      { id: 'nx_vp_2', blockId: 'propuestas_valor', text: 'Catálogo robusto de producciones originales exclusivas (Netflix Originals).', color: 'blue' },
      { id: 'nx_vp_3', blockId: 'propuestas_valor', text: 'Sistema de recomendaciones ultra-personalizado basado en hábitos de visualización.', color: 'green' },
      
      { id: 'nx_cs_1', blockId: 'segmentos_clientes', text: 'Fanáticos de maratones de series y cine en casa.', color: 'yellow' },
      { id: 'nx_cs_2', blockId: 'segmentos_clientes', text: 'Familias con niños pequeños (perfil infantil seguro).', color: 'blue' },
      { id: 'nx_cs_3', blockId: 'segmentos_clientes', text: 'Personas que prescinden de la televisión por cable tradicional.', color: 'green' },
      
      { id: 'nx_ch_1', blockId: 'canales', text: 'Aplicación de Netflix preinstalada en Smart TVs, consolas y reproductores de medios.', color: 'yellow' },
      { id: 'nx_ch_2', blockId: 'canales', text: 'Aplicación móvil (iOS/Android) y portal web oficial Netflix.com.', color: 'pink' },
      
      { id: 'nx_cr_1', blockId: 'relaciones_clientes', text: 'Relación 100% de autoservicio digital inteligente.', color: 'yellow' },
      { id: 'nx_cr_2', blockId: 'relaciones_clientes', text: 'Algoritmo predictivo interactivo que sugiere contenido relevante automáticamente.', color: 'green' },
      { id: 'nx_cr_3', blockId: 'relaciones_clientes', text: 'Canales oficiales de asistencia técnica por chat y teléfono.', color: 'pink' },
      
      { id: 'nx_rs_1', blockId: 'fuentes_ingresos', text: 'Suscripción recurrente mensual dividida por niveles de calidad (Estándar con anuncios, Estándar sin anuncios, Premium).', color: 'yellow' },
      
      { id: 'nx_kr_1', blockId: 'recursos_clave', text: 'Algoritmo propietario de recomendación personalizada de alta fidelidad.', color: 'yellow' },
      { id: 'nx_kr_2', blockId: 'recursos_clave', text: 'Derechos de propiedad intelectual y catálogo exclusivo de contenidos propios.', color: 'blue' },
      { id: 'nx_kr_3', blockId: 'recursos_clave', text: 'Marca icónica valorada globalmente.', color: 'pink' },
      
      { id: 'nx_ka_1', blockId: 'actividades_clave', text: 'Creación, producción y licenciamiento de series, películas y documentales.', color: 'yellow' },
      { id: 'nx_ka_2', blockId: 'actividades_clave', text: 'Desarrollo, escalabilidad y soporte técnico de la plataforma en la nube.', color: 'pink' },
      { id: 'nx_ka_3', blockId: 'actividades_clave', text: 'Campañas mundiales de marketing digital y promociones de lanzamientos estrella.', color: 'blue' },
      
      { id: 'nx_kp_1', blockId: 'socios_clave', text: 'Estudios de cine, productores de contenido independientes y directores de renombre.', color: 'yellow' },
      { id: 'nx_kp_2', blockId: 'socios_clave', text: 'Proveedores de servicios en la nube (especialmente AWS para infraestructura de streaming masivo).', color: 'blue' },
      { id: 'nx_kp_3', blockId: 'socios_clave', text: 'Fabricantes de Smart TVs y operadores de telefonía móvil para acuerdos de promoción.', color: 'green' },
      
      { id: 'nx_co_1', blockId: 'estructura_costos', text: 'Enormes inversiones financieras en la producción y compra de licencias de contenido.', color: 'yellow' },
      { id: 'nx_co_2', blockId: 'estructura_costos', text: 'Inversión publicitaria internacional y posicionamiento web.', color: 'blue' },
      { id: 'nx_co_3', blockId: 'estructura_costos', text: 'Sueldos de ingenieros, diseñadores de interfaz y personal administrativo.', color: 'pink' },
      { id: 'nx_co_4', blockId: 'estructura_costos', text: 'Tarifas por transmisión de datos, compresión de video y servicios de nube.', color: 'green' }
    ]
  }
];
