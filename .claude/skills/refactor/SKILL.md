# Refactor Skill

## Purpose
Improve code structure without changing behavior.
Focused on maintainability, readability, and performance.

## When to Use
- Code review feedback
- Tech debt cleanup
- Pre-feature prep

## Principles

1. **Preserve behavior**
   Tests must pass before and after.

2. **Small commits**
   One refactor per commit for easy review/revert.

3. **Update tests**
   If refactoring changes internal structure, update unit tests.

4. **Document why**
   Commit message explains the improvement.

## Common Refactors

- Extract shared logic to utilities
- Simplify complex conditionals
- Improve type safety
- Reduce component prop drilling
- Consolidate duplicate code

## Workflow

1. Identify refactor target
2. Ensure test coverage exists
3. Make changes incrementally
4. Verify tests pass after each change
5. Create focused PR with clear description
