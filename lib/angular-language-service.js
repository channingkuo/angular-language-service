'use babel';

import AngularLanguageServiceView from './angular-language-service-view';
import { CompositeDisposable } from 'atom';

export default {

  angularLanguageServiceView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.angularLanguageServiceView = new AngularLanguageServiceView(state.angularLanguageServiceViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.angularLanguageServiceView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'angular-language-service:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.angularLanguageServiceView.destroy();
  },

  serialize() {
    return {
      angularLanguageServiceViewState: this.angularLanguageServiceView.serialize()
    };
  },

  toggle() {
    console.log('AngularLanguageService was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
