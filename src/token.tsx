import { Token } from '@lumino/coreutils'; 
import { INotificationEvent, INotificationResponse } from '.';
import { requestAPI } from './handler';
import { JupyterFrontEnd } from '@jupyterlab/application';

export const INotifier = new Token<INotifier>('@jupyterlab/coreutils:INotifier');

export interface INotifier {
    post(notification: INotificationEvent): void;
    getNotification(id: string) : Promise<INotificationResponse | undefined>;
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

    getNotification = async (id: string) : Promise<INotificationResponse | undefined> => {
        try {
            const data = await requestAPI<any>("notifications/" + id);
            const ls = data["Response"];
            const notification = ls["INotificationResponse"];
            return notification;
        } catch (reason) {
            console.error(
                `Error on GET /api/notifications.\n${reason}`
            );
        }
    }
}

export function activateNotifier(): INotifier {
    return new Notifier();
}