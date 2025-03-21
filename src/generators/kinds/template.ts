import { Entity } from "../../types";
import { createBaseEntity } from "../createBaseEntity";
import { EntityGeneratorParams } from "../types";
export interface TemplateStep {
  id: string;
  name: string;
  action: string;
  input: Record<string, unknown>;
}
export interface TemplateParameter {
  title: string;
  required?: string[];
  properties: Record<string, {
    title?: string;
    type?: string;
    description?: string;
    [key: string]: unknown;
  }>;
}
export interface TemplateEntitySpec {
  owner: string;
  type: string;
  parameters: TemplateParameter[];
  steps: TemplateStep[];
}

export const generateTemplateEntity = (params: EntityGeneratorParams<TemplateEntitySpec>): Entity => {
  const defaultParameters = [
    {
      title: "Fill in details",
      required: ["name"],
      properties: {
        name: {
          title: "Name",
          type: "string",
          description: "Unique name of the component"
        }
      }
    },
    {
      title: "Choose a location",
      required: ["repoUrl"],
      properties: {
        repoUrl: {
          title: "Repository Location",
          type: "string"
        }
      }
    }
  ];

  // Default template steps
  const defaultSteps = [
    {
      id: "fetch-base",
      name: "Fetch Base",
      action: "fetch:template",
      input: {
        url: "./template",
        values: {
          name: '{{ parameters.name }}'
        }
      }
    },
    {
      id: "publish",
      name: "Publish",
      action: "publish:github",
      input: {
        allowedHosts: ['github.com'],
        description: 'This is {{ parameters.name }}',
        repoUrl: '{{ parameters.repoUrl }}'
      }
    }
  ];

  const defaultSpec = {
    parameters: defaultParameters,
    steps: defaultSteps
  };

  return createBaseEntity<TemplateEntitySpec>(
    "Template",
    params,
    (p: EntityGeneratorParams<TemplateEntitySpec>) => ({
      ...defaultSpec,
      ...p.spec
    })
  );
};
