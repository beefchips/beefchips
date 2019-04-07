/// <reference path="phosphorus.ts" />

// IO helpers and hooks

namespace P.IO {
  /**
   * Phases of loading projects.
   */
  export enum Phase {
    /**
     * The project's assets (costumes, sounds) are being downloaded. (typically the longest phase)
     */
    Assets = 'assets',
    /**
     * The project file is being read.
     */
    File = 'file',
    /**
     * The project file is being downloaded.
     */
    Project = 'project',
    /**
     * Dependencies of the runtime (fonts, other things) are being downloaded.
     */
    Dependencies = 'dependencies',
  }

  export const hooks = {
    setPhase(phase: Phase) {

    },
    startTask(task: string) {

    },
    endTask(task: string) {

    },
    overall(progress: number) {

    },
  };

  export function setPhase(phase: Phase) {
    hooks.setPhase(phase);
  }
  export function startTask(task: string) {
    hooks.startTask(task);
  }
  export function endTask(task: string) {
    hooks.endTask(task);
  }
  export function overall(progress: number) {
    hooks.overall(progress);
  }

  /**
   * Download a URL. Uses appropriate progress hooks.
   */
  export function fetch(url: string): Promise<Response> {
    const taskId = 'fetch ' + url;
    hooks.startTask(taskId);
    return window.fetch(url)
      .then((r) => {
        hooks.endTask(taskId);
        return r;
      });
  }

  /**
   * Read a file as an ArrayBuffer. Uses appropriate progress hooks.
   */
  export function fileAsArrayBuffer(file: File) {
    setPhase(Phase.File);
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
      fileReader.onloadend = function() {
        resolve(fileReader.result as ArrayBuffer);
      };

      fileReader.onerror = function(err) {
        reject(err);
      };

      fileReader.onprogress = function(event) {
        overall(event.loaded / event.total);
      };

      fileReader.readAsArrayBuffer(file);
    });
  }
}
