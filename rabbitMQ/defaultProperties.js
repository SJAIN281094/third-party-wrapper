let handlers = {
  callback: null,
  onChannelClose: null,
  onChannelError: null,
  onConnectionClose: null,
  onConnectionError: null,
};
let noOfRetriesOnError = 0;
let prefetch = 2;
let defaultConsumerProperties = {
  noAck: false,
  messageProcessingTimeoutMS: 600000,
  rpcTimeoutMS: 300000,
};
let defaultQueueProperties = {
  durable: true,
  exclusive: false,
  autoDelete: false,
};

module.exports = {
  handlers,
  noOfRetriesOnError,
  prefetch,
  defaultConsumerProperties,
  defaultQueueProperties,
};
