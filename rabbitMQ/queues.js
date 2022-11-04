function getSupportedActions() {
  return ["send"];
}

const { v4: uuidv4 } = require("uuid");

const Queues = {
  EVENT_PROCESSOR: {
    queueName: "eventProcessor",
    supportedActions: getSupportedActions(),
    getMessageObject: (actor, action, object, target) => {
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

      return {
        eventId: uuidv4(),
        actor,
        action,
        object,
        target,
        createdAt: new Date().toISOString(),
      };
    },
  },

  SEND_EMAIL: {
    queueName: "email",
  },
};

module.exports = Queues;
