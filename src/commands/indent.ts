import * as vscode from "vscode";
import { Command } from "../command";

export class IndentCommand extends Command {

	constructor(extensionId: string) {
		super(extensionId, "indent");
	}

	override execute(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
		const indentStr: string = createIndentString(textEditor.options);

		textEditor.selections.forEach((selection: vscode.Selection) => {
			indentSelection(selection, indentStr, textEditor, edit);
		});
	}
}
