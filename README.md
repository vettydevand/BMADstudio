# BMAD IDE - A Modern IDE for BMAD Method Development

This Next.js application provides a simple yet powerful web-based Integrated Development Environment (IDE) for creating and running business methods using the **BMAD (Build More, Architect Dreams)** methodology.

The IDE features an AI-powered code generator that leverages Google's Gemini models to translate plain English descriptions into structured BMAD code, following the principles of the BMAD Master Agent.

## ✨ Features

- **AI-Powered Generation**: Describe your business method in plain English and let the AI generate the corresponding BMAD code.
- **Three-Panel Layout**:
  1.  **AI & Docs**: Generate code or browse BMAD documentation.
  2.  **Code Editor**: View, edit, and refine your BMAD methods with line numbers.
  3.  **Terminal**: A simulated terminal to execute commands and see output.
- **Dynamic API Key**: Configure your Google AI API Key directly in the UI for immediate use.
- **BMAD-Aware AI**: The core AI prompt is designed to act as a "BMad Master Agent," understanding the core principles of the BMAD Method.
- **Built with Modern Tech**: Next.js, TypeScript, ShadCN UI, Tailwind CSS, and Genkit.
- **Deployable on GitHub Pages**: Includes a GitHub Actions workflow for automatic deployment.

## 🚀 Getting Started

### Prerequisites

- Node.js v20+
- A Google AI API Key to use the generator. You can obtain one from [Google AI Studio](https://aistudio.google.com/).

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/bmad-ide.git
    cd bmad-ide
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:9002`.

4.  **Using the IDE:**
    - Open your browser to the local development URL.
    - Enter your Google AI API Key in the settings panel.
    - Use the "AI Generator" tab to describe a business method.
    - Click "Generate Code" to see the AI-generated BMAD code appear in the editor.
    - Edit the code as needed.
    - Use the terminal to simulate running the method.

## 🏗️ Build & Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

The workflow is defined in `.github/workflows/deploy.yml`. It triggers on every `push` to the `main` branch.

**Process:**

1.  **Build**: The Next.js application is compiled into static assets (`next build` and `next export`).
2.  **Deploy**: The generated static files from the `out/` directory are pushed to the `gh-pages` branch.

To enable this, you need to configure your repository's settings:
- Go to **Settings > Pages**.
- Under "Build and deployment", select **Source** as "Deploy from a branch".
- Set the branch to **`gh-pages`** and the folder to **`/(root)`**.

## 📖 BMAD Method Overview

The BMAD (Build More, Architect Dreams) method is a structured, agent-based approach to AI-driven development. It utilizes a team of specialized AI agents, each with a unique role (PM, Architect, Developer, etc.), to execute complex software development tasks through defined workflows.

This IDE's core AI is designed to act as the **BMad Master Agent**, which understands the entire ecosystem and can generate the correct BMAD code to accomplish a user's goal.

### Key Principles

- **Agent-Based Execution**: Work is done by specialized agents with specific roles and capabilities.
- **Workflow-Driven**: Complex tasks are broken down into structured, repeatable workflows.
- **Structured Language**: The BMAD code itself provides a clear, machine-readable definition of the business method.

You can learn more by exploring the "Docs" tab within the IDE.

## 🧩 Project Structure

The project is organized into modular components for clarity and maintainability.

- `src/app/`: The main application entry point and layout.
- `src/components/ide/`: Core components of the IDE interface (Header, AI Generator, Code Editor, Terminal, Docs).
- `src/components/ui/`: Reusable UI components from ShadCN.
- `src/ai/`: Contains all Genkit-related AI flows and configuration.
  - `src/ai/genkit.ts`: Initializes and configures the Genkit AI instance.
  - `src/ai/flows/`: Contains the specific AI generation logic.
- `src/hooks/`: Custom React hooks.
- `src/lib/`: Utility functions.
- `bmad/`: Contains the complete installed BMAD Method, providing context for the AI.

## 🛠️ Modifying and Extending

### Changing the AI Model

The AI model can be changed in `src/ai/genkit.ts`. Simply update the `model` property in the `genkit()` configuration.

### Customizing the AI Prompt

The core AI prompt, which defines the "BMad Master Agent" persona, is located in `src/ai/flows/generate-bmad-code-from-description.ts`. Modifying this prompt will change the AI's behavior and knowledge.

### Adding New UI Components

The project uses `shadcn/ui`. You can add new components using the ShadCN CLI:
```bash
npx shadcn-ui@latest add [component-name]
```
