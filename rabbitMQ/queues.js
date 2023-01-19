function getSupportedActions() {
  return ["verify", "update", "create"];
}

const { v4: uuidv4 } = require("uuid");

const Queues = {
  EVENTS: {
    queueName: "EVENTS",
    supportedActions: getSupportedActions(),
    getMessageObject: (actor, action, object, target, loggerContext) => {
      if (!actor || typeof actor !== "object") {
        throw new Error("Actor cannot be null");
      }

      if (!actor.type || !actor.id) {
        throw new Error(
          `Actor object must have type and id, currently ${JSON.stringify(
            actor
          )}`
        );
      }

      if (!action) {
        throw new Error("Action is required");
      }

      if (!object || typeof object !== "object") {
        throw new Error(
          "This field cannot be null or has to be an object type"
        );
      }

      if (!getSupportedActions().includes(action)) {
        throw new Error(`Unsupported action ${action}`);
      }

      if (!loggerContext) {
        throw new Error("loggerContext is required");
      }

      return {
        actor,
        action,
        object,
        target,
        eventId: uuidv4(),
        createdAt: new Date().toISOString(),
        loggerContext,
      };
    },
  },

  SEND_EMAIL: {
    queueName: "email",
  },
};

module.exports = Queues;
