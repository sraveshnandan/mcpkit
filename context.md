# mcpkit --- Context.md

## Mission

Build **mcpkit** into the definitive developer toolkit for creating
production-ready Model Context Protocol (MCP) servers. The first public
release should feel complete, polished, and trustworthy---not like an
MVP.

## Product Vision

mcpkit should become the equivalent of **create-next-app** or
**create-react-app** for the MCP ecosystem.

The first release prioritizes: - Complete developer experience -
Beautiful documentation - Eye-catching landing page - Production-ready
scaffolding - Excellent CLI UX

Docker generation is intentionally postponed.

## Scope for v1.0

### Core CLI

-   `mcpkit init`
-   `mcpkit dev`
-   `mcpkit validate`
-   `mcpkit test`
-   `mcpkit docs`
-   `mcpkit build`
-   `mcpkit check-env`
-   `mcpkit ship`
-   `mcpkit --help`
-   `mcpkit --version`

### Included Features

-   TypeScript project scaffolding
-   Interactive setup wizard
-   MCP schema validation
-   Live development server
-   Test runner
-   Documentation generation
-   Deployment readiness checks
-   Production build pipeline
-   Great terminal UI
-   Helpful error messages

### Deferred

-   Docker generation
-   Python templates
-   Template marketplace
-   Analytics
-   Cloud deployment automation

## Documentation (Non-negotiable)

Documentation is part of the product.

Include: - Getting Started - Installation - Quick Start (under 2
minutes) - CLI Reference - Template Architecture - MCP Concepts -
Deployment Guide - Examples - API Reference - FAQ - Troubleshooting -
Changelog

Built with Fumadocs and optimized for search.

## Landing Page (Non-negotiable)

The landing page should: - Clearly communicate the problem - Demonstrate
the solution - Show CLI commands - Include animated screenshots/GIFs -
Highlight key features - Link to documentation - Include examples and
GitHub - Be fast (Lighthouse 95+) - Be responsive - Be SEO optimized

Suggested sections: 1. Hero 2. Problem 3. Solution 4. Features 5. Demo
6. Quick Start 7. Documentation 8. Examples 9. FAQ 10. Footer

## Quality Standards

-   TypeScript strict mode
-   ESLint + Prettier
-   Consistent architecture
-   Clear abstractions
-   Friendly CLI output
-   Actionable errors
-   Cross-platform support

## Release Checklist

Before publishing:

-   CLI commands work
-   Documentation complete
-   Landing page complete
-   README polished
-   MIT License
-   GitHub repository ready
-   npm package verified
-   Example projects included
-   Tests passing
-   Production build succeeds

## Success Criteria

A new developer should be able to:

1.  Install mcpkit.
2.  Create an MCP server within two minutes.
3.  Understand the generated project from the docs.
4.  Feel confident deploying it.

The product should be remembered for its developer experience,
documentation quality, and professional presentation---not just the
number of features.
