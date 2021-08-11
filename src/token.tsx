import { Token } from '@lumino/coreutils'; 
import { INotificationEvent } from '.';
import { requestAPI } from './handler';
import { JupyterFrontEnd } from '@jupyterlab/application';

export const INotifier = new Token<INotifier>('@jupyterlab/coreutils:INotifier');

export interface INotifier {
    post(notification: INotificationEvent): void;
}

class Notifier implements INotifier {

    constructor() {
        console.log("Notifier constructed");
    }

    post = async (notification: INotificationEvent) => {
        try {
            const reply = await requestAPI<any>("notifications", {
              body: JSON.stringify(notification),
              method: "POST",
            });
            //ignoreNotifs.set(reply["RowId"], null);
            console.log(reply);
            console.log("this was invoked");
          } catch (reason) {
            console.error(
              `Error on POST /api/notitifications ${notification}.\n${reason}`
            );
          }
    }
}

export function activateNotifier(
    app: JupyterFrontEnd
  ): INotifier {
    return new Notifier();
  }