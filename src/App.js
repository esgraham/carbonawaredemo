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
	const [selectedGenerationTime, setGenerationTime] = useState();
	const [selectedForecastDuration, setForecastDuration] = useState();
	const [savings, setSavings] = useState();
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
	const handleGeneratedAtChange = (selectedGenerationTime) => {
        setGenerationTime(selectedGenerationTime);
    };
	const handleForecastDurationChange = (selectedForecastDuration) => {
        setForecastDuration(selectedForecastDuration);
    };
	const handleSavingsChange = (savings) => {
		var percentage = savings.percentage;
		var total = savings.total;
		if (percentage<0)
		{	percentage = Math.abs(percentage);
			percentage = Math.round(percentage);
			total = Math.round(total)
			setSavings('Provides a ' + percentage + '% savings for total of '+ total + ' gCO2eq/kWh');
		}
		else
		{
			percentage = Math.abs(total);
			percentage = Math.round(percentage);
			total = Math.round(total)
			setSavings('Provides a ' + percentage + '% increase for total of '+ total + ' gCO2eq/kWh');
		}
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
							<h5 className="app-card-header"></h5>
							<div className="app-card-block">
								<Selector handleRetrospectiveDurationChange={handleRetrospectiveDurationChange}  handleRegionChange={handleRegionChange}
									 handleStartTimeChange={handleStartTimeChange} handleEndTimeChange={handleEndTimeChange} handleGeneratedAtChange={handleGeneratedAtChange} handleForecastDurationChange={handleForecastDurationChange} />
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
							<h4 className="app-card-header"><span className="tag tag-success" id="revenue-tag">{savings}</span></h4>
							<div className="app-card-block">
								<BarChart forcastduration={selectedForecastDuration} selectedRetrospectiveDurationOption={selectedRetrospectiveDurationOption} selectedRegionOption={selectedRegion}
									 selectedStartTime={selectedStartTime} selectedEndTime={selectedEndTime} selectedGenerationTime={selectedGenerationTime} handleSavingsChange={handleSavingsChange}/>
							</div>
						</div>
					</div>
				</div>
				)}
			</div>
		);
}

export default App;
