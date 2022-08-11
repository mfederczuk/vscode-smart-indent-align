/*
 * Copyright (c) 2022 Michael Federczuk
 * SPDX-License-Identifier: MPL-2.0 AND Apache-2.0
 */

import * as vscode from "vscode";

const EXTENSION_ID = "smart-indent-align";

const COMMAND_ID_NEWLINE = `${EXTENSION_ID}.newline`;

const newlineSelection = (selection: vscode.Selection, textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
	const startLine: vscode.TextLine = textEditor.document.lineAt(selection.start);

	const leadingWhitespace: string = startLine.text
		.substring(
			0,
			Math.min(startLine.firstNonWhitespaceCharacterIndex, selection.start.character),
		);

	edit.delete(selection);
	edit.insert(selection.start, "\n" + leadingWhitespace);
};

const commandNewline = (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit): void => {
	textEditor.selections.forEach((selection: vscode.Selection) => {
		newlineSelection(selection, textEditor, edit);
	});
};

export function activate(context: vscode.ExtensionContext) {
	console.log(`Activating ${EXTENSION_ID}`);

	const newline = vscode.commands.registerTextEditorCommand(COMMAND_ID_NEWLINE, commandNewline);

	context.subscriptions.push(newline);
}
