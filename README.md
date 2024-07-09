# Routerix

Routerix is a UI for your routes. Its simple for developers and accessible to other teams. No code is required.

## ___VIDEO GOES HERE___

## Getting Started

### 1. Install the library

```sh
pnpm install routerix
```

### 2. Create the config file

Optional step if using CLI args. Its possible to pass all config parameters via CLI. Its not possible yet to split config between file and CLI args. Choose one approach.

```sh
pnpm routerix init
```

### 3. Generate the files

With config file

```sh
pnpm routerix generate
```

Without config file

```sh
pnpm routerix generate --provider nextjs-app --rootPath ./src/app
```

### 3. Access your routes UI

Now you have a folder called __.routerix__ in your project. This is the static UI for your routes.

You can visualize it locally with a local server. Deploy it to a bucket in your CI. Its your decision.

### Supported frameworks

| Framework     | CLI Argument     |
|---------------|------------------|
| Next.js App   | nextjs-app       |
