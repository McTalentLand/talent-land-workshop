
# Código que Obedece: Desarrollo escalable con IA

> **Sinopsis:** A través del uso de "instruction files", aprenderás a guiar a la IA para generar código profesional, escalable y alineado a estándares empresariales.

---

## McDonald's Global Technology

Que hacemos en el Hub Tecnológico Global en Mexico?
- Desarrollamos nuevos feature con alcance Global
- Utilizamos diferentes tecnologías:
  - C#, TypeScript, React, C++ entre otros.
- Nuestro desarrollo soporta 69 millones de clientes al día en todo el mundo.  

## Pre requisitos
- Tener una cuenta de Github Copilot 
- Descargar el repositorio 
![Alt text](C:\Repos\TalentLandWorkshop\TalentLandWorkshop\repo_qr_code.png)
- Visual Studio Code
- Node Js (latest)
- Github Copilot Extension

## SECCIÓN 1: Contexto — IA 

### La IA como tu compañero de código

Imagina que tienes un compañero de equipo que:
- Ha leído millones de líneas de código
- Puede escribir código en cualquier lenguaje
- Está disponible 24/7
- Pero... **no conoce las reglas de Tu proyecto**

### Existen diferentes herramientas de IA para codificar:
- Github Copilot
- Cursor
- Amazon Q
- Gemini

### ¿Qué es un prompt?

Es la instrucción que le das a la IA:
```
❌ "Escribe una función que valide emails"
✅ "Escribe una función en TypeScript que valide emails, retorne un valor boolean, y lance un error si el input es null"
```

### La Importancia del Contexto 
- Le dice a la IA que patrones aplicar y cuales no
- No conoce el objetivo de tu proyecto
- Reduce el número de "hallucinations"
- Conecta el código generado con la intención del negocio.

### Modos de interacción con GitHub Copilot

| Modo | Para qué sirve |
|------|----------------|
| **Ask** | Hacer preguntas, pedir explicaciones |
| **Edit** | Seleccionas código y pides cambios puntuales |
| **Agent** | Modo autónomo: lee archivos, ejecuta comandos, encadena acciones |
| **Plan** | El agente genera un plan y pide aprobación antes de ejecutar |

--- (Pregunta hacia el publico)

------------------------------------------------------------------------

## SECCIÓN 2: El problema — ¿Por qué necesitamos instrucciones?

### Sin instrucciones: código inconsistente

Imagina que 2 desarrolladores le piden a Copilot: *"Escribe un unit test para esta función"*

**Desarrollador 1 recibe:**
```typescript
import { expect } from 'chai';
test('should work', () => {
  expect(suma(2,2)).toBe(4);
});
```

**Desarrollador 2 recibe:**
```typescript
import { expect } from 'chai';
describe('Suma Function', function() {
  it('should add two numbers', function() {
    expect(suma(2,2)).to.equal(4);
  });
});
```

--- (Pregunta hacia el publico)

**¿El resultado?** 
- 2 estilos diferentes
- Distintas implementaciones de las librerias
- Unit test generica vs Unit Test que puede englobar distintos escenarios

### El problema real en equipos de desarrollo

| Sin contexto | Con contexto |
|-------------------|-------------------|
| Cada dev recibe sugerencias diferentes | Todos reciben sugerencias alineadas |
| El nuevo integrante no sabe las convenciones | Copilot ya conoce las reglas |
| Code reviews llenos de "cámbialo a nuestro estilo" | El código ya viene en el estilo correcto |
| OnBoarding de un nuevo dev nos toma de 2 a 4 meses | Reducimos el onboardin a 1 solo mes |

---

## SECCIÓN 3: La solución — Instruction Files

### ¿Qué es un Instruction File?

Es un archivo de texto donde le dices a IA: **"En este proyecto, las cosas se hacen así"**

Piénsalo como:
- El **README** que la IA realmente lee
- Las **reglas del equipo** codificadas
- Un **onboarding automático** para Copilot

### El archivo más importante: `copilot-instructions.md`

Existe un archivo especial que una vez creado **siempre está activo** en todo el repositorio:

```
.github/copilot-instructions.md
```

Este archivo contiene las instrucciones globales del proyecto. Todo lo que escribas aquí, Copilot lo leerá **siempre**, sin importar qué archivo estés editando.

> Es como el "contrato base" entre tu equipo y la IA.

### Cómo generar tu `copilot-instructions.md` automáticamente

