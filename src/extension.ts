import * as vscode from 'vscode';
import * as os from 'os';


export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.run8086Emulator', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
      const filePath = document.fileName;
      const extensionPath = context.extensionPath;
      const platform = os.platform();

      // Yeni bir terminal oluşturun
      const terminal = vscode.window.createTerminal('8086 Emulator');
      terminal.show(true);

      if (platform === 'darwin') {
        terminal.sendText(`${extensionPath}/bin/emulator_8086_macos "${filePath}" -i`);
    } else if (platform === 'win32') {
        terminal.sendText(`${extensionPath}/bin/emulator_8086_linux "${filePath}" -i`);
    } else if (platform === 'linux') {
        terminal.sendText(`${extensionPath}/bin/emulator_8086.exe "${filePath}" -i`);
    } else {
        console.log(`Running on an unsupported platform: ${platform}`);
    }
      // Terminal üzerinden emülatörü filePath ile birlikte çalıştırın
      
    } else {
      vscode.window.showErrorMessage("No active editor!");
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
