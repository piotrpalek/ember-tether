/* global Tether */
import Ember from 'ember';
const run = Ember.run;

export default Ember.Component.extend({
  classNames: 'em-tether',
  attachTo: null,
  attachment: 'top right',
  targetAttachment: 'bottom left',
  enabled: true,

  willInsertElement() {
    this.set('wrapper', this.$('.tether-wrapper'));
  },

  didInsertElement() {
    let target = Ember.$(this.get('attachTo'));
    let tether = null;

    Ember.assert(
      `The "attachTo" property needs to be a css selector (as a string)
      which can be found in the DOM.`,
      target.length
    );

    run(() => {
      tether = new Tether({
        element: this.get('wrapper'),
        target: target,
        attachment: this.get('attachment'),
        targetAttachment: this.get('targetAttachment'),
        enabled: this.get('enabled')
      });
      this.set('tether', tether);
    });

    run.scheduleOnce("afterRender", this, () => tether.position())
  },

  willDestroyElement() {
    this.set('wrapper', null);
    run(() => this.get('tether').destroy());
  }
});