Puedes pedirle a Copilot que analice tu código y **genere las instrucciones por ti**. Usa este prompt en modo Agent:

```
Analiza este codebase para generar o actualizar `.github/copilot-instructions.md` 
que guíe a agentes de IA.

Enfócate en descubrir el conocimiento esencial para que un agente de IA sea 
productivo inmediatamente en este proyecto. Considera:

- La arquitectura "big picture": componentes principales, límites de servicios, 
  flujos de datos y el "porqué" detrás de las decisiones estructurales
- Flujos de trabajo críticos (builds, tests, debugging) especialmente comandos 
  que no son obvios solo inspeccionando archivos
- Convenciones y patrones específicos del proyecto que difieren de prácticas comunes
- Puntos de integración, dependencias externas y patrones de comunicación

Lineamientos:
- Si `.github/copilot-instructions.md` ya existe, fusiona inteligentemente
- Escribe instrucciones concisas y accionables (~20-50 líneas) usando markdown
- Incluye ejemplos específicos del codebase al describir patrones
- Evita consejos genéricos ("escribe tests", "maneja errores") - enfócate en 
  los enfoques ESPECÍFICOS de este proyecto
- Documenta solo patrones descubribles, no prácticas aspiracionales

Actualiza `.github/copilot-instructions.md` y luego pide retroalimentación.
```

> **Tip:** Este prompt funciona mejor en modo **Agent** porque necesita leer múltiples archivos.

### Anatomía de un Instruction File

```markdown
---
applyTo: "**/*.spec.ts"
description: "Reglas para archivos de pruebas unitarias"
---

# Estándares de Testing

- Usar Jest como framework de testing
- Estructura AAA: Arrange, Act, Assert
- Nombres descriptivos en español
- Un archivo de test por cada archivo de código
```

### Glosario rápido

| Término | Significado | Ejemplo |
|---------|-------------|---------|
| **Frontmatter** | La sección entre `---` al inicio | Contiene `applyTo`, `description` |
| **applyTo** | ¿A qué archivos aplican estas reglas? | `**/*.ts` = todos los archivos TypeScript |
| **description** | Ayuda a Copilot a decidir si usar este contexto | Reglas para archivos de pruebas unitarias |
| **Glob pattern** | Patrón para seleccionar archivos | `src/**/*.test.ts` = tests en src/ |

---



## SECCIÓN 4: Dos niveles de instrucciones (Esto quizas se pueda quitar)

### Nivel 1: Personal (solo tú)

- **Ubicación:** `C:\Users\TU_USUARIO\AppData\Roaming\Code\User\prompts\`
- **Uso:** Tus preferencias personales (idioma, estilo de código)
- **Requiere:** frontmatter con `alwaysApply: true`

```markdown
---
alwaysApply: true
---
# Mis preferencias
- Responde siempre en español
- Prefiero funciones arrow
```

### Nivel 2: Repositorio (todo el equipo) 

**Opción A: Instrucciones globales** (sin frontmatter)
- **Ubicación:** `.github/copilot-instructions.md`
- **Se aplica:** Siempre, en todo el repositorio

```markdown
# Convenciones del proyecto
- TypeScript + Express con clases
- Validar inputs, retornar 400 en errores
```

**Opción B: Instrucciones por tipo de archivo** (con frontmatter)
- **Ubicación:** `.github/instructions/*.instructions.md`
- **Se aplica:** Solo cuando editas archivos que coinciden con `applyTo`

```markdown
---
applyTo: "**/*.spec.ts"
---
# Testing en este proyecto
- Framework: Jest
- Patrón: AAA + test.each para matrices
```

> **Nota:** También existe el nivel **Organización** para empresas, pero no lo cubriremos hoy.

---

--- (Pregunta hacia el publico)

## SECCIÓN 5: Demo en vivo — Instruction Files en acción

### Estructura del repositorio de demo

```
.github/
  copilot-instructions.md           ← Convenciones generales
  instructions/
    tests.instructions.md           ← Estándares de testing
src/
  menu/
    menuService.ts                  ← Servicio que modificaremos
    menuService.spec.ts             ← Tests que generaremos
