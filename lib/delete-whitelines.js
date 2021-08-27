'use babel';

import DeleteWhitelinesView from './delete-whitelines-view';
import { CompositeDisposable } from 'atom';

export default {

  deleteWhitelinesView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.deleteWhitelinesView = new DeleteWhitelinesView(state.deleteWhitelinesViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.deleteWhitelinesView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'delete-whitelines:toggle': () => this.toggle(true),
      'delete-whitelines:toggle2': () => this.toggle(false)
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.deleteWhitelinesView.destroy();
  },

  serialize() {
    return {
      deleteWhitelinesViewState: this.deleteWhitelinesView.serialize()
    };
  },

  toggle(hard) {
    // console.log('DeleteWhitelines was toggled!');
    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      //console.log(editor);
      let selection = editor.getSelectedText()
      let getlines;
      if(hard) {
          getlines = selection.replace(/^[\n\r\s\t]+/gm, '').replace(/[\n\r\s\t]+$/gm, '');
      }
      else {
          getlines = selection.replace(/^[\n\r\s\t]+$/gm, '');
      }
      editor.insertText(getlines)
    }

  }

};

