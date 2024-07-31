# Routerix

Routerix is a UI for your routes. Its simple for developers and accessible to other teams. No code is required.

![ezgif-5-05e9b89d18](https://github.com/rafapignataro/routerix/assets/16678782/c7886698-fe24-4745-8825-909f4d9f7c37)

## Getting Started

Routerix is a CLI. Its necessary to install it and with 1 command its possible to automatically generate a UI for your routes. Check the [__Supported frameworks__](#supported-frameworks) section for current support.

## 1. Install

```sh
pnpm install routerix
```

## 2. Configuration

Generate the config file __routerix.config.js__. This is an __Optional step__ if using CLI args. It's not possible to split config between config file and CLI args. Choose one approach.

```sh
pnpm routerix init
```

### Arguments

|                  |                  |
|------------------|------------------|
| __rootPath__     | Routes root folder        |
| __provider__     | Project framework key ([__Supported frameworks__](#supported-frameworks))       |

## 3. Generate the UI

With config file

```sh
pnpm routerix generate
```

Without config file (example)

```sh
pnpm routerix generate --rootPath ./src/app --provider nextjs-app 
```

## 3. Access your routes UI

Now you have a folder called __.routerix__ in your project. This is the static UI for your routes.

You can visualize it locally with a local server. Deploy it to a bucket in your CI. Its your decision.

## Supported frameworks

| Framework     | CLI Argument     |
|---------------|------------------|
| Next.js App   | nextjs-app       |

## Next steps

- Add more providers
- Improve current features
- Get feedback :)
