# Geolocalización IP con React

Este proyecto es una aplicación web desarrollada con React, Vite y TypeScript que permite obtener información detallada sobre cualquier dirección IP pública utilizando la API de IPStack. Incluye visualización en mapa, datos de localización, zona horaria, moneda, conexión y seguridad.

## Características principales

- **Búsqueda de IP:** Ingresa cualquier dirección IP pública para obtener su información.
- **Detección automática:** Permite detectar y mostrar la información de tu IP actual.
- **Visualización en mapa:** Muestra la ubicación geográfica de la IP usando Leaflet.
- **Datos completos:** Incluye país, ciudad, región, zona horaria, moneda, tipo de conexión y nivel de seguridad, la correcta visualizacion depende enteramente del **tipo de plan que tengas**
- **Interfaz moderna:** Construida con React, TailwindCSS y componentes reutilizables.

## Estructura del proyecto

```
mi-proyecto-react/
├── src/
│   ├── api/                # Lógica de integración con la API de IPStack
│   ├── components/         # Componentes reutilizables (UI, resultados, mapa)
│   ├── hooks/              # Hooks personalizados (useIpData)
│   ├── pages/              # Páginas principales (IPLookupPage)
│   ├── utils/              # Utilidades auxiliares
│   ├── types/              # Tipos TypeScript
│   └── main.tsx, App.tsx   # Entradas principales de la app
├── public/                 # Archivos estáticos
├── package.json            # Dependencias y scripts
├── vite.config.ts          # Configuración de Vite
└── ...
```

## Instalación

1. **Clona el repositorio:**

```bash
git clone https://github.com/JYPPZ/Front-con-api-publica.git
cd Front-con-api-publica
```

2. **Instala las dependencias:**

```bash
npm install
```

3. **Configura las variables de entorno:**

Crea un archivo `.env.local` en la raíz del proyecto y agrega tu API key de IPStack:

```
VITE_IPSTACK_API_KEY=tu_api_key_aqui
```

Puedes obtener una API key gratuita en [ipstack.com](https://ipstack.com/).

## Uso

### Modo desarrollo

```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

### Build para producción

```bash
npm run build
```

### Vista previa de producción

```bash
npm run preview
```

### Linter

```bash
npm run lint
```

## Dependencias principales

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Leaflet](https://leafletjs.com/) (mapas)
- [Lucide React](https://lucide.dev/)

## Notas
- Es necesario contar con una API key válida de IPStack para que la aplicación funcione correctamente.
- El proyecto utiliza variables de entorno gestionadas por Vite (`VITE_`).
- El diseño es responsive y se adapta a dispositivos móviles y escritorio.

---

¡Listo! Ahora puedes buscar información de cualquier IP pública de forma sencilla y visual.
