// import React, { useState } from "react";
// import "./CropGrowthCycle.css"; // Import the CSS file

// const CropGrowthCycle = () => {
//   const [growthStage, setGrowthStage] = useState("");

//   // Map of growth stages to their respective image URLs
//   const stageImages = {
//     "Seedling(Nursery)": "/nursery.png",
//     "Seedling(Transplanting)": "/transplanting.png",
//     "Tilling": "/tilling.png",
//     "Panicle initiation": "/panicle initiation.png",
//     "Booting to Heading": "/boot to head.png",
//     "Heading to physiological maturity": "/heaing.png",
//   };

//   return (
//     <div className="crop-growth-cycle">
//       <h2>Crop Growth Cycle (Preventative methods)</h2>
//       <div className="form-group">
//         <label htmlFor="growthStage">Growth Stage:</label>
//         <select
//           id="growthStage"
//           value={growthStage}
//           onChange={(e) => setGrowthStage(e.target.value)}
//         >
//           <option value="">Select a stage</option>
//           <option value="Seedling(Nursery)">Seedling(Nursery)</option>
//           <option value="Seedling(Transplanting)">Seedling(Transplanting)</option>
//           <option value="Tilling">Tilling</option>
//           <option value="Panicle initiation">Panicle initiation</option>
//           <option value="Booting to Heading">Booting to Heading</option>
//           <option value="Heading to physiological maturity">Heading to physiological maturity</option>
//         </select>
//       </div>

//       {growthStage && (
//         <div className="image-container">
//           <img
//             src={stageImages[growthStage]}
//             alt={growthStage}
//             className="growth-stage-image"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default CropGrowthCycle;
import React, { useState } from "react";
import "./CropGrowthCycle.css"; // Import the CSS file

const CropGrowthCycle = () => {
  const [growthStage, setGrowthStage] = useState("");

  // Maps of growth stages to their respective image URLs for Rabi and Kharif crops
  const rabiImages = {
    "Seedling(Nursery)": "/rabi-nursery.png",
    "Seedling(Transplanting)": "/rabi-transplanting.png",
    "Tilling": "/rabi-tilling.png",
    "Panicle initiation": "/rabi-panicle-initiation.png",
    "Booting to Heading": "/rabi-boot.png",
    "Heading to physiological maturity": "/rabi-head.png",
  };

  const kharifImages = {
    "Seedling(Nursery)": "/nursery.png",
    "Seedling(Transplanting)": "/transplanting.png",
    "Tilling": "/tilling.png",
    "Panicle initiation": "/panicle initiation.png",
    "Booting to Heading": "/boot to head.png",
    "Heading to physiological maturity": "/heaing.png",
  };

  return (
    <div className="crop-growth-cycle">
      <h2>Crop Growth Cycle (Preventative methods)</h2>
      <div className="form-group">
        <label htmlFor="growthStage">Growth Stage:</label>
        <select
          id="growthStage"
          value={growthStage}
          onChange={(e) => setGrowthStage(e.target.value)}
        >
          <option value="">Select a stage</option>
          <option value="Seedling(Nursery)">Seedling(Nursery)</option>
          <option value="Seedling(Transplanting)">Seedling(Transplanting)</option>
          <option value="Tilling">Tilling</option>
          <option value="Panicle initiation">Panicle initiation</option>
          <option value="Booting to Heading">Booting to Heading</option>
          <option value="Heading to physiological maturity">Heading to physiological maturity</option>
        </select>
      </div>

      {growthStage && (
        <div className="image-container">
          <div className="crop-images">
            <div className="crop-image">
              <h3>Rabi Crop</h3>
              <img
                src={rabiImages[growthStage]}
                alt={`${growthStage} - Rabi`}
                className="growth-stage-image"
              />
            </div>
            <div className="crop-image">
              <h3>Kharif Crop</h3>
              <img
                src={kharifImages[growthStage]}
                alt={`${growthStage} - Kharif`}
                className="growth-stage-image"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropGrowthCycle;
