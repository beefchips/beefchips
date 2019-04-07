/// <reference path="phosphorus.ts" />

namespace P.config {
  /**
   * Global scale of the window.
   */
  export const scale = window.devicePixelRatio || 1;
  /**
   * Does this browser have touch events on the document?
   */
  export const hasTouchEvents = 'ontouchstart' in document;
  /**
   * The target framerate for phosphorus to run at.
   */
  export const framerate: number = 30;
  /**
   * Is debug mode enabled?
   */
  export const debug = window.location.search.includes("debug");
  /**
   * The API route to download a project's project.json. Replace $id with the project ID.
   * project.json could be a Scratch 2 project, Scratch 3 project, or 404.
   */
  export const PROJECT_API: string = 'https://projects.scratch.mit.edu/$id';
}