```

### Instruction files del proyecto

**`.github/copilot-instructions.md`** (siempre activo, sin frontmatter):
```markdown
# Convenciones del proyecto
- TypeScript + Express con diseño basado en clases
- Código de dominio bajo `src/menu` y `src/orders`
- Usar clases para repositorios y servicios
- Validar inputs y retornar 400 en errores de validación
```

**`.github/instructions/tests.instructions.md`** (solo en archivos `.spec.ts`):
```markdown
---
applyTo: "**/*.spec.ts"
description: "Estándares de testing"
---
# Testing
- Jest + supertest, patrón AAA
- Usar `test.each` para matrices de validación
- Preferir repositorios in-memory sobre mocks
```

---

### Demo 1: Generación de código

**Contexto:** El `MenuService` actual solo tiene `getMenu()` y `getItem()`. Queremos agregar filtrado por categoría.

**Prompt para Copilot (modo Agent):**

```
Agrega un método `getItemsByCategory(category: string)` al MenuService 
que retorne solo los items de esa categoría.
```

**Sin instrucciones**, Copilot podría generar:
```typescript
// ❌ Función suelta, no sigue el patrón de clases
function getItemsByCategory(menu: MenuItem[], category: string) {
  return menu.filter(item => item.category === category);
}
```

**Con instrucciones**, Copilot genera:
```typescript
// ✅ Método de clase, usa el repositorio inyectado
export class MenuService {
  constructor(private readonly repo: MenuRepository) {}

  getItemsByCategory(category: string): MenuItem[] {
    return this.repo.getAll().filter(item => item.category === category);
  }
}
```

> **Punto clave:** Las instrucciones le dicen a Copilot que usamos *clases* y *repositorios*.

---

### Demo 2: Generación de unit tests

**Contexto:** Queremos generar tests para el método `getItem()` del MenuService.

**Prompt para Copilot (modo Agent):**

```
Genera tests unitarios para el método getItem() de MenuService.
Incluye casos: item existe, item no existe, id inválido.
```

**Sin instrucciones**, Copilot podría generar:
```typescript
// ❌ Mock pesado, sin AAA, nombres en inglés
jest.mock('./menuRepository');

describe('MenuService', () => {
  it('should return item', () => {
    const mockRepo = { getById: jest.fn().mockReturnValue({ id: '1' }) };
    const service = new MenuService(mockRepo as any);
    expect(service.getItem('1')).toBeDefined();
  });
});
```

**Con instrucciones**, Copilot genera:
```typescript
// ✅ Repositorio in-memory, patrón AAA, table-driven
import { MenuService } from './menuService';
import { InMemoryMenuRepository } from './menuRepository';

describe('MenuService', () => {
  describe('getItem', () => {
    test.each([
      { id: 'burger-01', expected: true, description: 'retorna item cuando existe' },
      { id: 'invalid-99', expected: false, description: 'retorna undefined cuando no existe' },
    ])('$description', ({ id, expected }) => {
      // Arrange
      const repo = new InMemoryMenuRepository();
      const service = new MenuService(repo);
      
      // Act
      const result = service.getItem(id);
      
      // Assert
      if (expected) {
        expect(result).toBeDefined();
      } else {
        expect(result).toBeUndefined();
      }
    });
  });
});
```

> **Punto clave:** Las instrucciones especifican: AAA, `test.each`, repos in-memory (no mocks).

---

### Resumen de la demo

| Aspecto | Sin instrucciones | Con instrucciones |
|---------|-------------------|-------------------|
| **Estilo de código** | Funciones sueltas | Métodos de clase |
| **Dependencias** | `jest.mock()` | Repositorios in-memory |
| **Estructura de tests** | Ad-hoc | AAA + table-driven |
| **Consistencia** | Variable | Alineada al proyecto |

---

## SECCIÓN 6: Cierre

### El prompt es el nuevo README

> Un README tradicional le dice al humano cómo trabajar.  
> Un instruction file le dice a la IA cómo ayudarte.

### Limitaciones

- **No son mágicas:** Instrucciones vagas = resultados inconsistentes
- **Contexto limitado:** Demasiadas instrucciones = algunas se ignoran
- **Conflictos:** Instrucciones contradictorias = comportamiento impredecible

---

## Recursos

- [Documentación oficial de GitHub Copilot](https://docs.github.com/en/copilot)
- Este repositorio: explora `.github/instructions/`

---

## FAQ (para el Q&A, no exponer)

- **¿Copilot siempre sigue las instrucciones?** No al 100%. Son guías, no reglas absolutas.
- **¿Funcionan con otros editores?** Son específicas de VS Code con GitHub Copilot.
- **¿Cuántas instrucciones puedo tener?** Sin límite, pero Copilot prioriza las más relevantes.


