<div align="center">
  <h2>
      Weather API 🌦️
</h2>
</div>

<div align="center">
    <a href="#🚀-empezar">
        Empezar
    </a>
    <span>&nbsp;✦&nbsp;</span>
    <a href="#🧞-comandos">
        Comandos
    </a>
    <span>&nbsp;✦&nbsp;</span>
    <a href="#🔑-licencia">
        Licencia
    </a>
    <span>&nbsp;✦&nbsp;</span>
    <a href="https://github.com/brandonjcg">
        Personal
    </a>
   
</div>

<p></p>

## 🛠️ Stack

- [**NestJS**](https://nestjs.com/) - Framework de JS potente y ligero para construir aplicaciones web
- [**Redis**](https://reactjs.org/) - Base de datos en memoria
- [**Typescript**](https://www.typescriptlang.org/) - JavaScript con sintaxis de tipado

## 🚀 Empezar

### 1. Clonar el repo [weather-api](https://github.com/brandonjcg/weather-api)

- Yo uso [pnpm](https://pnpm.io/installation) como gestor de dependencias y empaquetador.

```bash
# Activa pnpm en MacOS, WSL & Linux:
corepack enable
corepack prepare pnpm@latest --activate

# Inicializa el proyecto
git clone https://github.com/brandonjcg/weather-api
```

### 2. Instalar dependencias

```bash
# Instala las dependencias
pnpm install
```

### 3. Lanza el servidor de desarrollo:

```bash
# Disfruta del resultado
pnpm dev
```

1. Abre [**http://localhost:5001**](http://localhost:5001/) en tu navegador para ver el resultado 🚀

## 🧞 Comandos

|     | Comando     | Acción                                                                       |
| :-- | :---------- | :--------------------------------------------------------------------------- |
| ⚙️  | `start:dev` | Lanza un servidor de desarrollo local en `localhost:5001`.                   |
| ⚙️  | `build`     | Comprueba posibles errores y hace un empaquetado de producción en `./dist/`. |
| ⚙️  | `prod`      | Servidor empaquetado en el host: `localhost:5001`                            |

## Desplegar a producción 🚀

Para desplegar a producción, sigue estos pasos:

1. Crea un Merge Request (MR) hacia la rama `main`
2. Una vez aprobado y mergeado el MR, Vercel automáticamente desplegará la aplicación en producción en el cloud de Vercel

## 🔑 Licencia

[MIT](LICENSE.txt) - Creado por [**brandonjcg**](https://github.com/brandonjcg)
