// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState } from 'react';

// const irrigationData = [
//   { month: 'December', standard_week: 49, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: '170-190', stage: 'Initial stage' },
//   { month: 'December', standard_week: 50, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: '170-190', stage: 'Initial stage' },
//   { month: 'December', standard_week: 51, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: '170-190', stage: 'Initial stage' },
//   { month: 'December', standard_week: 52, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: '170-190', stage: 'Initial stage' },
//   { month: 'January', standard_week: 1, phenophase: 'Seedling (Transplanting)', duration_in_days: '30-35', irrigation: '170-190', stage: 'Initial stage' },
//   { month: 'January', standard_week: 2, phenophase: 'Seedling (Transplanting)', duration_in_days: '66-70', irrigation: '270-290', stage: 'Development stage' },
//   { month: 'January', standard_week: 3, phenophase: 'Seedling (Transplanting)', duration_in_days: '66-70', irrigation: '270-290', stage: 'Development stage' },
//   { month: 'January', standard_week: 4, phenophase: 'Tillering to Active Tillering', duration_in_days: '66-70', irrigation: '270-290', stage: 'Development stage' },
//   { month: 'February', standard_week: 5, phenophase: 'Tillering to Active Tillering', duration_in_days: '66-70', irrigation: '270-290', stage: 'Development stage' },
//   { month: 'February', standard_week: 6, phenophase: 'Tillering to Active Tillering', duration_in_days: '66-70', irrigation: '270-290', stage: 'Development stage' },
//   { month: 'February', standard_week: 7, phenophase: 'Panicle Initiation to Booting', duration_in_days: '66-70', irrigation: '270-290', stage: 'Reproductive stage' },
//   { month: 'February', standard_week: 8, phenophase: 'Panicle Initiation to Booting', duration_in_days: '66-70', irrigation: '270-290', stage: 'Reproductive stage' },
//   { month: 'March', standard_week: 9, phenophase: 'Panicle Initiation to Booting', duration_in_days: '25-28', irrigation: '220-240', stage: 'Reproductive stage' },
//   { month: 'March', standard_week: 10, phenophase: 'Booting to Heading', duration_in_days: '25-28', irrigation: '220-240', stage: 'Reproductive stage' },
//   { month: 'March', standard_week: 11, phenophase: 'Booting to Heading', duration_in_days: '25-28', irrigation: '220-240', stage: 'Reproductive stage' },
//   { month: 'March', standard_week: 12, phenophase: 'Booting to Heading', duration_in_days: '25-28', irrigation: '220-240', stage: 'Late stage' },
//   { month: 'April', standard_week: 13, phenophase: 'Heading to Physiological maturity', duration_in_days: '28-30', irrigation: '190-210', stage: 'Late stage' },
//   { month: 'April', standard_week: 14, phenophase: 'Heading to Physiological maturity', duration_in_days: '28-30', irrigation: '190-210', stage: 'Late stage' },
//   { month: 'April', standard_week: 15, phenophase: 'Heading to Physiological maturity', duration_in_days: '28-30', irrigation: '190-210', stage: 'Late stage' },
//   { month: 'April', standard_week: 16, phenophase: 'Heading to Physiological maturity', duration_in_days: '28-30', irrigation: '190-210', stage: 'Late stage' },
// ];

// const App = () => {
//   const [selectedWeek, setSelectedWeek] = useState('');
//   const [averageIrrigation, setAverageIrrigation] = useState('');

//   const handleWeekChange = (event) => {
//     const week = event.target.value;
//     setSelectedWeek(week);
//     calculateAverageIrrigation(week);
//   };

//   const calculateAverageIrrigation = (week) => {
//     const selectedIrrigation = irrigationData.filter(data => data.standard_week === parseInt(week));
//     const irrigationAmounts = selectedIrrigation.map(data => {
//       const [min, max] = data.irrigation.split('-').map(Number);
//       const avgIrrigation = (min + max) / 2;
//       return avgIrrigation / selectedIrrigation.length; // Divide by the number of occurrences
//     });
    
//     const totalIrrigation = irrigationAmounts.reduce((sum, amount) => sum + amount, 0);
//     setAverageIrrigation(totalIrrigation ? totalIrrigation.toFixed(2) : '0');
//   };

//   const uniqueWeeks = [...new Set(irrigationData.map(data => data.standard_week))];

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Irrigation Calculator</h1>
//       <label htmlFor="standard-week">Select Standard Week:</label>
//       <select id="standard-week" value={selectedWeek} onChange={handleWeekChange}>
//         <option value="">--Select a Week--</option>
//         {uniqueWeeks.map((week) => (
//           <option key={week} value={week}>{week}</option>
//         ))}
//       </select>
//       {averageIrrigation && (
//         <div>
//           <h2>Average Irrigation (mm): {averageIrrigation}</h2>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
import React, { useState } from 'react';

