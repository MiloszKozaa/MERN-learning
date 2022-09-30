import { useEffect, useState } from 'react';

const App = () => {
  const [backendData, backendDataSet] = useState({
    users: [],
  });

  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then(data => {
        backendDataSet(data);
      });
  }, []);

  return (
    <div>
      {typeof backendData.users === undefined ? (
        <div>Lodaing...</div>
      ) : (
        backendData.users.map((user, id) => <div key={id}>{user}</div>)
      )}
    </div>
  );
};

export default App;
