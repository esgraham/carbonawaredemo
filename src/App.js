import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import BarChart from './components/BarChart';
import Selector from './components/Selector';

function App() {
  return (
		<div className="container">
			<h2 id="header">
				<strong>Carbon Aware Demo</strong>
			</h2>



      <div className="row m-b-1">
				<div className="col-xs-12">
					<div className="app-card app-shadow">
						<h5 className="app-card-header">Enter Compute Information:</h5>
						<div className="app-card-block">
            <Selector />
            </div>
					</div>
				</div>
			</div>
      
      <br/>

      <div className="row m-b-1">
				<div className="col-xs-12">
					<div className="app-card app-shadow">
						<h4 className="app-card-header">Savings <span class="tag tag-success" id="revenue-tag">87%</span></h4>
						<div className="app-card-block">
              <BarChart forcastduration='6' />
            </div>
					</div>
				</div>
			</div>
    </div>
  );
}

export default App;
