const leaflet = jest.genMockFromModule(`leaflet`);

leaflet.icon = () => {};

leaflet.map = () => {
  return {
    setView: () => {},
    remove: () => {}
  };
};

leaflet.tileLayer = () => {
  return {
    addTo: () => {}
  };
};

leaflet.marker = () => {
  return {
    addTo: () => {}
  };
};

module.exports = leaflet;
