Guía rápida de auditoría del proyecto
====================================

1) Propósito y alcance
- Validar integridad del código, seguridad, calidad y trazabilidad de cambios en frontend, backend, pruebas y docs.

2) Preparación
- Requisitos: Node 18+, npm. Instala dependencias: `npm install`.
- Variables sensibles en `.env` (no versionadas); verificar existan ejemplos o documentación en `services/backend/config`.
- Base de datos: revisar `services/backend/initDatabase.ts` y `services/backend/test/seedData.ts` para conocer seeds y fixtures.

3) Estructura del proyecto (vista resumida)
- `app/`          Next.js (páginas, rutas API).
- `components/`   UI reutilizable (formularios, datagrids, dashboards, etc.).
- `hooks/`        Hooks de datos y UI.
- `lib/`          Utilidades (axios, errores, sesiones, definiciones).
- `services/backend/`  Modelos Sequelize, asociaciones, configuración y scripts de inicialización.
- `types/`        Tipado compartido (forms, datagrid, modal, etc.).
- `@tests/`       Pruebas API y unitarias (Jest).
- `docs/`         Sitio de documentación (Docusaurus).
- `public/`       Assets estáticos y docs generados.
- Configuración raíz: `next.config.ts`, `tailwind.config.ts`, `jest.config.ts`, `tsconfig.json`, `package.json`.

4) Frontend (Next.js)
- Rutas principales en `app/` (dashboard, login, reports). Revisar `app/api/*` para endpoints Edge/Server.
- Componentes de negocio en `components/*` (ej. `ModuleDataGrid`, `ModuleForm`, `Settings`, `Stock`).
- Diseño orientado a interfaces: los componentes se construyen contra contratos tipados en `types/*` (ej. `types/form/form.ts`, `types/datagrid/datagrid.ts`, `types/autocomplete/autocomplete.ts`). Esto permite sustituir/añadir módulos sin romper implementaciones, siempre que respeten el contrato (props, callbacks y shape de datos).
- Ejemplo: un módulo nuevo define su config en `components/Service/config.ts` siguiendo el contrato de `FormDefinition` y `DataGridDefinition`; luego `ModuleForm` y `ModuleDataGrid` renderizan la UI reutilizando lógica de validación, fetch y acciones sin duplicar código. Auditar que las props cumplan el contrato y que no existan dependencias implícitas fuera de la interfaz.
- Verifica control de sesión y roles en `lib/session.ts` y middleware.
- UI/UX: consistencia de formularios, validaciones y manejo de errores.

5) Backend (services/backend)
- Modelos y asociaciones en `services/backend/models/*` y `associations.ts`; comprobar llaves foráneas y cascadas.
- Configuración de acceso/roles en `config/createAccess.ts`.
- Seeds y datos de prueba en `test/seedData.ts`; validar coherencia con modelos.
- Revisar manejo de errores y respuestas HTTP en controladores/servicios bajo `services/backend`.

6) Datos y seguridad
- Confirmar cifrado/hashed de credenciales y almacenamiento seguro de tokens.
- Revisar uso de variables de entorno y ausencia de secretos en el repositorio.
- Validar sanitización de inputs en endpoints y formularios.

7) Pruebas y calidad
- Ejecutar linters/format si existen scripts en `package.json`.
- Correr pruebas: `npm test` (ver `@tests` y configuración Jest). Registrar resultados y cobertura si disponible.
- Revisar fixtures en `@tests/api` y `@tests/unit` para asegurar representatividad.

8) Documentación y trazabilidad
- Revisar `docs/` y `public/docs` para guía de uso y APIs; asegurar versiones actualizadas.
- Verificar comentarios y tipos en `types/*` y `lib/definitions.ts` como fuente de contrato.
- Registrar hallazgos con referencia a archivos/rutas y sugerir correcciones.

9) Entregables de auditoría
- Informe con hallazgos categorizados (bloqueantes, mayores, menores).
- Evidencia: rutas de archivo, fragmentos relevantes, pasos para reproducir.
- Recomendaciones priorizadas y, de ser posible, PRs o parches propuestos.
