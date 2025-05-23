import {ReactNode} from "react";
import { IPageSettings } from "./globals/PageGlobals";

export interface PageTemplateSchema {
  settings: IPageSettings;
}

export interface PageTemplate<T> {
  title: string; // Internal
  documentType: string; // Internal
  schema: T extends PageTemplateSchema ? T | undefined : undefined | never;
  query: (id: string) => string;
  component: (data: T) => ReactNode;
}