const kharifIrrigationData = [
  { month: 'May', standard_week: 22, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'June', standard_week: 23, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'June', standard_week: 24, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'June', standard_week: 25, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'June', standard_week: 26, phenophase: 'Seedling (Transplanting)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'July', standard_week: 27, phenophase: 'Seedling (Transplanting)', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'July', standard_week: 28, phenophase: 'Seedling (Transplanting)', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'July', standard_week: 29, phenophase: 'Seedling (Transplanting)', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'July', standard_week: 30, phenophase: 'Tillering to Active Tillering', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'August', standard_week: 31, phenophase: 'Tillering to Active Tillering', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'August', standard_week: 32, phenophase: 'Tillering to Active Tillering', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'August', standard_week: 33, phenophase: 'Tillering to Active Tillering', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'August', standard_week: 34, phenophase: 'Panicle Initiation to Booting', duration_in_days: '66-70', irrigation: 54, stage: 'Reproductive stage' },
  { month: 'August', standard_week: 35, phenophase: 'Panicle Initiation to Booting', duration_in_days: '66-70', irrigation: 54, stage: 'Reproductive stage' },
  { month: 'September', standard_week: 36, phenophase: 'Panicle Initiation to Booting', duration_in_days: '25-28', irrigation: 45, stage: 'Reproductive stage' },
  { month: 'September', standard_week: 37, phenophase: 'Booting to Heading', duration_in_days: '25-28', irrigation: 45, stage: 'Reproductive stage' },
  { month: 'September', standard_week: 38, phenophase: 'Booting to Heading', duration_in_days: '25-28', irrigation: 45, stage: 'Reproductive stage' },
  { month: 'September', standard_week: 39, phenophase: 'Booting to Heading', duration_in_days: '25-28', irrigation: 45, stage: 'Late stage' },
  { month: 'October', standard_week: 40, phenophase: 'Booting to Heading', duration_in_days: '28-30', irrigation: 40, stage: 'Late stage' },
  { month: 'October', standard_week: 41, phenophase: 'Booting to Heading', duration_in_days: '28-30', irrigation: 40, stage: 'Late stage' },
  { month: 'October', standard_week: 42, phenophase: 'Heading to Physiological maturity', duration_in_days: '28-30', irrigation: 40, stage: 'Late stage' },
  { month: 'October', standard_week: 43, phenophase: 'Heading to Physiological maturity', duration_in_days: '28-30', irrigation: 40, stage: 'Late stage' },
  { month: 'November', standard_week: 44, phenophase: 'Heading to Physiological maturity', duration_in_days: '28-30', irrigation: 40, stage: 'Late stage' },
];
// rabi
const irrigationData = [
  { month: 'December', standard_week: 49, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'December', standard_week: 50, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'December', standard_week: 51, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'December', standard_week: 52, phenophase: 'Seedling (Nursery)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'January', standard_week: 1, phenophase: 'Seedling (Transplanting)', duration_in_days: '30-35', irrigation: 36, stage: 'Initial stage' },
  { month: 'January', standard_week: 2, phenophase: 'Seedling (Transplanting)', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'January', standard_week: 3, phenophase: 'Seedling (Transplanting)', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'January', standard_week: 4, phenophase: 'Tillering to Active Tillering', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'February', standard_week: 5, phenophase: 'Tillering to Active Tillering', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'February', standard_week: 6, phenophase: 'Tillering to Active Tillering', duration_in_days: '66-70', irrigation: 54, stage: 'Development stage' },
  { month: 'February', standard_week: 7, phenophase: 'Panicle Initiation to Booting', duration_in_days: '66-70', irrigation: 54, stage: 'Reproductive stage' },
  { month: 'February', standard_week: 8, phenophase: 'Panicle Initiation to Booting', duration_in_days: '66-70', irrigation: 54, stage: 'Reproductive stage' },
  { month: 'March', standard_week: 9, phenophase: 'Panicle Initiation to Booting', duration_in_days: '25-28', irrigation: 45, stage: 'Reproductive stage' },
  { month: 'March', standard_week: 10, phenophase: 'Booting to Heading', duration_in_days: '25-28', irrigation: 45, stage: 'Reproductive stage' },
  { month: 'March', standard_week: 11, phenophase: 'Booting to Heading', duration_in_days: '25-28', irrigation: 45, stage: 'Reproductive stage' },
  { month: 'March', standard_week: 12, phenophase: 'Booting to Heading', duration_in_days: '25-28', irrigation: 45, stage: 'Late stage' },
  { month: 'April', standard_week: 13, phenophase: 'Heading to Physiological maturity', duration_in_days: '28-30', irrigation: 40, stage: 'Late stage' },
  { month: 'April', standard_week: 14, phenophase: 'Heading to Physiological maturity', duration_in_days: '28-30', irrigation: 40, stage: 'Late stage' },
  { month: 'April', standard_week: 15, phenophase: 'Heading to Physiological maturity', duration_in_days: '28-30', irrigation: 40, stage: 'Late stage' },
  { month: 'April', standard_week: 16, phenophase: 'Heading to Physiological maturity', duration_in_days: '28-30', irrigation: 40, stage: 'Late stage' },
];

function App() {
  const [selectedWeek, setSelectedWeek] = useState(null);

  const handleWeekChange = (event) => {
    const week = parseInt(event.target.value, 10);
    setSelectedWeek(irrigationData.find(data => data.standard_week === week));
  };

  return (
    <div>
      <h1>Irrigation Schedule</h1>
      <label htmlFor="week-select">Select Standard Week:</label>
      <select id="week-select" onChange={handleWeekChange} defaultValue="">
        <option value="" disabled>Select a week</option>
        {irrigationData.map((data, index) => (
          <option key={index} value={data.standard_week}>
            Week {data.standard_week}
          </option>
        ))}
      </select>

      {selectedWeek && (
        <div>
          <h2>Irrigation Details</h2>
          <p><strong>Month:</strong> {selectedWeek.month}</p>
          <p><strong>Phenophase:</strong> {selectedWeek.phenophase}</p>
          <p><strong>Duration (days):</strong> {selectedWeek.duration_in_days}</p>
          <p><strong>Stage of Growth + Irrigation:</strong> {selectedWeek.stage} - {selectedWeek.irrigation} mm/week</p>
        </div>
      )}
    </div>
  );
}

export default App;
