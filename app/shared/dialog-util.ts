import * as dialogsModule from "ui/dialogs";

export function alert(message: string) {
  return dialogsModule.alert({
    title: "App",
    okButtonText: "OK",
    message: message
  });
}
