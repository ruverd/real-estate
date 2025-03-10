import { createServer } from "miragejs";

import propertiesData from "./properties-data.json";

export const makeServer = () => createServer({
  routes() {
    this.namespace = "api";

    this.db.loadData({
      properties: propertiesData,
      favorites: [],
    });

    this.get("/properties", () => {
      return this.db.properties;
    });

    this.get("/properties/:id", (_, request) => {
      const id = request.params.id;

      return this.db.properties.find(id);
    });

    this.get("/saved-properties", () => {
      return this.db.properties.filter(property => property.saved);
    });

    this.post("/properties/:id/save", (_, request) => {
      const id = request.params.id;

      const property = this.db.properties.find(id);

      console.log("property", property);

      const updatedProperty = this.db.properties.update(id, {
        saved: !property?.saved,
      });

      console.log("updatedProperty", updatedProperty);

      return updatedProperty;
    });
  },
});