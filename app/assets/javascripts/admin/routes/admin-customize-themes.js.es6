import showModal from 'discourse/lib/show-modal';
import { popupAjaxError } from 'discourse/lib/ajax-error';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('theme');
  },

  setupController(controller, model) {
    this._super(controller, model);
    // TODO ColorScheme to model
    controller.set("editingTheme", false);
  },

  actions: {
    importModal() {
      showModal('upload-theme');
    },

    newTheme(obj) {
      obj = obj || {name: I18n.t("admin.customize.new_style")};
      const item = this.store.createRecord('theme');

      const all = this.modelFor('adminCustomizeThemes');
      item.save(obj).then(() => {
        all.pushObject(item);
        this.transitionTo('adminCustomizeThemes.show', item.get('id'));
      }).catch(popupAjaxError);
    }
  }
});
