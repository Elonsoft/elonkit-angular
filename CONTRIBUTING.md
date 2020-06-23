# Contributing to Elonkit

## Workflow

This project uses Gitflow Workflow.

### Feature branches

Each new feature should reside in its own branch. But, instead of branching off of master, feature branches use **develop** as their parent branch. When a feature is complete, it gets merged back into develop. Features should never interact directly with master.

```bash
git checkout -b feature/branch_name
```

### Bugfix branches

Similar to feature branches but, instead of introducing a new feature, they are used for bugfixes.

```bash
git checkout -b bugfix/branch_name
```

## Coding style

Please follow the coding style of the project. We use tslint, prettier and stylelint, so if possible, enable linting in your editor to get real-time feedback. When you submit a Pull Request, they are run again by our continuous integration tools.

## Commit Message Guidelines

The commit message should be structured as follows:

```
<type>[optional scope]: <description>
```

If a commit introduces a breaking change it should append a `!` after the type/scope:

```
refactor!: drop support for Node 6
```

### Type

Must be one of the following:

- build: Changes that affect the build system or external dependencies
- ci: Changes to our CI configuration files and scripts
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- test: Adding missing tests or correcting existing tests

### Scope

The scope should be the name of the component affected (as perceived by the person reading the changelog generated from commit messages).

### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end
