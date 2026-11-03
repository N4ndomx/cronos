---
name: Billiard Club Operations
colors:
  surface: '#f7f9ff'
  surface-dim: '#d7dadf'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f9'
  surface-container: '#ebedf4'
  surface-container-high: '#e5e8ee'
  surface-container-highest: '#dfe2e8'
  on-surface: '#181c20'
  on-surface-variant: '#43474d'
  inverse-surface: '#2d3135'
  inverse-on-surface: '#eef1f6'
  outline: '#73777e'
  outline-variant: '#c3c7ce'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#2d6a4f'
  on-primary-container: '#d8f3dc'
  inverse-primary: '#a5d0b9'
  secondary: '#51625a'
  on-secondary: '#ffffff'
  secondary-container: '#e8f5e9'
  on-secondary-container: '#1b4332'
  tertiary: '#002d19'
  on-tertiary: '#ffffff'
  tertiary-container: '#d1e7dd'
  on-tertiary-container: '#0a3622'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#410002'
  primary-fixed: '#2d6a4f'
  primary-fixed-dim: '#1b4332'
  on-primary-fixed: '#ffffff'
  on-primary-fixed-variant: '#b7e4c7'
  secondary-fixed: '#d4e7dc'
  secondary-fixed-dim: '#b8cbc1'
  on-secondary-fixed: '#0f1f18'
  on-secondary-fixed-variant: '#3a4a43'
  tertiary-fixed: '#b0f1c7'
  tertiary-fixed-dim: '#95d4ac'
  on-tertiary-fixed: '#002111'
  on-tertiary-fixed-variant: '#0f5132'
  background: '#f7f9ff'
  on-background: '#181c20'
  surface-variant: '#e0e3e8'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

---
name: Billiard Club Operations
colors:
  surface: '#f7f9ff'
  surface-dim: '#d7dadf'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f9'
  surface-container: '#ebedf4'
  surface-container-high: '#e5e8ee'
  surface-container-highest: '#dfe2e8'
  on-surface: '#181c20'
  on-surface-variant: '#43474d'
  outline: '#73777e'
  outline-variant: '#c3c7ce'
  primary: '#1b4332'
  on-primary: '#ffffff'
  primary-container: '#2d6a4f'
  on-primary-container: '#d8f3dc'
  primary-fixed: '#2d6a4f'
  primary-fixed-dim: '#1b4332'
  on-primary-fixed: '#ffffff'
  on-primary-fixed-variant: '#b7e4c7'
  secondary: '#24342d'
  on-secondary: '#ffffff'
  secondary-container: '#e8f5e9'
  on-secondary-container: '#1b4332'
  secondary-fixed: '#d8f3dc'
  secondary-fixed-dim: '#b7e4c7'
  on-secondary-fixed: '#081c15'
  on-secondary-fixed-variant: '#1b4332'
  tertiary: '#0f5132'
  on-tertiary: '#ffffff'
  tertiary-container: '#d1e7dd'
  on-tertiary-container: '#0a3622'
  tertiary-fixed: '#d1e7dd'
  tertiary-fixed-dim: '#a3cfbb'
  on-tertiary-fixed: '#051b11'
  on-tertiary-fixed-variant: '#0a3622'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#410002'
typography:
  font-family: 'Inter', system-ui, -apple-system, sans-serif
  headings:
    font-family: 'Inter', system-ui, -apple-system, sans-serif
    weight: '700'
  body:
    font-family: 'Inter', system-ui, -apple-system, sans-serif
    weight: '400'
  label:
    font-family: 'Inter', system-ui, -apple-system, sans-serif
    weight: '600'
roundness: 8px
layout:
  target_device: 'mobile'
  max_width: '420px'
  padding: '16px'
navigation:
  type: 'bottom-tab-bar'
  standard_tabs:
    - id: 'mesas'
      label: 'Mesas'
      icon: 'grid_view'
      description: 'Matriz visual de mesas, ocupación, inicio y cronómetros activos'
    - id: 'caja'
      label: 'Caja'
      icon: 'point_of_sale'
      description: 'Control de caja activa, balance operativo, movimientos y corte de turno'
    - id: 'gestion'
      label: 'Gestión'
      icon: 'table_restaurant'
      description: 'Inventario físico de mesas, tipos de servicios y tarifas por hora'
    - id: 'configuracion'
      label: 'Configuración'
      icon: 'settings'
      description: 'Ajustes del local, monedas, impresoras POS de tickets y seguridad'
