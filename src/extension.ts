/*
 * Copyright (c) 2022 Michael Federczuk
 * SPDX-License-Identifier: MPL-2.0 AND Apache-2.0
 */

import * as vscode from "vscode";
import { Command } from "./command";
import { Commands } from "./commands";
import "./utils";

const EXTENSION_ID = "smart-indent-align";

// TODO: move commands into distinct files

const COMMAND_ID_NEWLINE = `${EXTENSION_ID}.newline`;
const COMMAND_ID_INDENT  = `${EXTENSION_ID}.indent`;
const COMMAND_ID_TAB     = `${EXTENSION_ID}.tab`;
const COMMAND_ID_OUTDENT = `${EXTENSION_ID}.outdent`;

const createIndentString = (textEditorOptions: vscode.TextEditorOptions) => {
	if(!(textEditorOptions.insertSpaces)) {
		return "\t";
	}

	return " ".repeat(textEditorOptions.tabSize as number);
};

//#region command newline

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

//#endregion

//#region command indent

const indentSelection = (selection: vscode.Selection,
                         indentStr: string,
                         textEditor: vscode.TextEditor,
                         edit: vscode.TextEditorEdit) => {

	const startLineIndex: number = selection.start.line;
	const endLineIndex: number = selection.end.line;

	for(let lineIndex: number = startLineIndex; lineIndex <= endLineIndex; ++lineIndex) {
		const line: vscode.TextLine = textEditor.document.lineAt(lineIndex);

		if(line.range.isEmpty) {
			continue;
		}

		edit.insert(new vscode.Position(lineIndex, 0), indentStr);
	}
};

const commandIndent = (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit): void => {
	const indentStr: string = createIndentString(textEditor.options);

	textEditor.selections.forEach((selection: vscode.Selection) => {
		indentSelection(selection, indentStr, textEditor, edit);
	});
};

//#endregion

//#region command tab

const tabSelection = (selection: vscode.Selection, textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
	if(!(selection.isEmpty)) {
		const indentStr: string = createIndentString(textEditor.options);

		indentSelection(selection, indentStr, textEditor, edit);

		return;
	}

	// normal behavior when indenting with spaces
	if(textEditor.options.insertSpaces) {
		const indentStr: string = createIndentString(textEditor.options);

		edit.delete(selection);
		edit.insert(selection.active, indentStr);

		return;
	}

	// detect where indentation ends -> indent line if cursor is at indentation, otherwise
	//                                  insert `textEditor.options.tabSize` amount of spaces

	const indentEndCharacter: number = textEditor.document
		.lineAt(selection.active)
		.text
		.search(/[^\t]|$/);

	// TODO: when not in indentation, detect where to align to based on the upper and lower lines
	//       e.g.:
	//          const foo: number = ...;
	//          const x:[cursor] number = ...;
	//          const bar: number = ...;
	//       pressing tab ->
	//          const foo: number = ...;
	//          const x:   number = ...;
	//          const bar: number = ...;

	const str: string = ((selection.active.character <= indentEndCharacter)
	                     ? "\t"
	                     : " ".repeat(textEditor.options.tabSize as number));

	edit.insert(selection.active, str);
};

const commandTab = (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit): void => {
	textEditor.selections.forEach((selection: vscode.Selection) => {
		tabSelection(selection, textEditor, edit);
	});
};

//#endregion

//#region command outdent

const outdentLine = (lineNr: number, indentStr: string, textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
	const line: vscode.TextLine = textEditor.document.lineAt(lineNr);

	if(!(line.text.startsWith(indentStr))) {
		return;
	}

	const leadingIndentEnd: vscode.Position = line.range.start.translate({ characterDelta: indentStr.length });
	const leadingIndentRange: vscode.Range = line.range.with({ end: leadingIndentEnd });

	edit.delete(leadingIndentRange);
};

const outdentSelection = (selection: vscode.Selection,
                          indentStr: string,
                          textEditor: vscode.TextEditor,
                          edit: vscode.TextEditorEdit) => {

	const startLineNr: number = selection.start.line;
	const endLineNr: number = selection.end.line;

	for(let lineNr: number = startLineNr; lineNr <= endLineNr; ++lineNr) {
		outdentLine(lineNr, indentStr, textEditor, edit);
	}
};

const commandOutdent = (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit): void => {
	const indentStr: string = createIndentString(textEditor.options);

	textEditor.selections.forEach((selection: vscode.Selection) => {
		outdentSelection(selection, indentStr, textEditor, edit);
	});
};

//#endregion

const commands: readonly Command[] = [
	new Commands.Indent(EXTENSION_ID),
];

export function activate(context: vscode.ExtensionContext) {
	console.log(`Activating ${EXTENSION_ID}`);
	context.extension.id

	const disposables: readonly vscode.Disposable[] = commands
		.map(vscode.commands.registerTextEditorCommand);

	context.subscriptions.push(...disposables);
}
