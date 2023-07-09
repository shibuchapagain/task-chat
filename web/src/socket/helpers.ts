export const promisifyEmit = (socket, key, value: any) => {
  return new Promise((resolve, reject) => {
    socket.emit(key, value, ({ err, data }) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
