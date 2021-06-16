import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlab-notifications extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-notifications:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab-notifications is activated!');
  }
};

export default plugin;
