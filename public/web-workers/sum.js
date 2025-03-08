onmessage = (event) => {
  const { data } = event;
  heavyOperation(data);
};

const heavyOperation = (data) => {
  console.log = function (message) {
    self.postMessage({ type: "log", message });
  };

  console.log('Started Computing on Web worker')

  let sum = 0;
  let startTime = Date.now();
  let timeLimit = 10000; 
  while (Date.now() - startTime < timeLimit) {
    sum += Math.random() + data;
  }

  console.log("Computation finished in worker");

  postMessage({ type: "result", value: sum });
}