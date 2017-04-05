import ModalFunctionality from 'discourse/mixins/modal-functionality';

export default Ember.Controller.extend(ModalFunctionality, {

  adminCustomizeThemesColors: Ember.inject.controller(),

  actions: {
    selectBase() {
      this.get('adminCustomizeThemesColors')
        .send('newColorSchemeWithBase', this.get('selectedBaseThemeId'));
      this.send('closeModal');
    }
  }
});
