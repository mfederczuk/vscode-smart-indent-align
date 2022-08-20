import * as vscode from "vscode";

export abstract class Command {

	readonly fullId: string;

	constructor(extensionId: string, commandId: string) {
		this.fullId = `${extensionId}.${commandId}`;
	}

	abstract execute(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit): void;
}
