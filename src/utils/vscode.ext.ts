import * as vscode from "vscode";
import { Command as CustomCommand } from "../command";

type Args = [
	command: string,
	callback: (textEditor: vscode.TextEditor,
	           edit: vscode.TextEditorEdit,
	           ...args: unknown[]) => void,
	thisArg?: unknown,
];

const registerTextEditorCommand: (...args: Args) => vscode.Disposable = vscode.commands.registerTextEditorCommand;

declare module "vscode" {
	export namespace commands {
		export function registerTextEditorCommand(command: CustomCommand): Disposable;
	}
}

vscode.commands.registerTextEditorCommand = (...args: (Args | [command: CustomCommand])): vscode.Disposable => {
	if(!(args.length === 1 && args[0] instanceof CustomCommand)) {
		return registerTextEditorCommand(...(args as Args));
	}

	const command: CustomCommand = args[0];

	return registerTextEditorCommand(
		command.fullId,
		command.execute,
		command,
	);
};
