# Chatter UI

A modern, real-time chat application built with React, TypeScript, and GraphQL. This frontend application provides a scalable foundation for production-grade chat functionality with real-time messaging capabilities.

## 🚀 Tech Stack

### Core Technologies
- **React 18.3** - Modern React with hooks and concurrent features
- **TypeScript 5.6** - Type-safe development with strict mode enabled
- **Vite 6.0** - Fast build tool and development server
- **Material-UI 6.4** - Comprehensive component library with dark theme support
- **Apollo Client 3.12** - GraphQL client with caching and subscriptions
- **React Router 7.1** - Declarative routing for React applications
- **GraphQL WS 5.5** - WebSocket support for real-time subscriptions

### Development Tools
- **ESLint 9.17** - Code linting with TypeScript and React plugins
- **Prettier 3.0** - Code formatting
- **pnpm 9.4** - Fast, disk space efficient package manager

## 📁 Project Structure

The project follows **Atomic Design Principles** with a clear separation of concerns:

```
src/
├── components/
│   ├── molecule/          # Small, reusable UI components
│   ├── organism/          # Complex components composed of molecules
│   └── template/          # Page-level layout components
├── constants/             # API paths, GraphQL queries, Apollo config
├── contexts/              # React Context providers (Auth, Chats, Profile)
├── dto/                   # Data Transfer Objects for type safety
├── helpers/               # Utility functions and helpers
├── hooks/                 # Custom React hooks
├── hoc/                   # Higher-Order Components (Router)
├── pages/                 # Page components
├── stores/                # Apollo reactive variables for state
└── types/                 # TypeScript type definitions
```

## 🏗️ Architecture Analysis

### ✅ Strengths

1. **Type Safety**
   - Strict TypeScript configuration with comprehensive type definitions
   - DTOs for API contracts ensure type safety across the application
   - Proper typing for GraphQL queries and mutations

2. **Modern React Patterns**
   - Custom hooks for API calls (`useCallApi`, `useCallQuery`, `useCallMutation`, `useCallSubscription`)
   - Context API for global state management
   - Functional components with hooks throughout

3. **GraphQL Integration**
   - Hybrid approach: GraphQL for queries/mutations/subscriptions, REST for auth
   - Custom cache merge policies for pagination (`chats`, `messages`)
   - WebSocket subscriptions for real-time message updates
   - Proper cache updates on subscription events

4. **Code Organization**
   - Clear separation between UI components, business logic, and data layer
   - Path aliases (`@/`) for cleaner imports
   - Consistent naming conventions

5. **Production Readiness**
   - Dockerized with multi-stage build
   - Nginx configuration with SPA routing and caching
   - Environment variable support for different environments
   - Optimized build process

6. **Developer Experience**
   - ESLint configuration with React and TypeScript rules
   - Hot module replacement with Vite
   - TypeScript strict mode for better code quality


## 🚦 Getting Started

### Prerequisites

- Node.js 20+ (or use Docker)
- pnpm 9.4+ (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables (create .env file)
# Required variables:
# VITE_BACKEND_URL=<your-graphql-endpoint>
# VITE_BACKEND_WS=<your-websocket-endpoint>
# VITE_REST_API_SERVER=<your-rest-api-endpoint>
```

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint
```

### Docker

```bash
# Build Docker image
docker build \
  --build-arg VITE_BACKEND_URL=<your-graphql-url> \
  --build-arg VITE_BACKEND_WS=<your-ws-url> \
  --build-arg VITE_REST_API_SERVER=<your-rest-url> \
  -t chatter-ui .

# Run container
docker run -p 80:80 chatter-ui
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_BACKEND_URL=http://localhost:4000/graphql
VITE_BACKEND_WS=ws://localhost:4000/graphql
VITE_REST_API_SERVER=http://localhost:4000
```

### TypeScript

The project uses strict TypeScript configuration:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`

### Path Aliases

The `@/` alias maps to `src/` directory for cleaner imports:

```typescript
import { useCallApi } from "@/hooks";
import { AuthContext } from "@/contexts";
```

## 📊 Key Features

- ✅ Real-time messaging with WebSocket subscriptions
- ✅ Infinite scroll pagination for chats and messages
- ✅ Dark theme UI with Material-UI
- ✅ Authentication flow (login/register)
- ✅ User profile management
- ✅ GraphQL queries, mutations, and subscriptions
- ✅ REST API integration for authentication
- ✅ Optimistic UI updates
- ✅ Apollo Client cache management

## 🎯 Code Patterns

### Custom Hooks Pattern

The project uses custom hooks to abstract API calls:

```typescript
// GraphQL Query
const [data, error, loading, fetchMore] = useCallQuery<ChatListDto>(
  CHATS,
  { skip: 0, limit: 15 }
);

// GraphQL Mutation
const [createMessage, data, error, loading] = useCallMutation(
  SEND_MESSAGE
);

// REST API
const [callRestAPI, isLoading, error] = useCallApi();
```

### Context Pattern

Global state managed through React Context:

```typescript
const { mode, data, doLogin, doRegister } = useContext(AuthContext);
const { onChatItemClick, currentChatId } = useContext(ChatsContext);
```

### Cache Management

Custom merge functions for paginated queries:

```typescript
function merge(existingItems, incomingItems, { args }) {
  const merged = existingItems ? existingItems.slice(0) : [];
  for (let i = 0; i < incomingItems.length; i++) {
    merged[args.skip + i] = incomingItems[i];
  }
  return merged;
}
```

## 🔍 Code Quality Metrics

- **TypeScript Coverage**: ~100% (strict mode enabled)
- **Component Structure**: Atomic Design pattern
- **Bundle Size**: Optimized with Vite tree-shaking
- **Linting**: ESLint with React and TypeScript rules
- **Formatting**: Prettier configured

## 🚢 Deployment

The application is containerized with Docker and uses Nginx for serving static files:

- Multi-stage build for optimized image size
- Nginx configuration with SPA routing
- Gzip compression enabled
- Static asset caching (30 days)
- Health check endpoint (`/health`)



## 🤝 Contributing

Contributions are welcome 🎉

**Fork the repo**

Create a feature branch: `feat/<name>` or `fix/<name>`

Open a PR with a clear description and screenshots/logs when relevant

**Good first contributions**

- UI/UX refinements
- Improving real-time UX edge cases
- Tests
- Documentation updates

This project follows best practices for React and TypeScript development. When contributing:

1. Follow the existing code structure and patterns
2. Ensure TypeScript strict mode compliance
3. Run linting before committing: `pnpm lint`
4. Write tests for new features
5. Update documentation as needed




## 📄 License

This project is licensed under the **MIT License** - a permissive open-source license that allows free use, modification, distribution, and contribution.

### What this means:

✅ **Free to use** - Anyone can use this project for any purpose, including commercial use  
✅ **Free to modify** - You can change the code to suit your needs  
✅ **Free to distribute** - You can share the original or modified code  
✅ **Open for contributions** - All developers are welcome to contribute  

### Requirements:

- Include the original copyright notice and license text
- Include a copy of the MIT License in distributions


## Full License Text

```
MIT License

Copyright (c) 2026 Naser Papi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

For more information, see the [LICENSE](LICENSE) file in the repository root.

---

**Status**: 🟡 Under Active Development

**Last Updated** Jan 2026