---

# Billiard Club Operations — Design System & Directrices

## 1. Filosofía de Diseño
- **Público Objetivo**: Administradores y operadores de salón (personas de 35 años en adelante).
- **Enfoque Visual**: Minimalista, sobrio, descansado, sin fatiga visual ni animaciones estridentes.
- **Tipografía y Legibilidad**: `Inter` con tamaños jerárquicos generosos (`text-2xl`/`text-3xl` para números clave y precios, `text-sm`/`text-base` para textos de interfaz). Evita textos diminutos o de bajo contraste.
- **Color Clave**: Verde Bosque Institucional (`#1b4332`) y Verde Billar Clásico con fondos limpios (`#f7f9ff` y `#ffffff`).

## 2. Estandarización de la Barra de Navegación Inferior (Bottom Navigation Bar)
Para asegurar consistencia total en toda la aplicación móvil y corregir variaciones previas (donde algunas vistas tenían 3 pestañas y otras 4), la barra inferior fija queda **estandarizada exactamente en 4 pestañas operativas**:

1. **Mesas** (`icon: grid_view` / icono de cuadrícula de mesas):
   - Acceso al panel general y matriz visual de mesas, tiempos y ocupación en vivo.
2. **Caja** (`icon: point_of_sale` / icono de registradora):
   - Saldo en gaveta, métodos de pago (Efectivo, Datáfono, QR), cobros recientes y acceso al corte/cierre de turno.
3. **Gestión** (`icon: table_restaurant` o `inventory_2`):
   - Mantenimiento y configuración del parque de mesas, modalidades (Pool, Tres Bandas, Snooker) y esquema tarifario.
4. **Configuración** (`icon: settings`):
   - Parámetros del sistema, redondeo de cobro, impresión de tickets/comandas, datos del club y código PIN.

### Estilo de la Barra Inferior:
- Posición fija en la base (`fixed bottom-0 left-0 right-0`).
- Fondo blanco (`#ffffff`) con borde superior sutil (`border-t border-slate-200/80`).
- Altura ergonómica de 64px–72px con padding táctil amplio (mínimo 48px por botón táctil).
- Pestaña activa: Color `#1b4332`, icono relleno o de trazo reforzado con texto en peso `font-semibold`.
- Pestañas inactivas: Color neutro `#73777e` / `#64748b`, peso `font-medium`.

## 3. Patrones de Pantallas y Flujos
1. **Pantallas Principales (Con Barra de Navegación Inferior)**:
   - *Panel de Mesas* (Matriz visual de ocupación).
   - *Caja y Control de Turno* (Flujo financiero activo).
   - *Gestión de Mesas y Servicios* (Catálogo y tarifas).
   - *Configuración del Sistema* (Ajustes de terminal y negocio).

2. **Flujos Modales / Tareas Guiadas (Sin Barra de Navegación Inferior)**:
   - Se reemplaza la barra inferior por un botón de acción principal adherido abajo (`fixed bottom-0` o barra de acción destacada).
   - *Flujo de Apertura de Mesa*: Paso 1 (Selección) → Paso 2 (Jugadores) con botón directo "▶ Iniciar Mesa".
   - *Flujo de Cobro de Mesa*: Resumen de tiempo y consumos de bar, cobro fraccionado por jugador y botón "Cobrar y Liberar Mesa".
   - *Flujo de Corte de Caja*: Pasos de arqueo guiado (Gaveta, Electrónicos, Destino) y botón "Imprimir y Cerrar Turno".

## 4. Componentes y Botones
- **Botones Primarios**: Fondo `#1b4332`, texto blanco, esquinas redondeadas (`rounded-lg` / 8px), altura táctil mínima de 48px.
- **Tarjetas y Módulos**: Fondos en blanco (`#ffffff`), bordes limpios `border border-slate-200/70` o fondos suaves `bg-[#f1f4f9]`, sin sombras pesadas.
- **Acciones Rápidas**: Entrada directa sin pasos superfluos; campos de texto simplificados para nombres y teclados numéricos rápidos (`+10k`, `+20k`, `+50k`).
