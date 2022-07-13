import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React,  { useState }  from 'react';
import BarChart from './components/BarChart';
import Selector from './components/Selector';

function App() {

	const [selectedRetrospectiveDurationOption, setDuration] = useState(); 
	const [selectedRegion, setRegion] = useState(); 
	const [selectedStartTime, setStartTime] = useState(); 
	const [selectedEndTime, setEndTime] = useState();
	const [visible, setVisible] = useState(false);

	const handleRetrospectiveDurationChange = (selectedRetrospectiveDurationOption) => {
		setDuration(selectedRetrospectiveDurationOption.value);
    };
    const handleRegionChange = (selectedRegionOption) => {
		setRegion(selectedRegionOption.value);
    };
    const handleStartTimeChange = (selectedStartTime) => {
		setStartTime(selectedStartTime);
    };
    const handleEndTimeChange = (selectedEndTime) => {
        setEndTime(selectedEndTime);
    };

	const onClickHandle = () => {
		setVisible(true);
	  };
	  
		return (
			<div className="container">
				<h2 id="header">
					<strong>Carbon Aware Demo</strong>
				</h2>

				<div className="row m-b-1">
					<div className="col-xs-12">
						<div className="app-card app-shadow">
							<h5 className="app-card-header">Enter Carbon Aware Information:</h5>
							<div className="app-card-block">
								<Selector handleRetrospectiveDurationChange={handleRetrospectiveDurationChange}  handleRegionChange={handleRegionChange}
									 handleStartTimeChange={handleStartTimeChange} handleEndTimeChange={handleEndTimeChange} />
							    <button onClick={onClickHandle}>Submit</button>
							</div>
						</div>
					</div>
				</div>

				<br />

				{visible && (
				<div className="row m-b-1">
					<div className="col-xs-12">
						<div className="app-card app-shadow">
							<h4 className="app-card-header">Savings <span className="tag tag-success" id="revenue-tag">87%</span></h4>
							<div className="app-card-block">
								<BarChart forcastduration='6' selectedRetrospectiveDurationOption={selectedRetrospectiveDurationOption} selectedRegionOption={selectedRegion}
									 selectedStartTime={selectedStartTime} selectedEndTime={selectedEndTime}/>
							</div>
						</div>
					</div>
				</div>
				)}
			</div>
		);
}

export default App;
