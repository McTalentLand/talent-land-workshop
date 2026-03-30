# Código que Obedece: Workshop de GitHub Copilot Instruction Files

> Repositorio de demostración para el taller sobre instruction files en GitHub Copilot.

---

## Requisitos previos

Antes del taller, asegúrate de tener instalado:

### 1. Node.js (versión 18 o superior)

Node.js es el entorno que permite ejecutar JavaScript/TypeScript fuera del navegador.

**Windows:**
1. Ve a [nodejs.org](https://nodejs.org/)
2. Descarga la versión **LTS** (Long Term Support)
3. Ejecuta el instalador y sigue los pasos (siguiente, siguiente, instalar)
4. Reinicia tu terminal

**Verificar instalación:**
```bash
node --version   # Debe mostrar v18.x.x o superior
npm --version    # Debe mostrar 9.x.x o superior
```

### 2. Visual Studio Code

**Instalación:**
1. Ve a [code.visualstudio.com](https://code.visualstudio.com/)
2. Descarga e instala

### 3. GitHub Copilot (extensión de VS Code)

**Instalación:**
1. Abre VS Code
2. Ve a Extensiones (Ctrl+Shift+X)
3. Busca "GitHub Copilot"
4. Instala **GitHub Copilot** y **GitHub Copilot Chat**
5. Inicia sesión con tu cuenta de GitHub (necesitas acceso a Copilot)

> **Nota:** Los estudiantes pueden obtener GitHub Copilot gratis con [GitHub Student Developer Pack](https://education.github.com/pack)

---

## Configuración del proyecto

### Paso 1: Descargar el repositorio

**Opción A: Clonar con Git**
```bash
git clone https://github.com/------
cd TalentLandWorkshop
```

**Opción B: Descargar ZIP**
1. Haz clic en el botón verde "Code" → "Download ZIP"
2. Extrae el archivo ZIP
3. Abre la carpeta extraída

### Paso 2: Abrir en VS Code

```bash
code .
```

O abre VS Code → Archivo → Abrir Carpeta → selecciona la carpeta del proyecto.

### Paso 3: Instalar dependencias

Abre la terminal integrada de VS Code (Ctrl+`` ` ``) y ejecuta:

```bash
npm install
```

Esto descargará todas las librerías necesarias (puede tardar 1-2 minutos).

### Paso 4: Ejecutar el proyecto

```bash
npm run dev
```

Deberías ver:
```
Server running on http://localhost:3000
```

Abre tu navegador en [http://localhost:3000](http://localhost:3000) para ver la UI de demo.

---

## Estructura del proyecto

```
TalentLandWorkshop/
├── .github/
│   ├── copilot-instructions.md      ← Instrucciones globales (siempre activas)
│   └── instructions/
│       └── tests.instructions.md    ← Instrucciones para archivos de test
├── src/
│   ├── menu/                        ← Dominio: menú del restaurante
│   │   ├── menuService.ts           ← Lógica de negocio
│   │   ├── menuRepository.ts        ← Acceso a datos
│   │   └── menuTypes.ts             ← Tipos TypeScript
│   ├── orders/                      ← Dominio: órdenes
│   │   └── orderService.ts
│   ├── routes/                      ← Endpoints de la API
│   └── shared/                      ← Utilidades compartidas
├── public/                          ← UI de demostración (HTML/CSS/JS)
├── Introduccion.md                  ← Material de la presentación
└── package.json                     ← Dependencias del proyecto
```

---

## Comandos útiles

| Comando | Qué hace |
|---------|----------|
| `npm install` | Instala dependencias |
| `npm run dev` | Ejecuta el servidor en modo desarrollo |
| `npm test` | Ejecuta las pruebas unitarias |
| `npm run build` | Compila TypeScript a JavaScript |

---

## Durante el taller

### Lo que exploraremos:

1. **Ver las instrucciones existentes:**
   - Abre `.github/copilot-instructions.md`
   - Abre `.github/instructions/tests.instructions.md`

2. **Demo de generación de código:**
   - Usaremos Copilot en modo Agent para agregar funcionalidad a `MenuService`

3. **Demo de generación de tests:**
   - Generaremos tests siguiendo los estándares definidos en las instrucciones

---

## Solución de problemas

### "npm no es reconocido como comando"
- Node.js no está instalado o no está en el PATH
- Reinicia VS Code después de instalar Node.js

### "No puedo usar GitHub Copilot"
- Verifica que iniciaste sesión en VS Code con tu cuenta de GitHub
- Verifica que tienes acceso a Copilot (GitHub Student Pack o suscripción)

### El servidor no inicia
- Verifica que el puerto 3000 no está ocupado por otra aplicación
- Intenta: `npm run dev -- --port 3001`

---

## Recursos

- [Documentación de GitHub Copilot](https://docs.github.com/en/copilot)
- [VS Code + Copilot Chat](https://code.visualstudio.com/docs/copilot/overview)
- [Material de la presentación](./Introduccion.md)
