import { faker } from "@faker-js/faker";
import { Entity } from "../../types";
import { BaseEntitySpec, EntityGeneratorParams } from "../types";

export interface SystemEntitySpec extends BaseEntitySpec {
  owner: string;
  domain?: string;
  type?: string;
}

export const generateSystemEntity = (params: EntityGeneratorParams<SystemEntitySpec>): Entity => {
  const { name, annotations, owner } = params;
  return {
    apiVersion: "backstage.io/v1alpha1",
    kind: "System",
    metadata: {
      name,
      description: faker.commerce.productDescription(),
      annotations
    },
    spec: {
      owner: owner ?? "team-b",
      domain: params.spec?.domain,
      type: params.spec?.type
    }
  };
};
