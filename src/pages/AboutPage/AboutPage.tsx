import type React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-7xl py-8">
      <h1 className="mb-2 text-4xl font-bold">About</h1>

      <p className="mb-8 text-muted-foreground">
        Learn more about octowalrus-frontend and its purpose.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              octowalrus-frontend is a modern React application built with
              TypeScript, Vite, and shadcn/ui components. It provides a solid
              foundation for building scalable web applications.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              <li>React 19</li>
              <li>TypeScript</li>
              <li>Vite</li>
              <li>Tailwind CSS</li>
              <li>shadcn/ui</li>
              <li>React Router</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
            <li>Responsive design with mobile-first approach</li>
            <li>Dark mode support</li>
            <li>Component-based architecture</li>
            <li>Type-safe development with TypeScript</li>
            <li>Fast development experience with Vite</li>
            <li>Accessible UI components from shadcn/ui</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

