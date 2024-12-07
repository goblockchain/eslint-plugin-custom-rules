# eslint-plugin-goblock-custom-rules

ESLint plugin to enforce pattern rules in Clean Architecture. Currently enforces that `find*` operations are only defined within repository layer files.

## Installation

```bash
npm install --save-dev eslint-plugin-goblock-custom-rules
# or
yarn add -D eslint-plugin-goblock-custom-rules
```

## Usage

### ESLint Flat Config (>= 8.21.0)

```javascript
// eslint.config.js
import repositoryPlugin from "eslint-plugin-goblock-custom-rules";

export default [
  {
    files: ["src/**/*.ts"],
    plugins: {
      repository: repositoryPlugin,
    },
    rules: {
      "repository/no-find-outside-repository": "error",
    },
  },
];
```

### Traditional Config

```javascript
// .eslintrc.js
module.exports = {
  plugins: ["eslint-plugin-goblock-custom-rules"],
  rules: {
    "eslint-plugin-goblock-custom-rules/no-find-outside-repository": "error",
  },
};
```

## Rules

### `no-find-outside-repository`

Ensures that functions starting with `find` are only defined within repository files.

#### ✅ Correct

```typescript
// user.repository.ts
export class UserRepository {
  async findAll() {
    // Allowed in repository files
    return this.users.find();
  }
}
```

#### ❌ Incorrect

```typescript
// user.service.ts
export class UserService {
  async findAll() {
    // Error: find operations should be in repository layer
    return this.users.find();
  }
}
```

```typescript
// user.controller.ts
export class UserController {
  async findById() {
    // Error: find operations should be in repository layer
    return this.service.findById();
  }
}
```

## License

MIT © [goBlockchain](https://github.com/goblockchain)
