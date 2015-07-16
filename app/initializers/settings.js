export function initialize(container, application) {
  var store = container.lookup("store:main");
  store.findAll('setting');
}

export default {
  name: 'settings',
  initialize: initialize,
  after: 'store'
};
