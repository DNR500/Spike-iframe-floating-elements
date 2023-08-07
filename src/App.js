import './App.css';

function App() {
  return (
    <div className="App">
      <div className="parent-container">
        <h1>Parent</h1>
          <iframe src="http://localhost:3000/frame" title="same domain frame" width="300"></iframe>
      </div>
       <div id="portalContainer"></div>
    </div>
  );
}

export default App;
